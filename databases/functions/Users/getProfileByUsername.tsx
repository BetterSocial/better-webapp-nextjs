import checkMoreOrLess from "utils/string";
import { ProfileResponse } from "@services/profile/profileServices";
import {User, sequelize} from "databases/models";
import { UserModel, UserModelFunctionResult } from "types/Database/model/User";

const getProfileByUsername = async (username: string): Promise<UserModelFunctionResult | null> => {
    let excludeField = [
        'human_id',
        'is_backdoor_user',
        'encrypted',
        'createdAt',
        'updatedAt',
        'real_name',
        'last_active_at',
        'status',
        'is_banned'
    ];

    try {
        const user = await User.findOne({
            where: {username: username},
            attributes: {
                exclude: excludeField
            }
        });

        if(!user) return null;
    
        const targetUserId = user?.dataValues?.user_id;

        const getFollowerCountQuery = `SELECT COUNT(user_follow_user.user_id_follower) as count_follower from user_follow_user WHERE user_id_followed = :user_id`;
        const getFollowingCountQuery = `SELECT COUNT(A.user_id_followed) as count_following 
                                        from user_follow_user A
                                        INNER JOIN users B ON A.user_id_followed = B.user_id
                                        WHERE A.user_id_follower = :user_id
                                        AND B.is_anonymous = false`;

        const getFollowerCountPromise = sequelize.query(getFollowerCountQuery, {
            replacements: {user_id: targetUserId}
        });

        const getFollowingCountPromise = sequelize.query(getFollowingCountQuery, {
            replacements: {user_id: targetUserId}
        });

        const [
            getFollowerCount,
            getFollowingCount,
        ] = await Promise.all([
            getFollowerCountPromise,
            getFollowingCountPromise,
        ]);

        const getFollowerCountResult = getFollowerCount?.[0]?.[0]?.count_follower;
        const getFollowingCountResult = getFollowingCount?.[0]?.[0]?.count_following;

        const copyUser = {
            ...user.dataValues
        } as UserModelFunctionResult
        
        copyUser.following_symbol = checkMoreOrLess(getFollowingCountResult);
        copyUser.follower_symbol = checkMoreOrLess(getFollowerCountResult);

        copyUser.isSignedMessageEnabled = true;
        copyUser.isAnonMessageEnabled = false;
    
        if (copyUser.allow_anon_dm) {
            if (copyUser.only_received_dm_from_user_following) {
                copyUser.isAnonMessageEnabled = copyUser.allow_anon_dm;
            } else {
                copyUser.isAnonMessageEnabled = copyUser.allow_anon_dm;
            }
        }

        return copyUser
    } catch(error) {
        console.log('error', error)
        return null
    }
}

export default getProfileByUsername
export type UserModel = {
    user_id: string;
    username: string;
    real_name: string;
    last_active_at: Date;
    profile_pic_path: string;
    profile_pic_asset_id: string;
    profile_pic_public_id: string;
    status: boolean;
    bio: string;
    is_anonymous: boolean;
    encrypted: string;
    allow_anon_dm: boolean;
    only_received_dm_from_user_following: boolean;
    is_backdoor_user: boolean;
    created_at: Date; 
    updated_at: Date;
}

export type UserModelFunctionResult = UserModel & {
    follower_symbol: string;
    following_symbol: string;
    isSignedMessageEnabled: boolean;
    isAnonMessageEnabled: boolean;
}
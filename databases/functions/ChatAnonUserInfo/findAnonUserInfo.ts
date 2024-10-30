import {ChatAnonUserInfo} from "databases/models";

const findAnonUserInfo = async (channelId: string, userId: string) => {
    try {
      const anonUserInfo = await ChatAnonUserInfo.findOne({
        where: {
          channel_id: channelId,
          my_anon_user_id: userId
        },
        raw: true
      });
  
      return anonUserInfo;
    } catch (e) {
      console.debug(e);
      return null;
    }
  };
  
export default findAnonUserInfo;
  
import BetterSocialColorList from "utils/anonUserInfo/color";
import BetterSocialEmojiList from "utils/anonUserInfo/emoji";
import crypto from 'crypto';

export type BetterSocialEmoji = {
  name: string;
  emoji: string;
}

export type BetterSocialColor = {
  name: string;
  color: string;
}

const BetterSocialConstantListUtils = {
  getRandomColor: function (): BetterSocialColor {
    const random = crypto.randomInt(BetterSocialColorList.length);
    return BetterSocialColorList[random];
  },

  getRandomEmoji: function (): BetterSocialEmoji {
    const random = crypto.randomInt(BetterSocialEmojiList.length);
    return BetterSocialEmojiList[random];
  }
};

export default BetterSocialConstantListUtils;

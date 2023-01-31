const GetstreamPost = {
    privacy: {
        public: 'public',
    },

    postType: {
        standard: 0,
        poll: 1,
        link: 2,
    },

    postVerb: {
        poll: 'poll',
        tweet: 'tweet',
    },

    poll: {
        noPollOptionUuid: '00000000-0000-0000-0000-000000000000',
    }
}

const String = {
    anonymous: 'Anonymous'
}

const OS = {
    Windows: 'Windows',
    Mac: 'Mac OS',
    Linux: 'Linux',
    Android: 'Android',
    iOS: 'iOS',
    Unknown: 'Unknown'
}

const Link = {
    playstore: 'https://play.google.com/store/apps/details?id=org.bettersocial&utm_campaign=sharedpost&utm_medium=Android',
    appstore: 'https://apps.apple.com/us/app/better-social/id1615684520?utm_campaign=sharedpost&utm_medium=iOS'
}

const Constant = {
    GetstreamPost,
    String,
    OS, 
    Link
}


export default Constant
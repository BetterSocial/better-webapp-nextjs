'use client'

/**
 * Please refer to this for all tracking enums.
 * https://docs.google.com/spreadsheets/d/1zkQzRPG9nKEXaoHI79nFXgL7WmSgp3qGRPVkHMxBzR0/edit#gid=1943812029
 */
export enum BetterSocialEventTracking {
  //  DEFAULT EVENT
  UNDEFINED_EVENT = 'undefined_event',

  // PROFILE SCREEN
  PROFILE_SCREEN_OPEN = 'Webflow-WEBOtherProfile_Screen_Opened',
  PROFILE_SCREEN_SHARE_BUTTON_CLICKED = 'Webflow-WEBOtherProfile_ShareButton_Clicked',
  PROFILE_SCREEN_DOWNLOAD_APP_BUTTON_CLICKED = 'Webflow-WEBOtherProfile_DownloadAppButton_Clicked',
  PROFILE_SCREEN_SEE_PROFILE_BUTTON_CLICKED = 'Webflow-WEBOtherProfile_SeeProfileButton_Clicked',

  // VERIFICATION SCREEN
  VERIFICATION_SCREEN_OPEN = 'Webflow-WEBPleaseVerify_Screen_Opened',
  VERIFICATION_SCREEN_HUMAN_ID_BUTTON_CLICKED = 'Webflow-WEBPleaseVerify_humanIDButton_Clicked',
  
  // SUCCESS SCREEN
  SUCCESS_SCREEN_OPEN = 'Webflow-WEBSuccess_Screen_Opened',
}

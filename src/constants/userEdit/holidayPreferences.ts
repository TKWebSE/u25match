/**
 * 休日の定数定義
 * 休日がいつかを表すパターン
 */

export const HOLIDAY_PREFERENCES = [
  { code: 'weekend', name: '土日' },
  { code: 'weekday', name: '平日' },
  { code: 'irregular', name: '不定期' },
] as const;

export type HolidayPreferenceCode = typeof HOLIDAY_PREFERENCES[number]['code'];
export type HolidayPreferenceName = typeof HOLIDAY_PREFERENCES[number]['name'];

/**
 * 休日コードから休日名を取得
 */
export const getHolidayPreferenceName = (code: HolidayPreferenceCode): HolidayPreferenceName | undefined => {
  return HOLIDAY_PREFERENCES.find(hp => hp.code === code)?.name;
};

/**
 * 休日名から休日コードを取得
 */
export const getHolidayPreferenceCode = (name: HolidayPreferenceName): HolidayPreferenceCode | undefined => {
  return HOLIDAY_PREFERENCES.find(hp => hp.name === name)?.code;
};

/**
 * 休日の選択肢を取得（セレクター用）
 */
export const getHolidayPreferenceOptions = () => {
  return HOLIDAY_PREFERENCES.map(holidayPreference => ({
    label: holidayPreference.name,
    value: holidayPreference.code,
  }));
};

/**
 * プロフィールデータの差分を検出するユーティリティ関数
 */

export interface ProfileData {
  name: string;
  age: number;
  location: string;
  bio: string;
  tags: Array<{ id: string; name: string; imageUrl: string }>;
  details: {
    height: number;
    weight?: number;
    bodyType?: string;
    bloodType?: string;
    hometown?: string;
    occupation: string;
    education: string;
    income?: string;
    familyStructure?: string;
    pets?: string[];
    languages: string[];
    smoking: boolean;
    drinking: string;
    children?: string;
    travelPreferences?: ('土日' | '平日' | '不定期')[];
    sleepSchedule?: string;
    marriageTimeline?: string;
    marriageViews?: string;
    livingTogether?: string;
    marriageHistory?: string;
    marriageIntention?: string;
    wantChildren?: string;
  };
}

/**
 * 2つのオブジェクトの差分を検出し、変更されたフィールドのみを返す
 * 
 * @param original - 元のデータ
 * @param current - 現在のデータ
 * @returns 変更されたフィールドのみを含むオブジェクト
 */
export const getProfileDiff = (original: ProfileData, current: ProfileData): Partial<ProfileData> => {
  const changes: Partial<ProfileData> = {};

  // 基本情報の差分チェック
  if (original.name !== current.name) {
    changes.name = current.name;
  }

  if (original.age !== current.age) {
    changes.age = current.age;
  }

  if (original.location !== current.location) {
    changes.location = current.location;
  }

  if (original.bio !== current.bio) {
    changes.bio = current.bio;
  }

  // タグの差分チェック（配列の内容を比較）
  if (!arraysEqual(original.tags, current.tags, (a, b) => a.name === b.name)) {
    changes.tags = current.tags;
  }

  // 詳細情報の差分チェック
  const detailsDiff = getDetailsDiff(original.details, current.details);
  if (Object.keys(detailsDiff).length > 0) {
    changes.details = detailsDiff;
  }

  return changes;
};

/**
 * 詳細情報の差分を検出
 */
const getDetailsDiff = (original: ProfileData['details'], current: ProfileData['details']) => {
  const changes: Partial<ProfileData['details']> = {};

  // 基本情報
  if (original.height !== current.height) {
    changes.height = current.height;
  }

  if (original.weight !== current.weight) {
    changes.weight = current.weight;
  }

  if (original.bodyType !== current.bodyType) {
    changes.bodyType = current.bodyType;
  }

  if (original.bloodType !== current.bloodType) {
    changes.bloodType = current.bloodType;
  }

  if (original.hometown !== current.hometown) {
    changes.hometown = current.hometown;
  }

  // 職業・学歴
  if (original.occupation !== current.occupation) {
    changes.occupation = current.occupation;
  }

  if (original.education !== current.education) {
    changes.education = current.education;
  }

  if (original.income !== current.income) {
    changes.income = current.income;
  }

  // 家族・生活
  if (original.familyStructure !== current.familyStructure) {
    changes.familyStructure = current.familyStructure;
  }

  if (!arraysEqual(original.pets, current.pets)) {
    changes.pets = current.pets;
  }

  if (!arraysEqual(original.languages, current.languages)) {
    changes.languages = current.languages;
  }

  // 生活習慣
  if (original.smoking !== current.smoking) {
    changes.smoking = current.smoking;
  }

  if (original.drinking !== current.drinking) {
    changes.drinking = current.drinking;
  }

  if (original.children !== current.children) {
    changes.children = current.children;
  }

  if (!arraysEqual(original.travelPreferences, current.travelPreferences)) {
    changes.travelPreferences = current.travelPreferences;
  }

  if (original.sleepSchedule !== current.sleepSchedule) {
    changes.sleepSchedule = current.sleepSchedule;
  }

  // 結婚・将来設計
  if (original.marriageTimeline !== current.marriageTimeline) {
    changes.marriageTimeline = current.marriageTimeline;
  }

  if (original.marriageViews !== current.marriageViews) {
    changes.marriageViews = current.marriageViews;
  }

  if (original.livingTogether !== current.livingTogether) {
    changes.livingTogether = current.livingTogether;
  }

  if (original.marriageHistory !== current.marriageHistory) {
    changes.marriageHistory = current.marriageHistory;
  }

  if (original.marriageIntention !== current.marriageIntention) {
    changes.marriageIntention = current.marriageIntention;
  }

  if (original.wantChildren !== current.wantChildren) {
    changes.wantChildren = current.wantChildren;
  }

  return changes;
};

/**
 * 2つの配列が等しいかを比較する
 * 
 * @param a - 1つ目の配列
 * @param b - 2つ目の配列
 * @param compareFn - 比較関数（オプション）
 * @returns 配列が等しい場合はtrue
 */
const arraysEqual = <T>(
  a: T[] | undefined,
  b: T[] | undefined,
  compareFn?: (a: T, b: T) => boolean
): boolean => {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  if (compareFn) {
    // カスタム比較関数を使用
    for (let i = 0; i < a.length; i++) {
      if (!compareFn(a[i], b[i])) return false;
    }
  } else {
    // デフォルトの比較
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
  }

  return true;
};

/**
 * 差分があるかどうかをチェック
 * 
 * @param original - 元のデータ
 * @param current - 現在のデータ
 * @returns 差分がある場合はtrue
 */
export const hasProfileChanges = (original: ProfileData, current: ProfileData): boolean => {
  const diff = getProfileDiff(original, current);
  return Object.keys(diff).length > 0;
};

/**
 * 差分の概要を取得（デバッグ用）
 * 
 * @param original - 元のデータ
 * @param current - 現在のデータ
 * @returns 変更されたフィールドのリスト
 */
export const getChangeSummary = (original: ProfileData, current: ProfileData): string[] => {
  const diff = getProfileDiff(original, current);
  return Object.keys(diff);
};

/**
 * プロフィールデータの差分を検出するユーティリティ関数
 * 
 * このモジュールは以下の機能を提供します：
 * - プロフィールデータの型定義
 * - 2つのプロフィールデータ間の差分検出
 * - 変更されたフィールドのみを返す効率的な差分抽出
 * - 配列の比較機能
 * - 変更の有無チェック機能
 */

import { HolidayPreferenceName } from '../constants/userEdit/holidayPreferences';

/**
 * プロフィールデータのメインインターフェース
 * ユーザーの基本情報と詳細情報を含む
 */
export interface ProfileData {
  name: string; // ユーザー名
  age: number; // 年齢
  location: string; // 居住地
  bio: string; // 自己紹介文
  images: string[]; // プロフィール画像のURL配列
  tags: Array<{ id: string; name: string; imageUrl: string }>; // タグ情報の配列
  details: ProfileDetails; // 詳細プロフィール情報
}

/**
 * プロフィールの詳細情報インターフェース
 * 身長、体重、職業、学歴、生活習慣などの詳細データを含む
 */
export interface ProfileDetails {
  height: number; // 身長（cm）
  weight?: number; // 体重（kg）
  bodyType?: string; // 体型
  bloodType?: string; // 血液型
  hometown?: string; // 出身地
  occupation: string; // 職業
  education: string; // 最終学歴
  income?: string; // 年収
  familyStructure?: string; // 家族構成
  pets?: string[]; // ペット
  languages: string[]; // 話せる言語
  smoking: boolean; // 喫煙習慣
  drinking: string; // 飲酒習慣
  children?: string; // 子供の有無
  holidayPreferences?: HolidayPreferenceName[]; // 休日の過ごし方
  sleepSchedule?: string; // 就寝時間
  marriageTimeline?: string; // 結婚予定時期
  marriageViews?: string; // 結婚観
  livingTogether?: string; // 同居希望
  marriageHistory?: string; // 結婚歴
  marriageIntention?: string; // 結婚の意思
  wantChildren?: string; // 子供が欲しいか
}

/**
 * 2つのプロフィールデータの差分を検出し、変更されたフィールドのみを返す
 * 
 * この関数は以下の処理を行います：
 * - 基本情報（名前、年齢、居住地、自己紹介）の比較
 * - 画像配列の内容比較
 * - タグ配列の内容比較（名前ベース）
 * - 詳細情報の差分検出
 * 
 * @param original - 元のプロフィールデータ
 * @param current - 現在のプロフィールデータ
 * @returns 変更されたフィールドのみを含む部分的なプロフィールデータ
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

  // 画像の差分チェック（配列の内容を比較）
  if (!arraysEqual(original.images, current.images)) {
    changes.images = current.images;
  }

  // タグの差分チェック（配列の内容を比較）
  if (!arraysEqual(original.tags, current.tags, (a, b) => a.name === b.name)) {
    changes.tags = current.tags;
  }

  // 詳細情報の差分チェック
  const detailsDiff = getDetailsDiff(original.details, current.details);
  if (Object.keys(detailsDiff).length > 0) {
    changes.details = detailsDiff as ProfileDetails;
  }

  return changes;
};

/**
 * プロフィール詳細情報の差分を検出する内部関数
 * 
 * 詳細情報の各フィールドを個別に比較し、変更されたもののみを抽出します。
 * 配列フィールド（pets, languages, holidayPreferences）は特別な比較ロジックを使用します。
 * 
 * @param original - 元の詳細情報
 * @param current - 現在の詳細情報
 * @returns 変更されたフィールドのみを含む部分的な詳細情報
 */
const getDetailsDiff = (original: ProfileDetails, current: ProfileDetails): Partial<ProfileDetails> => {
  const changes: Partial<ProfileDetails> = {};

  // 基本情報（身長、体重、体型、血液型、出身地）
  if (original.height !== current.height) { // 身長の変更をチェック
    changes.height = current.height;
  }

  if (original.weight !== current.weight) { // 体重の変更をチェック
    changes.weight = current.weight;
  }

  if (original.bodyType !== current.bodyType) { // 体型の変更をチェック
    changes.bodyType = current.bodyType;
  }

  if (original.bloodType !== current.bloodType) { // 血液型の変更をチェック
    changes.bloodType = current.bloodType;
  }

  if (original.hometown !== current.hometown) { // 出身地の変更をチェック
    changes.hometown = current.hometown;
  }

  // 職業・学歴（職業、学歴、年収）
  if (original.occupation !== current.occupation) { // 職業の変更をチェック
    changes.occupation = current.occupation;
  }

  if (original.education !== current.education) { // 学歴の変更をチェック
    changes.education = current.education;
  }

  if (original.income !== current.income) { // 年収の変更をチェック
    changes.income = current.income;
  }

  // 家族・生活（家族構成、ペット、言語）
  if (original.familyStructure !== current.familyStructure) { // 家族構成の変更をチェック
    changes.familyStructure = current.familyStructure;
  }

  if (!arraysEqual(original.pets, current.pets)) { // ペットの変更をチェック
    changes.pets = current.pets;
  }

  if (!arraysEqual(original.languages, current.languages)) { // 言語の変更をチェック
    changes.languages = current.languages;
  }

  // 生活習慣（喫煙、飲酒、子供、休日、就寝時間）
  if (original.smoking !== current.smoking) { // 喫煙習慣の変更をチェック
    changes.smoking = current.smoking;
  }

  if (original.drinking !== current.drinking) { // 飲酒習慣の変更をチェック
    changes.drinking = current.drinking;
  }

  if (original.children !== current.children) { // 子供の有無の変更をチェック
    changes.children = current.children;
  }

  if (!arraysEqual(original.holidayPreferences, current.holidayPreferences)) { // 休日過ごし方の変更をチェック
    changes.holidayPreferences = current.holidayPreferences;
  }

  if (original.sleepSchedule !== current.sleepSchedule) { // 就寝時間の変更をチェック
    changes.sleepSchedule = current.sleepSchedule;
  }

  // 結婚・将来設計（結婚予定、結婚観、同居希望、結婚歴、結婚意思、子供希望）
  if (original.marriageTimeline !== current.marriageTimeline) { // 結婚予定時期の変更をチェック
    changes.marriageTimeline = current.marriageTimeline;
  }

  if (original.marriageViews !== current.marriageViews) { // 結婚観の変更をチェック
    changes.marriageViews = current.marriageViews;
  }

  if (original.livingTogether !== current.livingTogether) { // 同居希望の変更をチェック
    changes.livingTogether = current.livingTogether;
  }

  if (original.marriageHistory !== current.marriageHistory) { // 結婚歴の変更をチェック
    changes.marriageHistory = current.marriageHistory;
  }

  if (original.marriageIntention !== current.marriageIntention) { // 結婚意思の変更をチェック
    changes.marriageIntention = current.marriageIntention;
  }

  if (original.wantChildren !== current.wantChildren) { // 子供希望の変更をチェック
    changes.wantChildren = current.wantChildren;
  }

  return changes;
};

/**
 * 2つの配列が等しいかを比較する
 */
const arraysEqual = <T>(
  a: T[] | undefined,
  b: T[] | undefined,
  compareFn?: (a: T, b: T) => boolean
): boolean => {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  return compareFn
    ? a.every((item, index) => compareFn(item, b[index]))
    : a.every((item, index) => item === b[index]);
};

/**
 * 差分があるかどうかをチェック
 */
export const hasProfileChanges = (original: ProfileData, current: ProfileData): boolean => {
  return Object.keys(getProfileDiff(original, current)).length > 0;
};

/**
 * 差分の概要を取得（デバッグ用）
 */
export const getChangeSummary = (original: ProfileData, current: ProfileData): string[] => {
  return Object.keys(getProfileDiff(original, current));
};

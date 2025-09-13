// src/components/common/index.ts
// 🔧 共通コンポーネントの統一エクスポート

// 両環境共通コンポーネント
export { default as CustomPagination } from './CustomPagination';
export { default as EmptyState } from './EmptyState';
export { ErrorState } from './ErrorState';
export { ImageCarousel } from './ImageCarousel';
export { LoadingState } from './multi/LoadingState';
export { default as ScreenWrapper } from './ScreenWrapper';
export { VerificationMark } from './VerificationMark';

// モバイル専用コンポーネント
export * from './mobile';

// Web専用コンポーネント
export * from './web';

// セレクターコンポーネント
export { BloodTypeSelector } from './multi/selector/BloodTypeSelector';
export { BodyTypeSelector } from './multi/selector/BodyTypeSelector';
export { ChildrenSelector } from './multi/selector/ChildrenSelector';
export { DrinkingSelector } from './multi/selector/DrinkingSelector';
export { EducationSelector } from './multi/selector/EducationSelector';
export { FamilyStructureSelector } from './multi/selector/FamilyStructureSelector';
export { HeightSelector } from './multi/selector/HeightSelector';
export { HolidayPreferencesSelector } from './multi/selector/HolidayPreferencesSelector';
export { IncomeSelector } from './multi/selector/IncomeSelector';
export { LanguagesSelector } from './multi/selector/LanguagesSelector';
export { MarriageHistorySelector } from './multi/selector/MarriageHistorySelector';
export { MarriageIntentionSelector } from './multi/selector/MarriageIntentionSelector';
export { PetsSelector } from './multi/selector/PetsSelector';
export { PrefectureSelector } from './multi/selector/PrefectureSelector';
export { SmokingSelector } from './multi/selector/SmokingSelector';
export { TimeSelector } from './multi/selector/TimeSelector';
export { WantChildrenSelector } from './multi/selector/WantChildrenSelector';
export { WeightSelector } from './multi/selector/WeightSelector';


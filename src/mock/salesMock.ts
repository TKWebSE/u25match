import { SaleItem } from '../services/main/sales/types';

// モックセールデータ
export const mockSales: SaleItem[] = [
  {
    id: '1',
    title: 'スタートダッシュキャンペーン',
    description: 'アプリのスタートダッシュ応援！初月50%OFF',
    discount: '50%OFF',
    endDate: '2024-04-30',
    backgroundColor: '#ff6b35',
    textColor: '#ffffff',
    originalPrice: '¥2,980',
    salePrice: '¥1,490',
    features: ['✨ プレミアムマッチング', '💬 無制限メッセージ', '👀 プロフィール閲覧', '🎯 高精度マッチング'],
    urgency: '🔥 限定100名様',
    details: 'アプリのスタートダッシュを応援する特別キャンペーンです。プレミアムマッチング機能、メッセージ機能、プロフィール閲覧機能がすべて50%OFFでご利用いただけます。',
    terms: [
      '期間限定：ユーザー登録から一週間',
      '対象機能：プレミアムマッチング、メッセージ、プロフィール閲覧',
      '支払い方法：クレジットカード、デビットカード',
      'キャンセル：いつでも可能',
    ],
  },
  {
    id: '2',
    title: '夏のビーチセール',
    description: '夏限定！3ヶ月プランが40%OFF',
    discount: '40%OFF',
    endDate: '2024-08-31',
    backgroundColor: '#00b4d8',
    textColor: '#ffffff',
    originalPrice: '¥8,940',
    salePrice: '¥5,364',
    features: ['🏖️ 夏限定特典', '💕 3ヶ月間サポート', '🎉 特別イベント参加', '🌟 優先マッチング'],
    urgency: '⏰ 残り30日',
    details: '夏のビーチシーズン限定の特別セールです。3ヶ月プランが40%OFFでご利用いただけます。夏の出会いを応援します！',
    terms: [
      '期間：2025年6月1日〜8月31日',
      '対象：3ヶ月プランのみ',
      '割引率：40%OFF',
      '支払い：一括払い',
    ],
  },
  {
    id: '3',
    title: '夏休み特別プラン',
    description: '学生限定！夏休み期間無料体験',
    discount: '夏休み無料',
    endDate: '2024-09-15',
    backgroundColor: '#ff9e00',
    textColor: '#ffffff',
    originalPrice: '¥5,960',
    salePrice: '¥0',
    features: ['🎓 学生限定', '☀️ 夏休み期間無料', '🚀 全機能体験', '💎 プレミアム特典'],
    urgency: '🎯 学生証確認必須',
    details: '学生限定の夏休み特別プランです。夏休み期間中（約2ヶ月間）すべてのプレミアム機能を無料でお試しいただけます。',
    terms: [
      '対象：学生ユーザーのみ',
      '期間：夏休み期間（約2ヶ月間）',
      '自動更新：夏休み終了後に自動で有料プランに移行',
      'キャンセル：いつでも可能',
    ],
  },
  {
    id: '4',
    title: 'バレンタイン限定セール',
    description: '愛の季節に特別価格！30%OFF',
    discount: '30%OFF',
    endDate: '2024-02-14',
    backgroundColor: '#ff69b4',
    textColor: '#ffffff',
    originalPrice: '¥3,980',
    salePrice: '¥2,786',
    features: ['💕 バレンタイン限定', '🌹 特別ギフト付き', '💝 愛のメッセージ', '✨ ロマンチック特典'],
    urgency: '💘 愛の季節限定',
    details: 'バレンタインシーズン限定の特別セールです。愛の季節にふさわしい特別な特典と共にお得な価格でご利用いただけます。',
    terms: [
      '期間：2024年2月1日〜2月14日',
      '対象：全ユーザー',
      '割引率：30%OFF',
      '特典：バレンタイン限定ギフト付き',
    ],
  },
  {
    id: '5',
    title: '新年度応援セール',
    description: '新しいスタートを応援！25%OFF',
    discount: '25%OFF',
    endDate: '2024-05-31',
    backgroundColor: '#4caf50',
    textColor: '#ffffff',
    originalPrice: '¥4,980',
    salePrice: '¥3,735',
    features: ['🎓 新年度限定', '🚀 新しい出会い', '💪 成長支援', '🌟 特別サポート'],
    urgency: '🌱 新年度限定',
    details: '新年度を迎えるユーザーを応援する特別セールです。新しい環境での出会いをサポートします。',
    terms: [
      '期間：2024年4月1日〜5月31日',
      '対象：新年度ユーザー',
      '割引率：25%OFF',
      '特典：新年度限定サポート',
    ],
  },
];

// セール統計のモックデータ
export const mockSalesStats = {
  totalSales: mockSales.length,
  activeSales: mockSales.filter(sale => new Date(sale.endDate) > new Date()).length,
  totalDiscount: 5000,
  averageDiscount: 1000,
};

// セールカテゴリのモックデータ
export const mockSalesCategories = [
  { id: 'new', name: '新着セール', count: 2 },
  { id: 'seasonal', name: '季節限定', count: 3 },
  { id: 'student', name: '学生限定', count: 1 },
  { id: 'limited', name: '期間限定', count: 4 },
];


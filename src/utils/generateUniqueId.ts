/**
 * ユニークID生成ユーティリティ
 * 
 * このファイルは以下の責務を持ちます：
 * - ユニークなIDの生成
 * - 名前からユニークなURLスラッグの生成
 * - ランダムな文字列の生成
 */

/**
 * ランダムな文字列を生成
 * @param length 生成する文字列の長さ
 * @returns ランダムな文字列
 */
export const generateRandomString = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * 名前からユニークなURLスラッグを生成
 * @param name ユーザー名
 * @param existingIds 既存のID配列（重複チェック用）
 * @returns ユニークなURLスラッグ
 */
export const generateUniqueSlug = (name: string, existingIds: string[] = []): string => {
  // 名前をURLフレンドリーな形式に変換
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309F\u30A0-\u30FF]/g, '') // 英数字とひらがな・カタカナのみ
    .replace(/[\u3040-\u309F\u30A0-\u30FF]/g, (char) => {
      // ひらがな・カタカナをローマ字に変換（簡易版）
      const hiraganaMap: { [key: string]: string } = {
        'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
        'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
        'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
        'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
        'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
        'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
        'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
        'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
        'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
        'わ': 'wa', 'を': 'wo', 'ん': 'n',
        // カタカナも同様に
        'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
        'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
        'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
        'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
        'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
        'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
        'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
        'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
        'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
        'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
      };
      return hiraganaMap[char] || char;
    })
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/-+/g, '-') // 連続するハイフンを1つに
    .replace(/^-|-$/g, ''); // 先頭と末尾のハイフンを削除

  // ベーススラッグが空の場合はランダム文字列を使用
  const finalBaseSlug = baseSlug || 'user';

  // 重複チェックとユニークID生成
  let uniqueSlug = finalBaseSlug;
  let counter = 1;

  while (existingIds.includes(uniqueSlug)) {
    uniqueSlug = `${finalBaseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

/**
 * ユニークなプロフィールIDを生成
 * @param name ユーザー名
 * @param existingIds 既存のID配列（重複チェック用）
 * @returns ユニークなプロフィールID
 */
export const generateUniqueProfileId = (name: string, existingIds: string[] = []): string => {
  const slug = generateUniqueSlug(name, existingIds);
  const randomSuffix = generateRandomString(4);
  return `${slug}-${randomSuffix}`;
};

/**
 * 現在のタイムスタンプベースのユニークIDを生成
 * @returns タイムスタンプベースのユニークID
 */
export const generateTimestampId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}; 

/**
 * 画像ファイルの形式をバリデーションする
 * @param file アップロードファイル
 * @throws Error バリデーションに失敗した場合
 */
export const validateImageFileType = (file: File): void => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('JPG、PNG、WebPファイルのみアップロード可能です');
  }
};

/**
 * 画像ファイルのサイズをバリデーションする
 * @param file アップロードファイル
 * @throws Error バリデーションに失敗した場合
 */
export const validateImageFileSize = (file: File): void => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('ファイルサイズは5MB以下にしてください');
  }
};


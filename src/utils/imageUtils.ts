// src/utils/imageUtils.ts
// 画像処理ユーティリティ - URIからFileへの変換など

/**
 * URI（ローカルファイルパス）からFileオブジェクトに変換
 * React Native（モバイル）とWeb両方に対応
 * 
 * @param uri - ローカルファイルのURI（例: file:///path/to/image.jpg）
 * @param fileName - ファイル名（オプション、指定しない場合は自動生成）
 * @returns Fileオブジェクト
 */
export const uriToFile = async (uri: string, fileName?: string): Promise<File> => {
  try {
    // URIからファイル名を抽出（指定されていない場合）
    const extractedFileName = fileName || uri.split('/').pop() || `image_${Date.now()}.jpg`;

    // fetchでBlobを取得
    const response = await fetch(uri);
    const blob = await response.blob();

    // BlobをFileに変換
    const file = new File([blob], extractedFileName, {
      type: blob.type || 'image/jpeg', // MIMEタイプを指定
    });

    return file;
  } catch (error) {
    console.error('URI to File conversion error:', error);
    throw new Error('画像ファイルの変換に失敗しました');
  }
};

/**
 * URIがローカルファイル（未アップロード）かどうかを判定
 * 
 * @param uri - 判定対象のURI
 * @returns ローカルファイルの場合true
 */
export const isLocalUri = (uri: string): boolean => {
  return uri.startsWith('file://') || uri.startsWith('content://') || uri.startsWith('ph://');
};

/**
 * 画像URIのリストから、新規アップロードが必要なもののインデックスを取得
 * 
 * @param images - 画像URIの配列
 * @returns アップロードが必要な画像のインデックス配列
 */
export const getUploadRequiredIndices = (images: string[]): number[] => {
  return images
    .map((uri, index) => (isLocalUri(uri) ? index : -1))
    .filter(index => index !== -1);
};


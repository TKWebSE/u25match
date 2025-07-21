
type Status = '🟢 オンライン' | '🟠 最近アクティブ' | '⚪️ オフライン';

interface Props {
  lastActiveAt: Date; // FirestoreのTimestampをtoDate()したDateオブジェクト
}

export function getOnlineStatus(timestamp: Date) {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMinutes = diffMs / (1000 * 60);

  if (diffMinutes <= 60) {
    return '🟢 オンライン';
  } else if (diffMinutes <= 60 * 24) {
    return '🟠 最近アクティブ';
  } else if (diffMinutes <= 60 * 24 * 3) {
    return '⚪️ オフライン';
  } else {
    return '⚪️ オフライン';
  }
}

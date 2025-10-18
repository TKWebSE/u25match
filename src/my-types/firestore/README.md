# Firestore型定義

このディレクトリには、Firestoreに直接保存されるデータの型定義があります。

## ファイル一覧

### `user.ts`
- **FirestoreUser** - ユーザープロフィール情報
- 保存場所: `users/{uid}`
- 用途: プロフィール表示・編集、profileStore

### `reaction.ts`
- **FirestoreSentLike** - 送信したいいね
  - 保存場所: `users/{currentUserId}/sentLikes/{targetUserId}`
  - 用途: いいね履歴、いいね済みチェック、マッチング判定
  - 注意: マッチした瞬間にchatRoom作成 & いいねを削除
  
- **FirestoreReceivedLike** - 受信したいいね
  - 保存場所: `users/{currentUserId}/receivedLikes/{fromUserId}`
  - 用途: リアクション画面、マッチング判定
  - 注意: マッチした瞬間にchatRoom作成 & いいねを削除

### `viewHistory.ts`
- **FirestoreViewHistory** - 閲覧履歴
- 保存場所: `viewHistory/{recordId}`
- 用途: 足跡機能

## 設計方針

### サブコレクションの使用
RDBの中間テーブルではなく、Firestoreのサブコレクションを活用しています。

**理由:**
- JOINが使えないFirestoreでは、取得パターンごとにデータを分ける
- 検索不要で直接アクセスできる = 高速・低コスト
- データの重複を恐れず、読み取り性能を優先

### 双方向サブコレクション
いいね機能では、送信者・受信者の両方にデータを保存します。

```
users/
  ├─ user1/
  │   ├─ sentLikes/        ← user1が送ったいいね
  │   │   └─ user2
  │   └─ receivedLikes/    ← user1がもらったいいね
  │       └─ user3
```

**メリット:**
- 「送ったいいね一覧」も「もらったいいね一覧」も超高速で取得
- 検索クエリ不要
- インデックス不要

## 関連型定義

- **アプリ用型定義**: `src/my-types/app/` - 画面表示用の軽量型
- **サービス層型定義**: `src/services/*/types.ts` - API通信用の型
- **ストア型定義**: `src/stores/*.ts` - 状態管理用の型


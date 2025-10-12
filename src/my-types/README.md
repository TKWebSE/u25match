# 型定義の使い分けガイド

このディレクトリには、アプリ全体で使用される型定義が含まれています。

## ユーザー関連の型

### 🔥 FirestoreUser (`@my-types/firestore/user`)

**用途:** Firestoreに保存される完全なユーザー情報

**いつ使う:**
- Firestoreとのデータのやり取り（サービス層）
- プロフィール詳細画面（全情報が必要）
- プロフィール編集画面（全フィールドにアクセス）
- `profileStore`での状態管理

**フィールド:** uid, name, age, location, bio, images, tags, details（詳細情報）, 会員情報など

---

### 🔍 User (`@my-types/search`)

**用途:** 検索結果・一覧表示用の軽量なユーザー情報

**いつ使う:**
- 検索結果一覧
- ユーザーカード表示
- スワイプカード
- パフォーマンスが重要な一覧表示

**理由:** 一覧表示では詳細情報（details, tags等）は不要。軽量なデータ構造でパフォーマンスを向上

**フィールド:** name, age, location, imageUrl, isOnline, lastActiveAt

---

### 🔐 AuthUser (`@my-types/firebase/auth`)

**用途:** Firebase Authentication認証情報のみ

**いつ使う:**
- `authStore`での認証状態管理
- ログイン/ログアウト処理
- 認証が必要な画面での権限チェック

**フィールド:** uid, email, displayName, image, emailVerified

---

## 選択のフローチャート

```
プロフィール詳細情報が必要？
  ├─ YES → FirestoreUser を使用
  └─ NO → 一覧表示？
            ├─ YES → User (@my-types/search) を使用
            └─ NO → 認証情報のみ？
                      ├─ YES → AuthUser を使用
                      └─ NO → 適切な型を新規作成（理由をコメントに記載）
```

## ベストプラクティス

1. **特定の用途がある型は残す**
   - コメントで「なぜこの型が必要か」を明記

2. **汎用的な型はFirestoreUserに統一**
   - 特別な理由がない限り、新しい汎用User型は作らない

3. **型を新規作成する場合**
   - 使用目的をコメントで明記
   - 既存の型で代用できないか検討


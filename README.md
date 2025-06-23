# u25match
25歳以下限定のマッチングアプリ

制作背景
熟年層限定のマッチングアプリはあるものの、低年齢層向けは少ない
人口的な需要が少ないのもあるし、普通のマッチングアプリを使っていたら良いみたいなところもあるだろう

そういう需要が微妙なところに個人開発規模で入っていけたら、少ない需要を満たせるのではないかと思い作成してみることとした
どれだけ需要があるかの実験的な側面もある(大学生限定もあり)

 技術スタック（MVP版）
| 種類     | ツール・技術                             |
| ------ | ---------------------------------- |
| フロント   | Flutter or React Native（クロス対応）     |
| バックエンド | Firebase（Auth, Firestore, Storage） |
| ホスティング | Firebase Hosting or Expo           |

機能一覧（MVPに含めるかどうか）
| 機能               | 優先度 | MVPでの内容                               |
| ---------------- | --- | ------------------------------------- |
| ユーザー登録（SNSログイン）  | ◎   | Firebase Authentication（Googleログインなど） |
| 年齢制限（25歳以下）      | ◎   | 生年月日入力＋コード側で判定                        |
| プロフィール編集         | ◎   | 名前＋年齢＋自己紹介のみ                          |
| マッチング（Like/Skip） | ◎   | Tinder風。右スワイプ＝LikeだけでOK               |
| チャット（マッチ後のみ）     | ◎   | Firestoreでテキストのみ。通知は不要                |
| 通報機能             | ○   | ボタンだけ。FireStoreに記録だけでOK               |
| 本人確認（書類）         | ×   | MVPでは省略（リリース後に導入検討）                   |
| 写真複数枚            | ×   | MVPでは1枚だけ登録できればOK                     |
| 検索・フィルター         | ×   | MVPではなし（後から追加OK）                      |

画面構成（MVP）
| 画面名      | 機能概要                         |
| -------- | ---------------------------- |
| ログイン画面   | Googleログイン＋生年月日入力            |
| プロフィール編集 | 名前・写真・自己紹介を登録                |
| マッチング画面  | 相手の写真＋プロフィールを表示、Like/Skipボタン |
| チャット一覧画面 | マッチ済み相手との一覧                  |
| チャット画面   | テキストメッセージ送信（リアルタイム）          |


 MVP成功判定ポイント
 | 検証したいこと           | MVPでどう確認するか        |
| ----------------- | ------------------ |
| 若者は25歳制限に抵抗ないか？   | 登録時に年齢制限をかけ、離脱率を確認 |
| マッチング機能は使われるか？    | Like回数とマッチ成立数を記録する |
| チャットまで行くユーザーが多いか？ | チャット送信回数や継続率を見る    |
| トラブル報告が必要か？       | 通報件数を集める           |


# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

// src/mock/chatMock.ts
// 💬 チャットサービスのモックデータ

export const mockChatMessages = [
  // 今日のメッセージ
  {
    id: 'msg_1',
    chatId: 'chat_123',
    senderId: 'user2',
    content: 'こんにちは！プロフィールを見させていただきました。',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'text' as const,
  },
  {
    id: 'msg_2',
    chatId: 'chat_123',
    senderId: 'my-user-id',
    content: 'はじめまして！私も音楽が好きです。',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: 'text' as const,
  },
  {
    id: 'msg_3',
    chatId: 'chat_123',
    senderId: 'user2',
    content: '素敵ですね！どんな音楽がお好きですか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: 'text' as const,
  },
  // 昨日のメッセージ
  {
    id: 'msg_1_yesterday',
    chatId: 'chat_123',
    senderId: 'my-user-id',
    content: '昨日はありがとうございました！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 30), // 昨日の23:30頃
    type: 'text' as const,
  },
  {
    id: 'msg_2_yesterday',
    chatId: 'chat_123',
    senderId: 'user2',
    content: 'こちらこそ！またお話ししましょう。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 15), // 昨日の23:45頃
    type: 'text' as const,
  },
  // 一昨日のメッセージ
  {
    id: 'msg_1_day_before',
    chatId: 'chat_123',
    senderId: 'user2',
    content: 'おはようございます！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60 * 60 * 9), // 一昨日の9:00頃
    type: 'text' as const,
  },
  {
    id: 'msg_2_day_before',
    chatId: 'chat_123',
    senderId: 'my-user-id',
    content: 'おはようございます！今日もよろしくお願いします。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60 * 60 * 9 + 1000 * 60 * 5), // 一昨日の9:05頃
    type: 'text' as const,
  },
  // 一週間前のメッセージ
  {
    id: 'msg_1_week_ago',
    chatId: 'chat_123',
    senderId: 'user2',
    content: '先週はありがとうございました！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 - 1000 * 60 * 60 * 2), // 一週間前の22:00頃
    type: 'text' as const,
  },
  {
    id: 'msg_2_week_ago',
    chatId: 'chat_123',
    senderId: 'my-user-id',
    content: 'こちらこそ！また今度お話ししましょう。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 - 1000 * 60 * 60 * 1), // 一週間前の23:00頃
    type: 'text' as const,
  },
  // 二週間前のメッセージ
  {
    id: 'msg_1_two_weeks_ago',
    chatId: 'chat_123',
    senderId: 'my-user-id',
    content: '二週間前の約束、覚えていますか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 60 * 15), // 二週間前の15:00頃
    type: 'text' as const,
  },
  {
    id: 'msg_2_two_weeks_ago',
    chatId: 'chat_123',
    senderId: 'user2',
    content: 'もちろん覚えています！楽しみです。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 60 * 15 + 1000 * 60 * 10), // 二週間前の15:10頃
    type: 'text' as const,
  },
  // 一ヶ月前のメッセージ
  {
    id: 'msg_1_month_ago',
    chatId: 'chat_123',
    senderId: 'user2',
    content: '一ヶ月前からお話ししていますね！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 60 * 10), // 一ヶ月前の10:00頃
    type: 'text' as const,
  },
  {
    id: 'msg_2_month_ago',
    chatId: 'chat_123',
    senderId: 'my-user-id',
    content: 'そうですね！時間が経つのは早いですね。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 60 * 10 + 1000 * 60 * 5), // 一ヶ月前の10:05頃
    type: 'text' as const,
  },
  // 一年前のメッセージ
  {
    id: 'msg_1_year_ago',
    chatId: 'chat_123',
    senderId: 'my-user-id',
    content: '一年前の今日、初めてお話ししましたね！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 + 1000 * 60 * 60 * 14), // 一年前の14:00頃
    type: 'text' as const,
  },
  {
    id: 'msg_2_year_ago',
    chatId: 'chat_123',
    senderId: 'user2',
    content: '本当ですね！懐かしいです。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 + 1000 * 60 * 60 * 14 + 1000 * 60 * 15), // 一年前の14:15頃
    type: 'text' as const,
  },
  {
    id: 'msg_4',
    chatId: 'chat_456',
    senderId: 'user3',
    content: 'カフェでお会いできて良かったです！',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: 'text' as const,
  },
  {
    id: 'msg_5',
    chatId: 'chat_789',
    senderId: 'user4',
    content: '明日の予定はどうですか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: 'text' as const,
  },
  {
    id: 'msg_6',
    chatId: 'chat_789',
    senderId: 'my-user-id',
    content: '明日は空いています！どこかおすすめの場所はありますか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: 'text' as const,
  },
  {
    id: 'msg_7',
    chatId: 'chat_101',
    senderId: 'user5',
    content: 'こんばんは！今日はありがとうございました。',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    type: 'text' as const,
  },
  {
    id: 'msg_8',
    chatId: 'chat_101',
    senderId: 'my-user-id',
    content: 'こちらこそ！またお会いできるのを楽しみにしています。',
    timestamp: new Date(Date.now() - 1000 * 60 * 175),
    type: 'text' as const,
  },
  {
    id: 'msg_9',
    chatId: 'chat_202',
    senderId: 'user6',
    content: '写真を送りますね！',
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    type: 'image' as const,
  },
  {
    id: 'msg_10',
    chatId: 'chat_202',
    senderId: 'my-user-id',
    content: 'ありがとうございます！とても素敵な写真ですね。',
    timestamp: new Date(Date.now() - 1000 * 60 * 295),
    type: 'text' as const,
  },
  {
    id: 'msg_11',
    chatId: 'chat_303',
    senderId: 'user7',
    content: '映画好きなんですね！おすすめの作品はありますか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    type: 'text' as const,
  },
  // chat_303の昨日のメッセージ
  {
    id: 'msg_303_yesterday_1',
    chatId: 'chat_303',
    senderId: 'my-user-id',
    content: '昨日の映画、とても面白かったです！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 60 * 2), // 昨日の22:00頃
    type: 'text' as const,
  },
  {
    id: 'msg_303_yesterday_2',
    chatId: 'chat_303',
    senderId: 'user7',
    content: '良かったです！また一緒に見に行きましょう。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 60 * 1), // 昨日の23:00頃
    type: 'text' as const,
  },
  // chat_303の一昨日のメッセージ
  {
    id: 'msg_303_day_before_1',
    chatId: 'chat_303',
    senderId: 'user7',
    content: '明日の映画の予約、取れました！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60 * 60 * 14), // 一昨日の14:00頃
    type: 'text' as const,
  },
  {
    id: 'msg_303_day_before_2',
    chatId: 'chat_303',
    senderId: 'my-user-id',
    content: 'ありがとうございます！楽しみです。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60 * 60 * 14 + 1000 * 60 * 10), // 一昨日の14:10頃
    type: 'text' as const,
  },
  // chat_303の一週間前のメッセージ
  {
    id: 'msg_303_week_ago_1',
    chatId: 'chat_303',
    senderId: 'my-user-id',
    content: '先週の映画、どうでしたか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 20), // 一週間前の20:00頃
    type: 'text' as const,
  },
  {
    id: 'msg_303_week_ago_2',
    chatId: 'chat_303',
    senderId: 'user7',
    content: 'とても面白かったです！また見に行きましょう。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 20 + 1000 * 60 * 5), // 一週間前の20:05頃
    type: 'text' as const,
  },
  // chat_303の一ヶ月前のメッセージ
  {
    id: 'msg_303_month_ago_1',
    chatId: 'chat_303',
    senderId: 'user7',
    content: '一ヶ月前から映画の話をしていますね！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 60 * 16), // 一ヶ月前の16:00頃
    type: 'text' as const,
  },
  {
    id: 'msg_303_month_ago_2',
    chatId: 'chat_303',
    senderId: 'my-user-id',
    content: 'そうですね！映画好き同士で良かったです。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 60 * 16 + 1000 * 60 * 10), // 一ヶ月前の16:10頃
    type: 'text' as const,
  },
  {
    id: 'msg_12',
    chatId: 'chat_404',
    senderId: 'user8',
    content: '旅行の話、とても興味深いです！',
    timestamp: new Date(Date.now() - 1000 * 60 * 150),
    type: 'text' as const,
  },
  {
    id: 'msg_13',
    chatId: 'chat_505',
    senderId: 'user9',
    content: '料理が趣味なんですね。私も料理が好きです！',
    timestamp: new Date(Date.now() - 1000 * 60 * 200),
    type: 'text' as const,
  },
  {
    id: 'msg_14',
    chatId: 'chat_606',
    senderId: 'user10',
    content: 'スポーツ観戦、一緒に行きませんか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 80),
    type: 'text' as const,
  },
  {
    id: 'msg_15',
    chatId: 'chat_707',
    senderId: 'user11',
    content: '読書の話、とても興味があります。',
    timestamp: new Date(Date.now() - 1000 * 60 * 250),
    type: 'text' as const,
  },
  {
    id: 'msg_16',
    chatId: 'chat_808',
    senderId: 'user12',
    content: 'アート展に行きませんか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 100),
    type: 'text' as const,
  },
  {
    id: 'msg_17',
    chatId: 'chat_909',
    senderId: 'user13',
    content: '写真を撮るのが好きなんですね！',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    type: 'text' as const,
  },
  {
    id: 'msg_18',
    chatId: 'chat_1010',
    senderId: 'user14',
    content: 'ダンスが趣味なんですね。素敵です！',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: 'text' as const,
  },
  {
    id: 'msg_19',
    chatId: 'chat_1111',
    senderId: 'user15',
    content: 'ゲームの話、とても興味があります。',
    timestamp: new Date(Date.now() - 1000 * 60 * 160),
    type: 'text' as const,
  },
  {
    id: 'msg_20',
    chatId: 'chat_1212',
    senderId: 'user16',
    content: 'ヨガを一緒にしませんか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 140),
    type: 'text' as const,
  },
  {
    id: 'msg_21',
    chatId: 'chat_1313',
    senderId: 'user17',
    content: '登山が好きなんですね！',
    timestamp: new Date(Date.now() - 1000 * 60 * 220),
    type: 'text' as const,
  },
  {
    id: 'msg_22',
    chatId: 'chat_1414',
    senderId: 'user18',
    content: 'コーヒーが好きなんですね。おすすめの店があります！',
    timestamp: new Date(Date.now() - 1000 * 60 * 95),
    type: 'text' as const,
  },
  {
    id: 'msg_23',
    chatId: 'chat_1515',
    senderId: 'user19',
    content: 'ペットを飼っているんですね。可愛いですね！',
    timestamp: new Date(Date.now() - 1000 * 60 * 170),
    type: 'text' as const,
  },
  {
    id: 'msg_24',
    chatId: 'chat_1616',
    senderId: 'user20',
    content: 'ボランティア活動、素晴らしいですね。',
    timestamp: new Date(Date.now() - 1000 * 60 * 130),
    type: 'text' as const,
  },
  {
    id: 'msg_25',
    chatId: 'chat_1717',
    senderId: 'user21',
    content: 'DIYが趣味なんですね。とても興味があります！',
    timestamp: new Date(Date.now() - 1000 * 60 * 110),
    type: 'text' as const,
  },
  {
    id: 'msg_26',
    chatId: 'chat_1818',
    senderId: 'user22',
    content: 'ガーデニングが好きなんですね。素敵です！',
    timestamp: new Date(Date.now() - 1000 * 60 * 190),
    type: 'text' as const,
  },
  {
    id: 'msg_27',
    chatId: 'chat_1919',
    senderId: 'user23',
    content: '釣りが趣味なんですね。一緒に行きませんか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 75),
    type: 'text' as const,
  },
  {
    id: 'msg_28',
    chatId: 'chat_2020',
    senderId: 'user24',
    content: 'クラフトビールが好きなんですね。おすすめがあります！',
    timestamp: new Date(Date.now() - 1000 * 60 * 85),
    type: 'text' as const,
  },
];

export const mockChatRooms = [
  {
    id: 'chat_123',
    participants: ['my-user-id', 'user2'],
    lastMessage: mockChatMessages[2], // 最新のメッセージ
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: 'chat_456',
    participants: ['my-user-id', 'user3'],
    lastMessage: mockChatMessages[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: 'chat_789',
    participants: ['my-user-id', 'user4'],
    lastMessage: mockChatMessages[5],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'chat_101',
    participants: ['my-user-id', 'user5'],
    lastMessage: mockChatMessages[7],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 175),
  },
  {
    id: 'chat_202',
    participants: ['my-user-id', 'user6'],
    lastMessage: mockChatMessages[9],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 295),
  },
  {
    id: 'chat_303',
    participants: ['my-user-id', 'user7'],
    lastMessage: mockChatMessages[10],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 144), // 6日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: 'chat_404',
    participants: ['my-user-id', 'user8'],
    lastMessage: mockChatMessages[11],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 168), // 7日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 150),
  },
  {
    id: 'chat_505',
    participants: ['my-user-id', 'user9'],
    lastMessage: mockChatMessages[12],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 192), // 8日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 200),
  },
  {
    id: 'chat_606',
    participants: ['my-user-id', 'user10'],
    lastMessage: mockChatMessages[13],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 216), // 9日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 80),
  },
  {
    id: 'chat_707',
    participants: ['my-user-id', 'user11'],
    lastMessage: mockChatMessages[14],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 240), // 10日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 250),
  },
  {
    id: 'chat_808',
    participants: ['my-user-id', 'user12'],
    lastMessage: mockChatMessages[15],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 264), // 11日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 100),
  },
  {
    id: 'chat_909',
    participants: ['my-user-id', 'user13'],
    lastMessage: mockChatMessages[16],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 288), // 12日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 180),
  },
  {
    id: 'chat_1010',
    participants: ['my-user-id', 'user14'],
    lastMessage: mockChatMessages[17],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 312), // 13日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: 'chat_1111',
    participants: ['my-user-id', 'user15'],
    lastMessage: mockChatMessages[18],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 336), // 14日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 160),
  },
  {
    id: 'chat_1212',
    participants: ['my-user-id', 'user16'],
    lastMessage: mockChatMessages[19],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 360), // 15日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 140),
  },
  {
    id: 'chat_1313',
    participants: ['my-user-id', 'user17'],
    lastMessage: mockChatMessages[20],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 384), // 16日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 220),
  },
  {
    id: 'chat_1414',
    participants: ['my-user-id', 'user18'],
    lastMessage: mockChatMessages[21],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 408), // 17日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 95),
  },
  {
    id: 'chat_1515',
    participants: ['my-user-id', 'user19'],
    lastMessage: mockChatMessages[22],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 432), // 18日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 170),
  },
  {
    id: 'chat_1616',
    participants: ['my-user-id', 'user20'],
    lastMessage: mockChatMessages[23],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 456), // 19日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 130),
  },
  {
    id: 'chat_1717',
    participants: ['my-user-id', 'user21'],
    lastMessage: mockChatMessages[24],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 480), // 20日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 110),
  },
  {
    id: 'chat_1818',
    participants: ['my-user-id', 'user22'],
    lastMessage: mockChatMessages[25],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 504), // 21日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 190),
  },
  {
    id: 'chat_1919',
    participants: ['my-user-id', 'user23'],
    lastMessage: mockChatMessages[26],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 528), // 22日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 75),
  },
  {
    id: 'chat_2020',
    participants: ['my-user-id', 'user24'],
    lastMessage: mockChatMessages[27],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 552), // 23日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 85),
  },
];

// ユーザー情報のモックデータ
export const mockUsers = [
  {
    id: 'user1',
    name: '田中太郎',
    avatar: 'https://i.pravatar.cc/150?u=user1',
    isOnline: true,
  },
  {
    id: 'user2',
    name: '佐藤花子',
    avatar: 'https://i.pravatar.cc/150?u=user2',
    isOnline: false,
  },
  {
    id: 'user3',
    name: '鈴木一郎',
    avatar: 'https://i.pravatar.cc/150?u=user3',
    isOnline: true,
  },
  {
    id: 'user4',
    name: '高橋美咲',
    avatar: 'https://i.pravatar.cc/150?u=user4',
    isOnline: false,
  },
  {
    id: 'user5',
    name: '伊藤健太',
    avatar: 'https://i.pravatar.cc/150?u=user5',
    isOnline: true,
  },
  {
    id: 'user6',
    name: '渡辺愛',
    avatar: 'https://i.pravatar.cc/150?u=user6',
    isOnline: false,
  },
  {
    id: 'user7',
    name: '山田美穂',
    avatar: 'https://i.pravatar.cc/150?u=user7',
    isOnline: true,
  },
  {
    id: 'user8',
    name: '中村翔太',
    avatar: 'https://i.pravatar.cc/150?u=user8',
    isOnline: false,
  },
  {
    id: 'user9',
    name: '小林麻衣',
    avatar: 'https://i.pravatar.cc/150?u=user9',
    isOnline: true,
  },
  {
    id: 'user10',
    name: '加藤大輔',
    avatar: 'https://i.pravatar.cc/150?u=user10',
    isOnline: false,
  },
  {
    id: 'user11',
    name: '松本優子',
    avatar: 'https://i.pravatar.cc/150?u=user11',
    isOnline: true,
  },
  {
    id: 'user12',
    name: '井上健一',
    avatar: 'https://i.pravatar.cc/150?u=user12',
    isOnline: false,
  },
  {
    id: 'user13',
    name: '木村彩香',
    avatar: 'https://i.pravatar.cc/150?u=user13',
    isOnline: true,
  },
  {
    id: 'user14',
    name: '清水隆',
    avatar: 'https://i.pravatar.cc/150?u=user14',
    isOnline: false,
  },
  {
    id: 'user15',
    name: '斎藤美咲',
    avatar: 'https://i.pravatar.cc/150?u=user15',
    isOnline: true,
  },
  {
    id: 'user16',
    name: '岡田健太',
    avatar: 'https://i.pravatar.cc/150?u=user16',
    isOnline: false,
  },
  {
    id: 'user17',
    name: '福田愛',
    avatar: 'https://i.pravatar.cc/150?u=user17',
    isOnline: true,
  },
  {
    id: 'user18',
    name: '西村大輔',
    avatar: 'https://i.pravatar.cc/150?u=user18',
    isOnline: false,
  },
  {
    id: 'user19',
    name: '阿部優子',
    avatar: 'https://i.pravatar.cc/150?u=user19',
    isOnline: true,
  },
  {
    id: 'user20',
    name: '石川健一',
    avatar: 'https://i.pravatar.cc/150?u=user20',
    isOnline: false,
  },
  {
    id: 'user21',
    name: '森彩香',
    avatar: 'https://i.pravatar.cc/150?u=user21',
    isOnline: true,
  },
  {
    id: 'user22',
    name: '池田隆',
    avatar: 'https://i.pravatar.cc/150?u=user22',
    isOnline: false,
  },
  {
    id: 'user23',
    name: '橋本美咲',
    avatar: 'https://i.pravatar.cc/150?u=user23',
    isOnline: true,
  },
  {
    id: 'user24',
    name: '小野健太',
    avatar: 'https://i.pravatar.cc/150?u=user24',
    isOnline: false,
  },
]; 

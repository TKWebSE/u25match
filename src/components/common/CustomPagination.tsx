import React from 'react';
import { View } from 'react-native';

type Props = {
  dotsLength: number;      // ドットの総数
  activeDotIndex: number;  // アクティブなドットのインデックス
};

/**
 * カスタムページネーションドット
 * 画像カルーセルなどで現在位置を表示
 */
const CustomPagination = ({ dotsLength, activeDotIndex }: Props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
      {/* ドット配列を生成して表示 */}
      {Array.from({ length: dotsLength }).map((_, i) => (
        <View
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5,
            // アクティブドットは青、非アクティブは灰色
            backgroundColor: i === activeDotIndex ? 'blue' : 'gray',
          }}
        />
      ))}
    </View>
  );
};

export default CustomPagination;

import React from 'react';
import { View } from 'react-native';

type Props = {
  dotsLength: number;
  activeDotIndex: number;
};

const CustomPagination = ({ dotsLength, activeDotIndex }: Props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
      {Array.from({ length: dotsLength }).map((_, i) => (
        <View
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5,
            backgroundColor: i === activeDotIndex ? 'blue' : 'gray',
          }}
        />
      ))}
    </View>
  );
};

export default CustomPagination;

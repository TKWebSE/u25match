// src/components/UserCard.tsx
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import { MockUser } from '../mock/exploreUserMock';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

type Props = {
  user: MockUser;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onImageChange?: (index: number) => void;
  style?: any;
};

export default function UserCard({ user, onSwipeLeft, onSwipeRight, onImageChange, style }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const rotateZ = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const likeOpacity = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: false }
  );

  const handleGestureEnd = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, velocityX } = event.nativeEvent;
    
    if (translationX > SWIPE_THRESHOLD || velocityX > 1000) {
      // Swipe Right (Like)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        onSwipeRight();
        resetCard();
      });
    } else if (translationX < -SWIPE_THRESHOLD || velocityX < -1000) {
      // Swipe Left (Nope)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        onSwipeLeft();
        resetCard();
      });
    } else {
      // Return to center
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const resetCard = () => {
    translateX.setValue(0);
    translateY.setValue(0);
    setCurrentImageIndex(0);
  };

  const handleImageTap = (x: number) => {
    const imageWidth = CARD_WIDTH;
    const isLeftSide = x < imageWidth / 2;
    
    if (isLeftSide && currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      onImageChange?.(newIndex);
    } else if (!isLeftSide && currentImageIndex < user.images.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      onImageChange?.(newIndex);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.END) {
          handleGestureEnd(event);
        }
      }}
    >
      <Animated.View
        style={[
          {
            width: CARD_WIDTH,
            height: 600,
            backgroundColor: 'white',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            transform: [
              { translateX },
              { translateY },
              { rotateZ },
            ],
          },
          style,
        ]}
      >
        {/* Like/Nope Overlays */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            zIndex: 10,
            opacity: likeOpacity,
          }}
        >
          <View style={{
            backgroundColor: '#4CAF50',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#4CAF50',
          }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>LIKE</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
            zIndex: 10,
            opacity: nopeOpacity,
          }}
        >
          <View style={{
            backgroundColor: '#F44336',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#F44336',
          }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>NOPE</Text>
          </View>
        </Animated.View>

        {/* Image Section */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={(event) => handleImageTap(event.nativeEvent.locationX)}
          style={{ flex: 1 }}
        >
          <Image
            source={{ uri: user.images[currentImageIndex] }}
            style={{
              width: '100%',
              height: 400,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            resizeMode="cover"
          />
          
          {/* Image Indicators */}
          <View style={{
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
            {user.images.map((_, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: 3,
                  backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255,255,255,0.3)',
                  marginHorizontal: 2,
                  borderRadius: 1.5,
                }}
              />
            ))}
          </View>

          {/* Online Status */}
          {user.isOnline && (
            <View style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
            }}>
              <View style={{
                width: 8,
                height: 8,
                backgroundColor: '#4CAF50',
                borderRadius: 4,
                marginRight: 4,
              }} />
              <Text style={{ color: 'white', fontSize: 12 }}>オンライン</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* User Info Section */}
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>
              {user.name}
            </Text>
            <Text style={{ fontSize: 20, color: '#666', marginLeft: 8 }}>
              {user.age}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={{ color: '#666', marginLeft: 4, fontSize: 14 }}>
              {user.location}
            </Text>
            {user.distance && (
              <>
                <Text style={{ color: '#666', marginHorizontal: 8 }}>•</Text>
                <Text style={{ color: '#666', fontSize: 14 }}>
                  {user.distance}km
                </Text>
              </>
            )}
          </View>

          <Text style={{ color: '#333', fontSize: 14, lineHeight: 20, marginBottom: 12 }}>
            {user.bio}
          </Text>

          {/* Tags */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {user.tags.slice(0, 3).map((tag, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#E3F2FD',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 15,
                  marginRight: 8,
                  marginBottom: 4,
                }}
              >
                <Text style={{ color: '#1976D2', fontSize: 12, fontWeight: '500' }}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

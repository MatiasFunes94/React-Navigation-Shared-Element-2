import React, { useRef } from 'react';
import {
  Dimensions,
  Animated,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { SafeAreaView } from 'react-native-safe-area-context';

import data from '../data';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.6;
const ITEM_HEIGHT = height * 0.45;
const RADIUS = 20;
const SPACING = width * 0.05;
const FULL_SIZE = ITEM_WIDTH + (SPACING * 2);

const TravelList = ({ navigation }) => {
  
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * FULL_SIZE,
      index * FULL_SIZE,
      (index + 1) * FULL_SIZE,
    ]
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
      extrapolate: 'clamp',
    })
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1, 1.1, 1],
      extrapolate: 'clamp',
    })
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.push('TravelDetail', { item })
        }}
        style={styles.itemContainer}
        activeOpacity={0.8}
      >
        <SharedElement
          id={`item.${item.key}.photo`}
          style={[StyleSheet.absoluteFillObject]}>
          <Animated.Image
            source={{uri: item.image}}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_WIDTH * 1.6,
              borderRadius: 18,
              resizeMode: 'cover',
            }}
          />
        </SharedElement>
        <SharedElement id={`item.${item.key}.location`}>
          <Animated.Text style={{...styles.location, transform: [{translateX}]}}>{item.location}</Animated.Text>
        </SharedElement>
        <View style={styles.days}>
          <Text style={styles.daysValue}>{item.numberOfDays}</Text>
          <Text style={styles.daysLabel}>days</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate={0.95}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default TravelList;

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
  },
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING,
    left: SPACING,
  },
  days: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center'
  },
  daysValue: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  daysLabel: {
    color: '#fff',
    fontSize: 12,
  }
})
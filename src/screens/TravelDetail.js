import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SharedElement } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.6;
const ITEM_HEIGHT = height * 0.45;
const RADIUS = 20;
const SPACING = width * 0.05;
const FULL_SIZE = ITEM_WIDTH + (SPACING * 2);

const TravelDetail = ({route}) => {
  const {item} = route.params;

  const {goBack} = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={35} color="#fff" />
      </TouchableOpacity>
      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Animated.Image
          source={{uri: item.image}}
          style={{ width, height, borderRadius: 0, resizeMode: 'stretch' }}
        />
      </SharedElement>
      {/* <SharedElement id={`item.${item.key}.location`}>
        <Text style={{...styles.location}}>{item.location}</Text>
      </SharedElement> */}
      <SharedElement
        id={`item.${item.key}.location`}
        style={{
          position: 'absolute',
          width: ITEM_WIDTH - SPACING * 2,
          top: 100,
          left: 34,
        }}
      >
        <Text
          style={styles.location}
        >
          {item.location}
        </Text>
      </SharedElement>
    </View>
  );
};

TravelDetail.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.photo`,
    },
    {
      id: `item.${item.key}.location`,
    }
  ]
}

export default TravelDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
  },
})
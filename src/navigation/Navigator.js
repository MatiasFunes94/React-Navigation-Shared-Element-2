import React from 'react';
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import TravelList from '../screens/TravelList';
import TravelDetail from '../screens/TravelDetail';
import { enableScreens } from 'react-native-screens';
// import TravelList from '../others/TravelList';
// import TravelDetail from '../others/TravelListDetail';
enableScreens();

const Stack = createSharedElementStackNavigator();

const NavigatorTravel = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        // cardStyle: {
        //   backgroundColor: 'white',
        // }
      }}>
        <Stack.Screen name="TravelList" component={TravelList} />
        <Stack.Screen
          name="TravelDetail"
          component={TravelDetail}
          sharedElements={(route, otherRoute, showing) => {
            const { item } = route.params;
            return [
              {
                id: `item.${item.key}.photo`,
              },
              {
                id: `item.${item.key}.location`,
              }
            ]
          }}
          options={() => ({
            gestureEnabled: false,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {duration: 300, easing: Easing.inOut(Easing.ease)},
              },
              close: {
                animation: 'timing',
                config: {duration: 300, easing: Easing.inOut(Easing.ease)},
              },
            },
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorTravel;
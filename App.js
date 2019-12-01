import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import Converter from './src/Converter';
import Transaction from './src/Transaction';
import About from './src/About';

const routeMap = {
  Converter: { screen: Converter, navigationOptions: { title: 'Converter' } },
  Transaction: { screen: Transaction, navigationOptions: { title: 'Transaction' } },
  About: { screen: About, navigationOptions: { title: 'About' } },
};
const navigationProp = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Converter') {
        iconName = `md-calculator`;
      } else if (routeName === 'Transaction') {
        iconName = `md-basket`;
      } else if (routeName === 'About') {
        iconName = `ios-information-circle${!focused ? '' : '-outline'}`;
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#e0600b',
    inactiveTintColor: '#fbab76',
    style: {
      height: 60,
      backgroundColor: '#fb6503',
      borderTopColor: 'transparent',
    },
    tabStyle: {
      padding: 10,
    },
    animationEnabled: true,
    swipeEnabled: true,
  },
};

const TabNavigator = createBottomTabNavigator(routeMap, navigationProp);

export default createAppContainer(TabNavigator);
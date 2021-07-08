import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { assets } from '../assets';
import { HomeScreen } from '../screens';
import { Image } from 'react-native';

export enum tabs {
  home = 'home',
  discovery = 'discovery',
  chart = 'chart',
  account = 'account',
}
export type BottomTabParamList = {
  [tabs.home]: undefined;
  [tabs.discovery]: undefined;
  [tabs.chart]: undefined;
  [tabs.account]: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

const BottomBarNavigator = (): React.ReactElement => (
  <Navigator
    tabBarOptions={{
      activeTintColor: '#246BFD',
      inactiveTintColor: '#65656B',
      style: {
        backgroundColor: '#222232',
        borderTopWidth: 0,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        overflow: 'hidden',
        position: 'absolute',
        height: 80,
      },
    }}
  >
    <Screen
      name={tabs.home}
      component={HomeScreen}
      options={{
        title: tabs.home,
        tabBarIcon: () => <Image source={assets.home} resizeMode={'contain'} />,
      }}
    />
    <Screen
      name={tabs.discovery}
      component={HomeScreen}
      options={{
        title: tabs.discovery,
        tabBarIcon: () => (
          <Image source={assets.discovery} resizeMode={'contain'} />
        ),
      }}
    />

    <Screen
      name={tabs.chart}
      component={HomeScreen}
      options={{
        title: tabs.chart,
        tabBarIcon: () => (
          <Image
            source={assets.chart}
            resizeMode={'contain'}
            style={{ height: 24 }}
          />
        ),
      }}
    />

    <Screen
      name={tabs.account}
      component={HomeScreen}
      options={{
        title: tabs.account,
        tabBarIcon: () => (
          <Image source={assets.profile} resizeMode={'contain'} />
        ),
      }}
    />
  </Navigator>
);

export { BottomBarNavigator };

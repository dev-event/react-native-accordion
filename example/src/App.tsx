import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import { assets } from './assets';
import { CollapsedView } from 'react-native-accordion';
import { useCallback } from 'react';

const menu = [
  {
    title: 'UI/UX Creative',
    description: 'The hacking UI podcast',
    image: assets.people_1,
    time: '2 MINS AGO',
  },
  {
    title: 'Joni Ernest',
    description: 'The wicked wall flowers club',
    image: assets.people_2,
    time: '15 MINS AGO',
  },
  {
    title: 'Emilie Lose ',
    description: 'Icon design learning',
    image: assets.people_3,
    time: '45 MINS AGO',
  },
];

const App = () => {
  const handleContentTouchable = useCallback(
    () => (
      <View style={styles.row}>
        <View style={styles.shape}>
          <Image
            source={assets.notification}
            resizeMode={'contain'}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Notifications</Text>
      </View>
    ),
    []
  );

  const handleContent = useCallback(
    () =>
      menu.map(({ title, description, image }) => (
        <View style={styles.contentItem}>
          <Image source={image} resizeMode={'contain'} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <Text style={styles.name}>{title}</Text>
              <Text style={styles.notification}>2 MINS AGO</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.circle}>
                <Text style={styles.notification}>2</Text>
              </View>
            </View>
          </View>
        </View>
      )),
    []
  );
  return (
    <SafeAreaView style={styles.container}>
      <CollapsedView
        onChangeState={(value: boolean) => console.log(value)}
        handleContentTouchable={handleContentTouchable}
        renderContent={handleContent}
        styleTouchable={styles.touchable}
        styleContainer={styles.content}
      />
      <CollapsedView
        onChangeState={(value: boolean) => console.log(value)}
        handleContentTouchable={handleContentTouchable}
        renderContent={handleContent}
        styleTouchable={styles.touchable}
        styleContainer={styles.content}
      />
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
  },
  touchable: {
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentItem: {
    flexDirection: 'row',
    backgroundColor: 'red',
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shape: {
    height: 34,
    width: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5f6ff',
  },

  circle: {
    height: 24,
    width: 24,
    borderRadius: 24 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2276fe',
  },
  notification: {
    color: 'white',
  },
  icon: {
    tintColor: '#00a1ed',
    height: 18,
    width: 18,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 36 / 2,
  },
  title: {
    marginStart: 12,
    fontSize: 20,
    color: '#0b0e25',
  },
  name: {
    fontSize: 14,
    color: '#0b0e25',
  },
  description: {
    fontSize: 14,
    color: '#6da4ff',
  },
});

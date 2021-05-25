import * as React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';

const Sport = ({ title, image }) => (
  <TouchableHighlight
    style={styles.sport}
    underlayColor={'#F4A58A'}
    onPress={() => Alert.alert('Click', title)}
  >
    <>
      <Image source={image} resizeMode={'contain'} style={styles.sportIcon} />
      <Text style={styles.sportItem}>{title}</Text>
    </>
  </TouchableHighlight>
);
export { Sport };

const styles = StyleSheet.create({
  sport: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#222232',
    marginRight: 12,
    borderRadius: 8,
  },
  sportItem: {
    fontSize: 22,
    color: '#FFFFFF',
    marginTop: 12,
  },

  sportIcon: {
    height: 32,
    width: 32,
    alignSelf: 'center',
  },
});

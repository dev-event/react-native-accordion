import * as React from 'react';
import { StyleSheet, Text, Image, Alert, Pressable, View } from 'react-native';

const Event = ({
  commandOne,
  commandTwo,
  iconOne,
  iconTwo,
  type,
  scoreOne,
  scoreTwo,
}) => (
  <Pressable
    style={styles.sport}
    onPress={() => Alert.alert('Click', commandOne)}
  >
    <View style={styles.icons}>
      <View style={styles.shape}>
        <Image
          source={iconOne}
          resizeMode={'contain'}
          style={styles.sportIcon}
        />
      </View>
      <View style={[styles.shape, { marginLeft: 6 }]}>
        <Image
          source={iconTwo}
          resizeMode={'contain'}
          style={styles.sportIcon}
        />
      </View>
    </View>
    <View style={styles.teams}>
      <View style={styles.contentTeam}>
        <Text style={styles.team}>{commandOne}</Text>
        <Text style={styles.score}>{scoreOne}</Text>
      </View>
      <View style={styles.contentVs}>
        <Text style={styles.symbol}>{'vs'}</Text>
        <Text style={styles.symbol}>{'-'}</Text>
      </View>
      <View style={styles.contentTeam}>
        <Text style={styles.team}>{commandTwo}</Text>
        <Text style={styles.score}>{scoreTwo}</Text>
      </View>
    </View>

    <View style={styles.type}>
      <Text style={styles.typeItem}>{type}</Text>
    </View>
  </Pressable>
);
export { Event };

const styles = StyleSheet.create({
  sport: {
    flexDirection: 'row',
    paddingStart: 12,
    backgroundColor: '#2B2B3D',
    borderRadius: 8,
  },
  icons: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },

  teams: {
    flex: 0.7,
    flexDirection: 'row',
    paddingHorizontal: 6,
    justifyContent: 'space-between',
  },
  type: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222232',
  },

  team: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  score: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  typeItem: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  sportIcon: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  shape: {
    height: 38,
    width: 38,
    backgroundColor: '#222232',
    borderRadius: 32 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
  contentTeam: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentVs: {
    justifyContent: 'center',
  },
});

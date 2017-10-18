import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import UI from 'UI';

const time = [
  '9AM',
  '10AM',
  '11AM',
  '12AM',
  '13AM',
  '14AM',
  '15AM',
  '16AM',
  '17AM',
];

class TitleView extends Component {
  onScroll(y) {
    this.scrollView.scrollTo({ x: 0, y, animated: true });
  }

  render() {
    return (
      <View style={styles.container}>
        {time.map((data, index) => (
          <View key={data + index} style={styles.itemView}>
            <View style={styles.rowView}>
              <View style={styles.centerView}>
                <Text style={{ fontSize: 12 }}>{data}</Text>
              </View>
              <View style={{ width: 1, backgroundColor: '#000000' }} />
            </View>
            <View style={{ height: 1, backgroundColor: '#000000' }} />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: UI.size.number100,
    height: UI.size.number60 * 18,
  },
  itemView: {
    height: UI.size.number120,
    width: UI.size.number100,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TitleView;

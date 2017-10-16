import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
const day = ['星期一', '星期一', '星期一', '星期一', '星期一', '星期一', '星期一'];

class TitleView extends Component {
  render() {
    return (
      <View style={styles.container}>
        {time.map((data, index) => {
          console.log('data = ', data);
          return (
            <View
              key={data + index}
              style={{
                height: UI.size.number60,
                width: UI.size.number100,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 12 }}>{data}</Text>
                </View>
                <View style={{ width: 1, backgroundColor: '#000000' }} />
              </View>
              <View style={{ height: 1, backgroundColor: '#000000' }} />
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: UI.size.number60,
    left: 0,
    width: UI.size.number100,
    height: UI.size.number60 * 9,
  },
});

export default TitleView;

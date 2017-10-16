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
  constructor(props) {
    super(props);
    // this.onScroll2 = this.onScroll2.bind(this);
  }

  onScroll(y) {
    this.scrollView.scrollTo({ x: 0, y, animated: true });
  }

  // onScroll2(event) {
  //   console.log('======= onScroll ====== ', event.nativeEvent.contentOffset.y);
  //   this.props.onScroll2(event.nativeEvent.contentOffset.y, 'title');
  // }

  render() {
    return (
      <ScrollView
        ref={o => {
          this.scrollView = o;
        }}
        // onScroll={this.onScroll2}
        scrollEventThrottle={200}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          {time.map((data, index) => {
            console.log('data = ', data);
            return (
              <View
                key={data + index}
                style={{
                  height: UI.size.number120,
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    position: 'absolute',
    top: UI.size.number60,
    left: 0,
    width: UI.size.number100,
    height: UI.size.deviceHeight - UI.size.number60,
  },
  container: {
    flex: 1,
  },
});

export default TitleView;

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import UI from 'UI';
import TitleView from './TitleView';
import GridLayout from './GridLayout';

class ScrollLayout extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.scrollView}>
          <TitleView />
          <GridLayout data={{ timeLength: 9, dayLength: 7 }} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: UI.size.number60,
    width: UI.size.deviceWidth,
    height: UI.size.deviceHeight - UI.size.number60,
  },
  scrollView: {
    width: UI.size.deviceWidth,
    height: UI.size.number60 * 18,
    flexDirection: 'row',
  },
});

export default ScrollLayout;

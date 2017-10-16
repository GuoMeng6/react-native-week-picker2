import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import GridLayout from './component/GridLayout.js';
import TitleView from './component/TitleView';

class ReactPicker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <GridLayout data={{ timeLength: 9, dayLength: 7 }} />
        <TitleView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default ReactPicker;

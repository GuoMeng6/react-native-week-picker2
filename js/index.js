import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import moment from 'moment';

import GridLayout from './component/GridLayout.js';
import TitleView from './component/TitleView';
import HeadView from './component/HeadView';
import ScrollLayout from './component/ScrollLayout';

class ReactPicker extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    // this.onScroll2 = this.onScroll2.bind(this);
  }

  onScroll(data) {
    this.titleView && this.titleView.onScroll(data);
  }

  // onScroll2(data) {
  //   this.gridLayout && this.gridLayout.onScroll2(data);
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollLayout timeStatus={this.props.timeStatus} />
        <HeadView weekMoment={this.props.timeStatus.weekMoment} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 20,
  },
});

export default ReactPicker;

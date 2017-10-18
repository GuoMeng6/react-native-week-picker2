import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import moment from 'moment';

import GridLayout from './component/GridLayout.js';
import TitleView from './component/TitleView';
import HeadView from './component/HeadView';
import ScrollLayout from './component/ScrollLayout';

const defaultData = {
  startTime: 8,
  endTime: 21,
  weekMoment: moment().startOf('week'),
};

class ReactPicker extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll(data) {
    this.titleView && this.titleView.onScroll(data);
  }

  render() {
    const propsStatus = this.props.timeStatus;
    return (
      <View style={styles.container}>
        <ScrollLayout timeStatus={{ ...defaultData, ...propsStatus }} />
        <HeadView
          weekMoment={
            (propsStatus && propsStatus.weekMoment) || defaultData.weekMoment
          }
        />
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

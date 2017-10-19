import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import moment from 'moment';
import zhLocal from 'moment/locale/zh-cn';

import GridLayout from './component/GridLayout.js';
import TitleView from './component/TitleView';
import HeadView from './component/HeadView';
import ScrollLayout from './component/ScrollLayout';

const defaultData = {
  startTime: 8,
  endTime: 21,
  weekMoment: moment().startOf('week'),
};
const URL = 'https://ali.api.officewell.co/v1/';
class ReactPicker extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      rentData: [],
    };
  }

  componentWillMount() {
    const deviceId = '59b0c316306a452314d4d5ea';
    const startTime = moment()
      .locale('zh-cn', zhLocal)
      .startOf('week')
      .unix();
    const endTime = moment
      .unix(startTime)
      .add(7, 'day')
      .unix();
    const url = `${URL}terminal/space-event-record/${deviceId}?startTime=${startTime}&endTime=${endTime}`;
    fetch(url)
      .then(response => response.json())
      .then(res => {
        console.log('======= res = ', res);
        if (res.status === 'success') {
          const filterData = res.data.map(data => {
            console.log(
              '======== 小时 ======= ',
              moment.unix(data.from).get('hour'),
            );
            const subtractFromTime =
              data.from -
              moment
                .unix(data.from)
                .startOf('day')
                .add(defaultData.startTime, 'hour')
                .unix();
            const subtractToTime =
              data.to -
              moment
                .unix(data.to)
                .startOf('day')
                .add(defaultData.startTime, 'hour')
                .unix();
            return {
              start: {
                x: moment.unix(data.from).format('E') - 1,
                y: subtractFromTime / 1800,
              },
              end: {
                x: moment.unix(data.to).format('E') - 1,
                y: subtractToTime / 1800,
              },
            };
          });
          this.setState({
            rentData: filterData,
          });
        }
      });
  }

  onScroll(data) {
    this.titleView && this.titleView.onScroll(data);
  }

  render() {
    const propsStatus = this.props.timeStatus;
    return (
      <View style={styles.container}>
        <ScrollLayout
          timeStatus={{ ...defaultData, ...propsStatus }}
          rentData={this.state.rentData}
        />
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

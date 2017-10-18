/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import moment from 'moment';
import zhLocal from 'moment/locale/zh-cn';
import ReactPicker from './js';

moment.locale('zh-cn', zhLocal);

// 预约开始时间
const startTime = 8;
const endTime = 21;
const weekMoment = moment().startOf('week');
export default class App extends Component<{}> {
  render() {
    return <ReactPicker timeStatus={{ startTime, endTime, weekMoment }} />;
  }
}

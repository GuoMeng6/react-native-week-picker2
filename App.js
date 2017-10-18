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

const URL = 'https://ali.api.officewell.co/v1/';
export default class App extends Component<{}> {
  componentWillMount() {
    const deviceId = '';
    const startTime = '';
    const endTime = '';
    const url =
      `${URL}/terminal/space-event-record/${deviceId}?startTime=${startTime}` &
      `endTime=${endTime}`;
  }

  render() {
    return <ReactPicker />;
  }
}

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import UI from 'UI';
import ClickViewItem from './ClickViewItem';

const defaultState = {
  row: '',
  vertical: '',
  top: 0,
  left: 0,
  height: 0,
};
class GridLayout extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    const data = [];
    const { timeLength, dayLength } = props.data;
    for (let i = 0; i < timeLength * dayLength * 2; i++) {
      data.push({ index: i });
    }
    console.log('data = ', data);
    this.state = {
      dataSource: ds.cloneWithRows(data),
      row: '',
      vertical: '',
      top: 0,
      left: 0,
      height: 0,
    };
    this._renderRow = this._renderRow.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  onScroll() {
    this.props.onScroll(this.listView.scrollProperties.offset);
  }

  clearData() {
    console.log('======== clearData =========');
    this.setState(defaultState);
  }

  // onScroll2(y) {
  //   this.listView.scrollTo({ x: 0, y, animated: true });
  // }

  _renderRow(rowData = {}, sectionID, rowID) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          const index = parseInt(rowID);
          const { dayLength } = this.props.data;

          const row = parseInt(index / dayLength);
          const vertical = index % dayLength;
          console.log(
            '============= 坐标 = ',
            {
              row,
              vertical,
            },
            '   state = ',
            this.state,
          );
          if (
            this.state.vertical !== vertical ||
            this.state.height > UI.size.number60
          ) {
            this.setState({
              row,
              vertical,
              top: row * UI.size.number60,
              left:
                vertical *
                (UI.size.deviceWidth - UI.size.number120) /
                dayLength,
              height: UI.size.number60,
            });
            return;
          }
          // 在同一轴上
          // if (this.state.height > UI.size.number60) {
          //   // 取消当前选中项
          //   this.setState(defaultState);
          //   return;
          // }
          this.setState({
            row: Math.min(this.state.row, row),
            vertical,
            top: Math.min(this.state.row, row) * UI.size.number60,
            left:
              vertical * (UI.size.deviceWidth - UI.size.number120) / dayLength,
            height: UI.size.number60 * (Math.abs(this.state.row - row) + 1),
          });
        }}
      >
        <View
          style={{
            height: UI.size.number60,
            width: (UI.size.deviceWidth - UI.size.number120) / 7,
          }}
        >
          <View style={styles.rowView}>
            <View style={styles.textView}>
              <Text>{rowID}</Text>
            </View>
            <View style={styles.lineView} />
          </View>
          <View style={styles.line2View} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          ref={o => {
            this.listView = o;
          }}
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.listStyle}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          scrollEventThrottle={100}
          iosalwaysBounceHorizontal={false}
          initialListSize={63 * 2}
          onScroll={this.onScroll}
          renderRow={this._renderRow}
        />
        {typeof this.state.row === 'number' ? (
          <ClickViewItem
            style={{
              left: this.state.left + 2,
              top: this.state.top + 2,
              height: this.state.height - 4,
            }}
            clearData={this.clearData}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStyle: {
    flexDirection: 'row', // 改变ListView的主轴方向
    flexWrap: 'wrap', // 换行
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineView: {
    width: 1,
    height: UI.size.number60,
    backgroundColor: '#000000',
  },
  line2View: {
    height: 1,
    backgroundColor: '#000000',
  },
});

export default GridLayout;

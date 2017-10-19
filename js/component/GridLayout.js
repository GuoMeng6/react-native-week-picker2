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
import moment from 'moment';
import ClickViewItem from './ClickViewItem';

const defaultState = [];

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
      defaultState,
      type: 0,
      dataSource: ds.cloneWithRows(data),
    };
    console.log('============ this.state  = ', this.state);
    this._renderRow = this._renderRow.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  clearData() {
    console.log('======== clearData =========');
    this.setState(defaultState);
  }

  // onScroll2(y) {
  //   this.listView.scrollTo({ x: 0, y, animated: true });
  // }

  filterData(x, y, rangeData) {
    const rentData = this.props.rentData;
    let flag = false; // 标记是否包含已选择的区块
    const range = rangeData;
    //* ******判断是否为第一次点击 */
    console.log('-------range----', range);

    if (!range) {
      console.log('-----------');

      return {
        start: {
          x,
          y,
        },
        end: {
          x: x + 1,
          y: y + 1,
        },
      };
    }
    if (
      range.start.x <= x <= range.end.x &&
      range.start.y <= y <= range.end.y
    ) {
      console.log('-----false-----');

      return false;
    }

    if (x > range.start.x && y > range.start.y) {
      range.end.x = x + 1;
      range.end.y = y + 1;
    } else {
      console.log('-------111------');

      let tmp;
      tmp = range.start.x;
      range.start.x = x;
      range.end.x = tmp + 1;
      tmp = range.start.y;
      range.start.y = y;
      range.end.y = tmp + 1;
    }
    console.log('-----222range2-----', range);

    for (let i = 0; i < rentData.length; i++) {
      if (range.start.x < x < range.end.x && range.start.y < y < range.end.y) {
        flag = true;
        break;
      }
    }

    if (flag) {
      return {
        start: {
          x,
          y,
        },
        end: {
          x,
          y,
        },
      };
    }
    return range;
  }
  _renderRow(rowData = {}, sectionID, rowID) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          const index = parseInt(rowID);
          const { dayLength } = this.props.data;
          const y = parseInt(index / dayLength);
          const x = index % dayLength;
          console.log('============= 坐标 = ', {
            y,
            x,
          });

          // const currentDay9amUnix = moment
          //   .unix(this.props.weekMoment.unix())
          //   .add(vertical, 'day')
          //   .add(this.props.timeStatus.startTime, 'hour')
          //   .unix();

          const range = this.state.defaultState[0];
          const result = this.filterData(x, y, range);
          console.log('=========result=====', result);

          // if (
          //   this.state.vertical !== vertical ||
          //   this.state.height > UI.size.rowHeight
          // ) {
          //   this.setState({
          //     row,
          //     vertical,
          //     top: row * UI.size.rowHeight,
          //     left:
          //       vertical *
          //       (UI.size.deviceWidth - UI.size.number120) /
          //       dayLength,
          //     height: UI.size.rowHeight,
          //     startTime: currentDay9amUnix + row * 1800,
          //     endTime: currentDay9amUnix + (row + 1) * 1800,
          //   });

          //   return;
          // }
          // // 在同一轴上
          // // if (this.state.height > UI.size.rowHeight) {
          // //   // 取消当前选中项
          // //   this.setState(defaultState);
          // //   return;
          // // }

          // const rowMin = Math.min(this.state.row, row);
          // const halfHourCount = Math.abs(this.state.row - row) + 1;
          // console.log('========== 同一轴上 ======= ', {
          //   rowMin,
          //   halfHourCount,
          //   startTime: currentDay9amUnix + rowMin * 1800,
          //   endTime: currentDay9amUnix + rowMin * 1800 + halfHourCount * 1800,
          // });
          // this.setState({
          //   row: rowMin,
          //   vertical,
          //   top: rowMin * UI.size.rowHeight,
          //   left:
          //     vertical * (UI.size.deviceWidth - UI.size.number120) / dayLength,
          //   height: UI.size.rowHeight * halfHourCount,
          //   startTime: currentDay9amUnix + rowMin * 1800,
          //   endTime: currentDay9amUnix + rowMin * 1800 + halfHourCount * 1800,
          // });
        }}
      >
        <View
          style={{
            height: UI.size.rowHeight,
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
    console.log('========= [render] ======== ', this.props.rentData);
    const { timeLength, dayLength } = this.props.data;
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
          iosalwaysBounceHorizontal={false}
          initialListSize={timeLength * dayLength * 2}
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
            title={`${moment
              .unix(this.props.startTime)
              .format('HH:mm')}-${moment
              .unix(this.props.endTime)
              .format('HH:mm')}`}
            startTime={this.state.startTime}
            endTime={this.state.endTime}
          />
        ) : null}
        {this.props.rentData.map((data, index) => {
          console.log('data = ', data);
          return (
            <ClickViewItem
              key={`clickItem${index}`}
              style={{
                left: data.start.x * UI.size.rowWidth + 2,
                top: data.start.y * UI.size.rowHeight + 2,
                height: (data.end.y - data.start.y) * UI.size.rowHeight - 4,
                backgroundColor: '#ffe66f',
              }}
              disabled
              title={data.title}
              subTitle={data.subTitle}
            />
          );
        })}
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
    height: UI.size.rowHeight,
    backgroundColor: '#000000',
  },
  line2View: {
    height: 1,
    backgroundColor: '#000000',
  },
});

export default GridLayout;

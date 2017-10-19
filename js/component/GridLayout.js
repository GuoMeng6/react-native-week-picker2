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
    this.state = {
      defaultState: [],
      type: 0,
      dataSource: ds.cloneWithRows(data),
      selectedItem: {},
    };
    this._renderRow = this._renderRow.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  clearData() {
    this.setState({ defaultState: [] });
  }

  // onScroll2(y) {
  //   this.listView.scrollTo({ x: 0, y, animated: true });
  // }

  filterClickData(x, y, rangeData) {
    const rentData = this.props.rentData;
    const flag = false; // 标记是否包含已选择的区块
    const range = rangeData;
    //* ******判断是否为第一次点击 */
    if (!range) {
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

    if (x < range.start.x) {
      range.start.x = x;
    } else {
      range.end.x = x + 1;
    }

    if (y < range.start.y) {
      range.start.y = y;
    } else {
      range.end.y = y + 1;
    }

    return range;
  }

  filterData(aRange, bRanges) {
    const aStartX = aRange.start.x;
    const aStartY = aRange.start.y;

    const aEndX = aRange.end.x;
    const aEndY = aRange.end.y;

    for (let i = 0; i < bRanges.length; i++) {
      const bStartX = bRanges[i].start.x;
      const bStartY = bRanges[i].start.y;

      const bEndX = bRanges[i].end.x;
      const bEndY = bRanges[i].end.x;

      if (
        !(
          aEndX <= bStartX ||
          aStartX >= bEndX ||
          aEndY <= bStartY ||
          aStartY >= bEndY
        )
      ) {
        return false;
      }
    }
    return true;
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

          const range = this.state.defaultState[0];
          const result = this.filterClickData(x, y, range);

          const mergeProps = this.filterData(result, this.props.rentData);
          if (!mergeProps) {
            console.log('========= mergeProps ===========');
          }
          const mergeState = this.filterData(result, this.state.defaultState);
          if (!mergeState) {
            // console.log('========= mergeState ===========');
          }
          const returnData = this.props.onSelectedChanged(result);
          this.setState({
            defaultState: [result],
            selectedItem: returnData,
          });
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
        {this.state.defaultState.map((data, index) => (
          <ClickViewItem
            key={`click2Item${index}`}
            style={{
              left: data.start.x * UI.size.rowWidth + 2,
              top: data.start.y * UI.size.rowHeight + 2,
              height: (data.end.y - data.start.y) * UI.size.rowHeight - 4,
              width: (data.end.x - data.start.x) * UI.size.rowWidth - 4,
            }}
            disabled={false}
            clearData={this.clearData}
            title={this.state.selectedItem.title}
            subTitle={this.state.selectedItem.subTitle}
          />
        ))}
        {this.props.rentData.map((data, index) => (
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
        ))}
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

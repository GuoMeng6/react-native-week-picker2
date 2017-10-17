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
    };
    this._renderRow = this._renderRow.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    this.props.onScroll(this.listView.scrollProperties.offset);
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
          console.log('============= 坐标 = ', {
            row: parseInt(index / dayLength),
            vertical: index % dayLength,
          });
          const row = parseInt(index / this.props.data.dayLength);
          const vertical = index % this.props.data.dayLength;
          this.setState({
            row,
            vertical,
            top: row * UI.size.number60,
            left:
              vertical * (UI.size.deviceWidth - UI.size.number120) / dayLength,
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
            style={{ left: this.state.left + 2, top: this.state.top + 2 }}
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
    marginLeft: UI.size.number100,
    marginTop: UI.size.number60,
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

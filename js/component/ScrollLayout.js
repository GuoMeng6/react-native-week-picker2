import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import GridPicker from 'react-native-grid-picker';

import UI from 'UI';
import TitleView from './TitleView';

class ScrollLayout extends Component {
  render() {
    const timeStamp =
      this.props.timeStatus.endTime - this.props.timeStatus.startTime + 1;
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.scrollView,
            { height: UI.size.rowHeight * timeStamp * 2 },
          ]}
        >
          <TitleView
            timeStatus={this.props.timeStatus}
            timeLength={
              this.props.timeStatus.endTime -
              this.props.timeStatus.startTime +
              1
            }
          />
          <GridPicker
            coordinate={{
              row:
                (this.props.timeStatus.endTime -
                  this.props.timeStatus.startTime +
                  1) *
                2,
              column: 7,
            }}
            displayData={this.props.displayData}
            onSelectedChanged={this.props.onSelectedChanged}
            itemStyle={{ width: 120, height: 60 }}
            type="COLUMN"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: UI.size.rowHeight,
    width: UI.size.deviceWidth,
    height: UI.size.deviceHeight - UI.size.rowHeight - 20,
  },
  scrollView: {
    width: UI.size.deviceWidth,
    flexDirection: 'row',
  },
});

export default ScrollLayout;

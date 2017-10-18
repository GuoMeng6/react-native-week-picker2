import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import UI from 'UI';
import TitleView from './TitleView';
import GridLayout from './GridLayout';

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
            { height: UI.size.number60 * timeStamp * 2 },
          ]}
        >
          <TitleView timeStatus={this.props.timeStatus} />
          <GridLayout
            data={{
              timeLength:
                this.props.timeStatus.endTime -
                this.props.timeStatus.startTime +
                1,
              dayLength: 7,
            }}
            timeStatus={this.props.timeStatus}
            weekMoment={this.props.timeStatus.weekMoment}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: UI.size.number60,
    width: UI.size.deviceWidth,
    height: UI.size.deviceHeight - UI.size.number60 - 20,
  },
  scrollView: {
    width: UI.size.deviceWidth,
    flexDirection: 'row',
  },
});

export default ScrollLayout;
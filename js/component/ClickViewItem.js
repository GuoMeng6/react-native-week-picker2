import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import UI from 'UI';
import moment from 'moment';

class ClickViewItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        activeOpacity={1}
        onPress={this.props.clearData}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12 }}>
            {`${moment
              .unix(this.props.startTime)
              .format('HH:mm')}-${moment
              .unix(this.props.endTime)
              .format('HH:mm')}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#00ffff',
    height: UI.size.rowHeight - 4,
    width: (UI.size.deviceWidth - UI.size.number120) / 7 - 4,
    borderRadius: 4,
  },
});

export default ClickViewItem;

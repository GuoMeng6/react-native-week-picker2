import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import UI from 'UI';

class ClickViewItem extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={{ fontSize: 10 }}>9:00-10:00</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#00ffff',
    height: UI.size.number60 - 4,
    width: (UI.size.deviceWidth - UI.size.number120) / 7 - 4,
    borderRadius: 4,
  },
});

export default ClickViewItem;

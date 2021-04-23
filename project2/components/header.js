import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class Header extends React.Component {
  styles = StyleSheet.create({
    header: {
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      width: '100%',
      flexDirection: 'row',
      zIndex: 2,
      backgroundColor: '#353B43'
    },
  });

  spaceHolder = () => {
    if (this.props.textbox) {
      return <this.props.textbox />;
    } else {
      return <View></View>;
    }
  };

  render() {
    return (
      <View style={this.styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={{ height: 40, width: 40, marginRight: 10 }}
        />
        <this.spaceHolder />
      </View>
    );
  }
}

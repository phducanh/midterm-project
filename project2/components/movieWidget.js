import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class MovieWidget extends React.Component {
  style = StyleSheet.create({
    container: {
      width: '90%',
      aspectRatio: 5 / 1,
      marginBottom: 5,
      backgroundColor: '#ffffff',
      color: 'black',
      borderRadius: '15%',
    },
    view: {
      flexDirection: 'row',
      height: '100%',
      marginTop: 0,
      paddingTop: 0,
    },
    info: {
      marginLeft: '2.5%',
      flex: 1,
      paddingTop: 10,
    },
    movieImage: {
      //justifyContent: 'center',
      //alignItems: 'center',
      //paddingLeft: '2%',
      marginTop: 0,
      paddingTop: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    text: {
      fontSize: 12,
    },
    image: {
      //width: 50,
      //height: 50,
      //borderRadius: '50%',
      height: '100%',
      width: 70,
      borderTopLeftRadius: '15%',
      borderBottomLeftRadius: '15%',
    },
  });

  constructor() {
    super();
  }

  render() {
    return (
      <TouchableHighlight
        style={this.style.container}
        onPress={() =>
          this.props.navigation.navigate('View', {
            movie: this.props.movie,
          })
        }>
        <View style={this.style.view}>
          <View style={this.style.movieImage}>
            <Image
              style={this.style.image}
              source={{ uri: this.props.image }}
            />
          </View>
          <View style={this.style.info}>
            <Text style={this.style.title}>{this.props.movie}</Text>
            <Text style={this.style.text}>{this.props.year}</Text>
            <Text style={this.style.text}>{this.props.description}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

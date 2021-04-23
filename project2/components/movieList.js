import React from 'react';
import { StatusBar, StyleSheet, View, SafeAreaView, FlatList, Image, Text, TouchableHighlight, TextInput } from 'react-native';
import Constants from 'expo-constants'
import MovieWidget from './movieWidget'
import Header from './header'

export default class MovieList extends React.Component{
  constructor(props){
    super(props)
    this.searchFunction = this.props.route.params.searchFunction
  }

  style = StyleSheet.create({
    container:{
      flex: 1,
      textAlign: "center",
      alignItems: "center",
      backgroundColor: "#575b72",
    },
    scroll:{
      width: "100%",
      marginTop: Constants.statusBarHeight + 20,
      textAlign: "center",
      alignItems: "center",
    },
    textbox:{
      width: '80%',
      height: 40,
      backgroundColor: 'white',
      borderRadius: 16,
      zIndex: 2,
      paddingLeft: '2%'
    }
  })

  state = {
    movieData: {},
    searchText: "Spider-Man",
  }

  createMovieComponents(movieObject){
    return(
        <MovieWidget
            movie={movieObject.item.Title}
            year={movieObject.item.Year}
            image={movieObject.item.Poster}
            navigation={this.props.navigation}
        />
      )
  }

  componentDidMount(){
    this.getData(this.props.route.params.movieData)
  }

  getData = async (data) => {
    let movieData = await data
    this.setState({movieData: movieData})
  }

  SearchBox = () => {
    return(
      <TextInput
        style={this.style.textbox}
        text={this.state.searchText}
        onChangeText={text => this.setState({searchText: text})}
        onEndEditing={e => this.getData(this.searchFunction(this.state.searchText))}
        placeholder="Search for movies..."
      />
    )
  }

  render(){
    return(
        <View style={this.style.container}>
          <Header textbox={this.SearchBox}/>
          <FlatList
            data={this.state.movieData}
            renderItem={(movieObject) => this.createMovieComponents(movieObject)}
            contentContainerStyle={this.style.scroll}
            />
        </View>
    )
  }
}
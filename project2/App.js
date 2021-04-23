import 'react-native-gesture-handler';
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
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieList from './components/movieList';
import Movie from './components/movie';
import { searchMovies, getMovie } from './scripts/movieData';
import Icon from 'react-native-vector-icons/FontAwesome';


const tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <tab.Navigator
        initialRouteName={'View'}
        tabBarOptions={{
          style: { backgroundColor: '#353B43', borderTopColor: 'transparent' },
        }}>
        <tab.Screen
          name="Search"
          component={MovieList}
          initialParams={{
            movieData: searchMovies('Spider-Man'),
            searchFunction: searchMovies,
          }}
          options={{
            tabBarIcon: (c) => <Icon name="search" size={30} color="#fff" />,
          }}
        />

        <tab.Screen
          name="View"
          component={Movie}
          initialParams={{
            movie: 'Spider-Man',
            getFunction: getMovie,
          }}
          options={{
            tabBarIcon: (c) => (
              <Icon name="video-camera" size={30} color="#fff" />
            ),
          }}
        />

        <tab.Screen
          name="Settings"
          options={{
            tabBarIcon: (c) => <Icon name="sliders" size={30} color="#fff" />,
          }}
        />
      </tab.Navigator>
    </NavigationContainer>
  );
}
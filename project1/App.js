import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {vibrate} from "./utils/vibrate.js"
import Constants from "expo-constants"

const DefaultWorkTime = 25
const DefaultBreakTime = 5

export default class TImer extends React.Component {
  state = {
    workTime: DefaultWorkTime,
    breakTime: DefaultBreakTime,
    timer: DefaultWorkTime * 60,
    isWork: true,
    isRunning: false,
  }

  timerStartPause(){
    this.state.isRunning ? this.pauseTimer() : this.startTimer()
  }

  changeTimer = () => {
    if(this.state.isRunning && !this.state.timer){
      vibrate()
      this.setState(prevState => ({
        timer: this.state.isWork ? this.state.breakTime * 60 : this.state.workTime * 60,
        isWork : !prevState.isWork
      }))
    }
  }

  decTime = () => {
    this.setState(prevState => ({
      timer: prevState.timer - 1
    }))
    this.changeTimer()
  }

  startTimer = () => {
      this.interval = setInterval(this.decTime, 1000);

      this.setState(prevState => ({
        isRunning: !prevState.isRunning,
      }))
  }

  componentDidMount(){
    this.startTimer()
  }

  componentWillUnmount(){
    this.pauseTimer()
  }

  pauseTimer = () => {
      clearInterval(this.interval);
      console.log("pause")
      this.setState({
        isRunning: !this.state.isRunning
      })
  }

  resetTimer = () => {
    const { isWork } = this.state
    
    clearInterval(this.interval);
    
    this.setState({
      timer: isWork ? this.state.workTime * 60 : this.state.breakTime * 60,
      isRunning: false
    })
  }

  timeFormat(){
    const { timer } = this.state;
    const mins = Math.floor(timer / 60);
    const secs = Math.floor(timer % 60);
    return `${mins}: ${secs < 10 ? "0" : ""}${secs}`;
  }

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <Text style = {styles.title}>{this.state.isWork ? "Work Timer" : "Break Timer"}</Text>
        <Text style={styles.title}>{this.timeFormat()}</Text>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress = {() => this.timerStartPause()}>
            <Text>{this.state.isRunning ? "Pause" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {() => this.resetTimer()}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Constants.statusBarHeight,
  },
  title:{
    fontSize: 40,
    fontWeight: "bolder",
  },
  buttonView:{
    flexDirection: "row",
    padding: 5,
    margin: 10,
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#61dafb",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
});
import React, { useState ,useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Splash = ({navigation}) => {

    return (
      <View style={styles.splash}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );}
    




const styles = StyleSheet.create({
  splash: {
flex:1,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  text: {
    fontSize: 20
  }
});

export default Splash;
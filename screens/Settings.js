import React, {useState, useContext} from "react";
import { Text, View, StyleSheet, Button, Switch } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../theme/themeContext";


export default function Settings(){
  const theme = useContext(themeContext)
  const [DarkMode, setDarkMode] = useState(false);
  
  return (

    <View style={[styles.container, {backgroundColor: theme.background}]}>
    <Text style={[styles.text, { color:theme.color}]}> Change between lightmode and darkmode </Text>
    <Switch value={DarkMode}  onValueChange={(value)=>{setDarkMode(value); EventRegister.emit("ChangeTheme", value) }}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems: "center",

  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 20,
  },
});
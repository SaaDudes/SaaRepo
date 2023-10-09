import { View, Text, StyleSheet, Switch } from 'react-native'
import React, {useState,useContext} from 'react'
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../theme/themeContext'
import theme from '../theme/theme';

const Settings = () => {
    const theme = useContext(themeContext)
    const [darkMode, setDarkMode] = useState(false)
  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
      <Text style={[styles.text, {color:theme.color}]}>Settings</Text>
      <Switch
        value={darkMode}
        onValueChange={(value) => {
          setDarkMode(value);
          EventRegister.emit('ChangeTheme',value)
          
        }}
      
      
      />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'

  },
  text:{
    fontSize:30,
    fontWeight:'bold'
  }
})
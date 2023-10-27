import { DefaultTheme, NavigationContainer, DarkTheme} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState, useEffect} from 'react';
import Settings from '../screens/Settings';
import HomeScreen from '../screens/HomeScreen';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';




export default function App() {

  const [ DarkMode, setDarkMode ] = useState(false);
  const homeDrawerIcon =({focused, color, size})=> <Icon name="home" color={color} size={size} />
  const settingsDrawerIcon =({focused, color, size})=> <Icon name="cog" color={color} size={size} />
  const Drawer = createDrawerNavigator();

  useEffect(() => { 
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data)
    }) 
    return ()=>{EventRegister.removeAllListeners(listener)
    } 
  }, [DarkMode])

  return (
    <themeContext.Provider value={DarkMode === true ? theme.darkMoodi : theme.lightMoodi}>
    <NavigationContainer theme={DarkMode === true ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Home" options={{ drawerIcon:homeDrawerIcon, headerShown: false}} component={HomeScreen}/> 
        <Drawer.Screen name="Settings" options={{ drawerIcon:settingsDrawerIcon, headerShown: false}} component={Settings}/>
      </Drawer.Navigator>
    </NavigationContainer>
    </themeContext.Provider>
  );
}



import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Settings from './screens/Settings';
import { EventRegister } from 'react-native-event-listeners';
import React, {useState, useEffect} from 'react';
import theme from './theme/theme';
import themeContext from './theme/themeContext';


const Stack = createStackNavigator();

export default function App() {
  const[darkMode, setDarkMode] = useState(false)

  useEffect(()=> {
    const listener = EventRegister.addEventListener('ChangeTheme',(data) => {
      setDarkMode(data)
      
    })
    return ()=> {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])
  

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>

      </NavigationContainer>

    </themeContext.Provider>
    
  );
}


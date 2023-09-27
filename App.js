
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from './screens/Home';
import Settings from './screens/Settings';
import { EventRegister } from 'react-native-event-listeners';
import React, {useState, useEffect} from 'react';
import theme from './theme/theme';
import themeContext from './theme/themeContext';


const Tab = createMaterialBottomTabNavigator();

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
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>

      </NavigationContainer>

    </themeContext.Provider>
    
  );
}


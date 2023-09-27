import {  View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native'
import { VStack, Box, Divider, HStack, Stack, Pressable, Flex } from "@react-native-material/core";
import React, {useContext,useState} from 'react'
import { fetchWeatherForecast } from '../api/weather';
import themeContext from '../theme/themeContext';
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";



const Home = () => {
  const theme = useContext(themeContext);
  const [showSearch, toggleSearch] = useState(false);
  return(
  
      <View className="flex-1 relative">
          <StatusBar style="light" /> 
          <Image blurRadius={70} source={require('../assets/images/darkBg.jpg')} className="absolute h-full w-full"/> 
          
          <SafeAreaView className="flex flex-1">
              <View style={{top: 50}} className="mx-4 relative z-50">
                      <View className="flex-row justify-end items-center rounded-full" style={{backgroundColor: 'black'}}>
                      <TextInput placeholder='Search City' placeholderTextColor={'white'} className="pl-6 h-14 flex-1 text-base text-white"/>
      
                      <TouchableOpacity style={{backgroundColor: '#222424'}} className="rounded-full p-3 m-1">
                      <Icon name="magnify" color={'white'} size={40}/>
                      </TouchableOpacity>
              </View>
      
              <VStack>
                <Box h={400} style={{backgroundColor: 'transparent'}} />
                {/*TÄMÄ ON VAAAN TYHJÄ LAATIKKO TESTIN VUOKSI*/}
              </VStack>
                      <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 15}} showsHorizontalScrollIndicator={false}>
              <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: '#060C0F'}}>
                      <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                      <Text className = "text-white"> Monday </Text>
                      <Text className ="text-white text-xl font-semibold"> 13</Text>
              </View>
      
              <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: '#060C0F'}}>
                      <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                      <Text className ="text-white"> Monday </Text>
                      <Text className ="text-white text-xl font-semibold"> 13</Text>
              </View>
      
              <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: '#060C0F'}}>
                      <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                      <Text className ="text-white"> Monday </Text>
                      <Text className ="text-white text-xl font-semibold"> 13</Text>
              </View>
      
              <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: '#060C0F'}}>
                      <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                      <Text className ="text-white"> Monday </Text>
                      <Text className ="text-white text-xl font-semibold"> 13</Text>
              </View>
                      </ScrollView>
            </View>
          </SafeAreaView>
        </View>
  )
}

export default Home


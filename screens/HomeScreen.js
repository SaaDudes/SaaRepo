import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native'
import React, {useState, useContext} from 'react'
import { Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { VStack, Box, Divider, HStack, Stack, Pressable, Flex} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import themeContext from '../theme/themeContext';

export default function HomeScreen(){
  
  const nav = useNavigation();
  const theme = useContext(themeContext);

    return(
  
<View className="flex-1 relative">
    <StatusBar style="light" />
    <View style={{backgroundColor: theme.background}} className="absolute h-full w-full"></View>
     {/* <Image blurRadius={70} source={require('../assets/images/darkBg.jpg')} className="absolute h-full w-full"/> */}
   
    <SafeAreaView className="flex flex-1">
        

        <View style={{top: 50}} className="mx-4 relative z-50">
                <View className="flex-row justify-end items-center rounded-full" style={{backgroundColor: theme.color2}}>
                <TouchableOpacity style={{ left: 10}}onPress={() => nav.openDrawer()}>
                <Icon name="format-list-bulleted" color={theme.color} size={35}/>
                </TouchableOpacity>
                <TextInput placeholder='Search City' placeholderTextColor={theme.color} className="pl-6 h-14 flex-1 text-base text-white"/>

                <TouchableOpacity style={{backgroundColor: theme.color4}} className="rounded-full p-3 m-1">
                <Icon name="magnify" color={theme.color} size={35} left={2}/>
                </TouchableOpacity>
        </View>

        <VStack>
          <Box h={540} style={{backgroundColor: 'transparent'}} />
          {/*TÄMÄ ON VAAAN TYHJÄ LAATIKKO TESTIN VUOKSI*/}
        </VStack>
                <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 15}} showsHorizontalScrollIndicator={false}>
        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.color3}}>
                <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                <Text className ="text-white"> Monday </Text>
                <Text className ="text-white text-xl font-semibold"> 13</Text>
        </View>

        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.color3}}>
                <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                <Text className ="text-white"> Monday </Text>
                <Text className ="text-white text-xl font-semibold"> 13</Text>
        </View>

        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.color3}}>
                <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                <Text className ="text-white"> Monday </Text>
                <Text className ="text-white text-xl font-semibold"> 13</Text>
        </View>

        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.color3}}>
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

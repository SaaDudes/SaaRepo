import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { ImageBackground, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { VStack, Box, Divider, HStack, Stack, Pressable, Flex} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import themeContext from '../theme/themeContext';
import {CalendarDaysIcon} from 'react-native-heroicons/solid'
import { fetchWeatherForecast, fetchLocations } from '../api/weather';
import { weatherImages } from '../constants';

const HomeScreen = () =>{
  
const [showSearch, toggleSearch] = useState(false);
const [weather, setWeather] = useState({})
const [locations, setLocations] = useState([])
const nav = useNavigation();
const theme = useContext(themeContext);

useEffect(() =>{
        fetchLocations().then(data=>{
                console.log('sain dataa:',data)
                setLocations(data);
                fetchLocations()
                
        })},[]);

        useEffect(() => {
                fetchWeatherForecast().then(data=>{
                        console.log('sain ennusteen:',data);
                        setWeather(data);
                })
        },[]);

        const {location,current} = weather

    return(
  
<View className="flex-1 relative">
    <StatusBar style="light" />
    <Image source={theme.background} className="absolute h-full w-full" blurRadius={70}/>
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
        </View>

<View style={{top: 30}} className= "mx-4 flex justify-around flex-1 mb-2">
    {/*Sää lokaatio */}
    <Text className= "text-center text-2xl font-bold" style={[{color:theme.color}]}>
            {location?.name},
            <Text className="text-lg font-semibold" style={[{color:theme.color}]}>
                    {" " + location?.country}
    
            </Text>
    </Text>
    {/*Säätä kuvaava iconi */}
    <View className="flex-row justify-center">
    <Image source={weatherImages[current?.condition?.text || 'other']} className="w-52 h-52" />        
    </View>

    {/*Lämpötila celcius*/}
    <View className="space-y-2">
            <Text className="text-center font-bold text-6xl ml-5" style={[{color:theme.color}]}>
                    {current?.temp_c}&#176;

            </Text>
            <Text className="text-center text-2xl ml-3 tracking-widest font-bold" style={[{color:theme.color}]}>
                    {current?.condition?.text}
            </Text>
    </View>
    {/*Muut Arvot*/}
    <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/icons/wind.png')} className="h-6 w-6" />

                    <Text className="font-semibold text-base" style={[{color:theme.color}]}>
                            {Math.trunc(current?.wind_kph * 1000 / 3600)}m/s
                           {/** 1000 /3600}m/s laskukaava miten saada m/s.. löydä keino miten poistaa "jakojäännös"*/ }
                    </Text>
                   
            </View>
            <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/icons/drop.png')} className="h-6 w-6" />

                    <Text className="font-semibold text-base" style={[{color:theme.color}]}>
                          {current?.humidity}%
                    </Text>
                   
            </View>
            <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/icons/sun.png')} className="h-6 w-6" />

                    <Text className="font-semibold text-base" style={[{color:theme.color}]}>
                            {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                    </Text>
                   
            </View>
    </View>
</View>       

    {/*Sää ennuste 3pvä*/}
    <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
                    <CalendarDaysIcon size="22" color="white" />
                    <Text className="text-base" style={[{color:theme.color}]}>Daily Forecast</Text>

            </View>


                <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 35}} showsHorizontalScrollIndicator={false}>
        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.color3}}>
                <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                <Text className ="text-white"> Monday </Text>
                <Text className ="text-white text-xl font-semibold"> 13&#176;</Text>
        </View>

        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.color3}}>
                <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                <Text className ="text-white"> Monday </Text>
                <Text className ="text-white text-xl font-semibold"> 13&#176;</Text>
        </View>

        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.color3}}>
                <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11"/>
                <Text className ="text-white"> Monday </Text>
                <Text className ="text-white text-xl font-semibold"> 13&#176;</Text>
        </View>


                </ScrollView>
      </View>
    </SafeAreaView>
</View>
  )
}

export default HomeScreen
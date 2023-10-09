import {  View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView, ImageBackground} from 'react-native'
import { VStack, Box, Divider, HStack, Stack, Pressable, Flex } from "@react-native-material/core";
import React, {useContext,useEffect,useState} from 'react'
import { fetchWeatherForecast, fetchLocations } from '../api/weather';
import themeContext from '../theme/themeContext';
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import {CalendarDaysIcon} from 'react-native-heroicons/solid'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";



const Home = () => {
  const theme = useContext(themeContext);
  const [showSearch, toggleSearch] = useState(false);
  const [weather, setWeather] = useState({})
  const [locations, setLocations] = useState([])


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
          <StatusBar style={theme.bar} /> 
          <View className="absolute h-full w-full" style={[{backgroundColor:theme.background}]}/>
         
          
          <SafeAreaView className="flex flex-1">
              <View style={{top: 20}} className="mx-4 relative z-50">
                      <View className="flex-row justify-end items-center rounded-full" style={{backgroundColor: 'black'}}>
                      <TextInput placeholder='Search City' placeholderTextColor={'white'} className="pl-6 h-14 flex-1 text-base text-white"/>
      
                      <TouchableOpacity style={{backgroundColor: '#222424'}} className="rounded-full p-3 m-1">
                      <Icon name="magnify" color={'white'} size={40}/>
                      </TouchableOpacity>
              </View>
      
            </View>

            <View className= "mx-4 flex justify-around flex-1 mb-2">
                {/*Sää lokaatio */}
                <Text className= "text-center text-2xl font-bold" style={[{color:theme.color}]}>
                        {location?.name},
                        <Text className="text-lg font-semibold" style={[{color:theme.color}]}>
                                {" " + location?.country}
                
                        </Text>
                </Text>
                {/*Säätä kuvaava iconi */}
                <View className="flex-row justify-center">
                        <Image
                                source={{uri: 'https:'+current?.condition?.icon}}
                                //source={require('../assets/images/partlycloudy.png')}
                                className="w-52 h-52"
                        />        

                </View>

                {/*Lämpötila celcius*/}
                <View className="space-y-2">
                        <Text className="text-center font-bold text-6xl ml-5" style={[{color:theme.color}]}>
                                {current?.temp_c}&#176;

                        </Text>
                        <Text className="text-center text-xl ml-5 tracking-widest" style={[{color:theme.color}]}>
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
                        <ScrollView
                        horizontal
                        contentContainerStyle={{paddingHorizontal: 15}}
                        showsHorizontalScrollIndicator={false}
                        >
                          <View
                                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                                style={[{backgroundColor:theme.background}]}
                                >

                                <Image source={require('../assets/images/heavyrain.png')} 
                                className="h-11 w-11" />
                                <Text style={[{color:theme.color}]}>Monday</Text>
                                <Text className="text-xl font-semibold" style={[{color:theme.color}]}>13&#176; </Text>      
                                </View>

                                <View
                                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                                style={[{backgroundColor:theme.background}]}
                                >

                                <Image source={require('../assets/images/heavyrain.png')} 
                                className="h-11 w-11" />
                                <Text style={[{color:theme.color}]}>Tuesday</Text>
                                <Text className="text-xl font-semibold" style={[{color:theme.color}]}>13&#176; </Text>      
                                </View>

                                <View
                                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                                style={[{backgroundColor:theme.background}]}
                                >

                                <Image source={require('../assets/images/heavyrain.png')} 
                                className="h-11 w-11" />
                                <Text style={[{color:theme.color}]}>Wednesday</Text>
                                <Text className="text-xl font-semibold" style={[{color:theme.color}]}>13&#176; </Text>      
                                </View> 

                        </ScrollView>
                </View>

          </SafeAreaView>
        </View>
  )
}

export default Home


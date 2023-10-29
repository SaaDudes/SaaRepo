import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native'
import React, {useState, useEffect, useContext, useCallback} from 'react'
import { Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import themeContext from '../theme/themeContext';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { fetchWeatherForecast, fetchLocations } from '../api/weather';
import { weatherImages } from '../constants';
import { debounce } from "lodash";
import { getData, storeData } from '../utils/asyncStorage';


export default function HomeScreen() {

const [showSearch, toggleSearch] = useState([]);
const [weather, setWeather] = useState({})
const [locations, setLocations] = useState([]);

const nav = useNavigation();
const theme = useContext(themeContext);

const handleSearch = search=>{
        console.log('value: ',search);
        if(search && search.length>0)
          fetchLocations({cityName: search}).then(data=>{
            console.log('got locations: ',data);
            setLocations(data);
          })
      }
    
const handleLocation = (loc)=>{
        
        setLocations([]);
        fetchWeatherForecast({
          cityName: loc.name,
          days: '7'
        }).then(data=>{
   
          setWeather(data);
          storeData('city',loc.name);
        })
      }
    
      useEffect(()=>{
        fetchMyWeatherData();
      },[]);

    {/*What city will be always first on the screen */}
      const fetchMyWeatherData = async ()=>{
        let myCity = await getData('country');
        let cityName = 'Oulu';
        if(myCity){
          cityName = myCity;
        }
        fetchWeatherForecast({
          cityName,
          days: '7'
        }).then(data=>{
          setWeather(data);
        })
        
      }
    
      const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
    
      const {location, current} = weather;


return( 
<KeyboardAvoidingView className="flex-1 relative">
    <StatusBar style="light" />
    <Image source={theme.background} className="absolute h-full w-full" blurRadius={70}/>
     
   
    <SafeAreaView className="flex flex-1">
        

        <View style={{top: 30}} className="mx-4 relative z-50">
                <View className="flex-row justify-end items-center rounded-full" style={{backgroundColor: theme.color2}}>
                <TouchableOpacity style={{ left: 10}}onPress={() => nav.openDrawer()}>
                <Icon name="format-list-bulleted" color={theme.color} size={35}/>
                </TouchableOpacity>
                
                <TextInput
                onChangeText={handleTextDebounce}
                placeholder='Search City' placeholderTextColor={theme.color} className="pl-6 h-14 flex-1 text-base text-white"/>
                <TouchableOpacity 
                onPress={()=> toggleSearch(!showSearch)}
                style={{backgroundColor: theme.color4}} className="rounded-full p-3 m-1">
                <Icon name="magnify" color={theme.color} size={35} left={2}/>
                </TouchableOpacity>
        </View>
        {
        showSearch? (
        locations.length>0 && (
        <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
        {
                                locations.map((loc, index)=>{
                                let showBorder = index+1 != locations.length;
                                let borderClass = showBorder? ' border-b-2 border-b-gray-400':'';
                                return (
                                  <TouchableOpacity
                                    onPress={()=> handleLocation(loc)} 
                                    key={index}
                                    className={"flex-row items-center border-0 p-3 px-4 mb-1 "+borderClass}>
                                      <MapPinIcon size="20" color="gray" />
                                      <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                                  </TouchableOpacity>
                                )
        })
        }
        </View>
        )
        ):null
}


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
            <Text className="text-center font-bold text-5xl ml-5" style={[{color:theme.color}]}>
                    {current?.temp_c}&#176;

            </Text>
            <Text className="text-center text-xl ml-3 tracking-widest font-bold" style={[{color:theme.color}]}>
                    {current?.condition?.text}
            </Text>
    </View>

    {/*Muut Arvot*/}
    <View className="flex-row justify-between mx-4 py-7">
            <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/icons/wind.png')} className="h-6 w-6" />

                    <Text className="font-semibold text-base" style={[{color:theme.color}]}>
                            {Math.trunc(current?.wind_kph * 1000 / 3600)}m/s
                           
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
                  {
                    weather?.forecast?.forecastday?.map((item,index)=>{
                      const date = new Date(item.date);
                      const options = { weekday: 'long' };
                      let dayName = date.toLocaleDateString('en-US', options);
                      dayName = dayName.split(',')[0];

                      return (
                        <View 
                          key={index} 
                          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" 
                          style={{backgroundColor: theme.color3}}
                        >
                          <Image 
                            source={weatherImages[item?.day?.condition?.text || 'other']}
                              className="w-11 h-11" />
                          <Text className="text-white">{dayName}</Text>
                          <Text className="text-white text-xl font-semibold">
                            {item?.day?.avgtemp_c}&#176;
                          </Text>
                        </View>
                      )
                    })
                }
                </ScrollView>
      </View>
    </SafeAreaView>
</KeyboardAvoidingView>
  )
}

import axios from 'axios';
import { apiKey } from '../constants';


const forecastEndpoint = params=> `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Oulu&days=1&aqi=no&alerts=no` //replace "Oulu" and "days" with function name implemented in home.js implemented later on...
const locationsEndpoint = params=> `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=Oulu`

const apiCall = async (endpoint)=>{
    const options = {
        method: 'GET',
        url: endpoint
    }
    try{
        const response = await axios.request(options);
        return response.data;

    }catch(err){
        console.log('error:',err);
        return null;

    }
}

export const fetchWeatherForecast = params=>{ //Hae säätiedot
    return apiCall(forecastEndpoint(params));
}
export const fetchLocations = params=>{ //Hae maan/kaupungin nimi
    return apiCall(locationsEndpoint(params));
}
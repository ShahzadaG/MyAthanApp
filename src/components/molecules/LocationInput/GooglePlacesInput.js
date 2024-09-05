import React, { useState, useEffect, useRef, useContext } from 'react';
import PrayerTimesContext from '@/context/PrayerTimesContext';

import { utcOffsetToDouble } from '@/services/helper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PosixTimezones from '@/services/posixTimezones/posixTimezones.json'

navigator.geolocation = require('@react-native-community/geolocation');

const API_KEY='AIzaSyA8Th2_7U1HMB-LO09bMDOqPuXm039VlOY';
const BING_MAPS_API_KEY = 'AubaXWbXIIEppYA0xhrgPRg_-rNqm2FzKGlc4z8Y7EWqIbR1jKWCgRgVuOOBWaT3';

const GooglePlacesInput = () => {
  const { city, setCity, location, setLocation, setTimezone, setPosixTimezone, setPosixTimezoneTrigger } = useContext(PrayerTimesContext);

  const ref = useRef();

  const fetchPlaceDetails = async (placeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${API_KEY}`);
        const json = await response.json();
  
        if (json.result && json.result.geometry && json.result.geometry.location) {
          const { lat, lng } = json.result.geometry.location;
          resolve({ latitude: lat, longitude: lng });
        } else {
          reject("Location details not found");
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };


  const fetchPlaceTimezone = async (location) => {
    try {
        const now = new Date();
        const datetime_utc = encodeURIComponent(now.toISOString());
        const response = await fetch(`https://dev.virtualearth.net/REST/v1/TimeZone/${location.latitude},${location.longitude}?datetime=${datetime_utc}&key=${BING_MAPS_API_KEY}`);
        const json = await response.json();
        
        const parsedJson = json.resourceSets[0].resources[0];

        let utcOffset = utcOffsetToDouble(parsedJson.timeZone.utcOffset);
        let utcOffsetDST = utcOffsetToDouble(parsedJson.timeZone.convertedTime.utcOffsetWithDst);
        let timezoneID = parsedJson.timeZone.ianaTimeZoneId;

        setTimezone(utcOffsetDST);
        setPosixTimezone(PosixTimezones[timezoneID]);
        setPosixTimezoneTrigger(prev => prev + 1);

    } catch (error) {
        console.error(error);
        throw error; // This will cause the promise returned by the async function to be rejected.
    }
  };

  const onCitySelect = async (data) => {
    console.log("on city select");
    let cityName = "";

    if(data.description) {
      cityName = data.description;
    }
    else if (data.formatted_address)
    {
      cityName = data.formatted_address;
    }
    
    setCity(cityName);

    const isGeocodingApi = data.geometry;
    const isPlacesApi = data.structured_formatting;

    let newLocation;

    if (isGeocodingApi) 
    {
      newLocation = 
      { 
        latitude: data.geometry.location.lat, 
        longitude: data.geometry.location.lng 
      };
    } 
    else if (isPlacesApi) 
    {
      const placeId = data.place_id;
      newLocation = await fetchPlaceDetails(placeId);
    }

    await fetchPlaceTimezone(newLocation);

    setLocation(newLocation);
  }

  useEffect(() => {
    if (ref.current && city) {
        ref.current.setAddressText(city);
    }
  }, [city]); // Runs when `city` changes
  
  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="City"
      onPress={(data) => onCitySelect(data)}

      enablePoweredByContainer={false}
      disableScroll={true}
      currentLocation={true}
      nearbyPlacesAPI={'GoogleReverseGeocoding'}
      filterReverseGeocodingByTypes={['locality']}
      query={{
        key:'AIzaSyA8Th2_7U1HMB-LO09bMDOqPuXm039VlOY',
        language: 'en',
        types: '(cities)'
      }}
      styles={{
        container: {
          flex: 1,
        },
        predefinedPlacesDescription: {
          fontSize: 17,
          color: '#007AFF', 
        },
        textInputContainer: {
          flexDirection: 'row',
        },
        textInput: {
          backgroundColor: '#FFFFFF',
          height: 24,
          borderRadius: 5,
          flex: 1,
          paddingVertical: 0,
          paddingHorizontal: 0,
          marginBottom: 0,
          marginLeft: 40,
          color: '#333',
          fontFamily: 'Poppins',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: '500',
        },
        poweredContainer: {
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderColor: '#FFFFFF',
          borderTopWidth: 0.5,
        },
        powered: {},
        listView: {
          paddingTop: 18,
          paddingLeft: 30,
        },
        row: {
          backgroundColor: '#FFFFFF',
          height: 35,
          flexDirection: 'row',
          paddingBottom: 0
        },
        separator: {
          height: 0.5,
          backgroundColor: '#FFFFFF',
        },
        description: {
          fontSize: 17,
          color: '#007AFF', 
        },
        loader: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: 20,
        },
      }}
    />
  );
};

export default GooglePlacesInput;
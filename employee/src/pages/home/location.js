import React, { Component } from 'react'
import { Text, PermissionsAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import GlobalStyle from '../../styles';
import Geolocation from 'react-native-geolocation-service';

export default class Location extends Component {

    getLocation = async () => {
        const hasPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      
        // if (!hasPermission){
        //     console.log('no per');
        //     return;
            
        // }
        console.log(hasPermission,'a');
        
        if (hasPermission === PermissionsAndroid.RESULTS.GRANTED) {
            alert("You can use the location")
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          } else {
            alert("Location permission denied")
          }


    }

    render() {
        return (
            <TouchableOpacity  style={[GlobalStyle.mb10,GlobalStyle.btn]} onPress={this.getLocation}>
                <Text style={GlobalStyle.txtCenter}>Current location</Text>
            </TouchableOpacity>
        )
    }
}

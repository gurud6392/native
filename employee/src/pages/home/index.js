import * as React from 'react';
import { Button, View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Divider } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import GlobalStyle from '../../styles';
import Geolocation from 'react-native-geolocation-service';
import Location from './location';
import DropdownAlert from 'react-native-dropdownalert';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
    const [imgSize, setImgSize] = React.useState(20971520)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [location, setLocation] = React.useState(null)
    const [picture, setPicture] = React.useState(null)
    const [submitted, setSubmitted] = React.useState(false)

    const dropDownAlertRef = React.useRef(DropdownAlert);

    
    const onLibPress = () => {
        ImagePicker.openPicker({
            multiple: false,
            mediaType: 'photo',
            compressImageQuality: 0.8
        }).then(images => {
            // console.log(images);
            let size = 0;
            let allImages = [];
            // images.map(image=>{
                size += images.size;
                allImages.push({uri:images.path, type: images.mime});
            // })
            // console.log(size,imgSize, '-=-=->');
            if(size > imgSize){
                //Size error
                // this.setState({
                //     imageError: true
                // })
            }else{
                setPicture(allImages)
                // this.setState({
                //     imageError: false,
                //     [questionId]: allImages
                // })
            }
        });
    }

    const getLocation = async () => {
        const hasPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      
        if (hasPermission === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {
                    // console.log(position, position.coords.latitude );
                    setLocation({lat:position.coords.latitude,lng:position.coords.longitude})
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }        
    }

    const submitForm = () => {
        // console.log(picture, name, email, phone, address, location);
        var letters = /^[A-Za-z ]+$/;

        // console.log(picture, 'ic');
        

        if(name == '' || email == '' || phone == '' || address == '' || picture == null || location == null){
            dropDownAlertRef.current.alertWithType('error', 'Error', 'All the fields are mandatory.');
            return false;
        }
        if(!name.match(letters)){
            dropDownAlertRef.current.alertWithType('error', 'Error', 'Name should contain text only');            
            return false;
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            dropDownAlertRef.current.alertWithType('error', 'Error', 'Invalid email');
            return false;
        }
        if(!/^[2-9]{1}[0-9]{9}$/.test(phone)){
            dropDownAlertRef.current.alertWithType('error', 'Error', 'Invalid phone number');
            return false;
        }
        setSubmitted(true)
        Axios({
            url: 'https://5ea0322d11b078001679d762.mockapi.io/emp/users',
            method: 'POST',
            data: {
                name: name,
                email: email,
                phone: phone,
                address: address,
                location: location,
                image: picture
            }
        })
        .then((response)=>{
            // console.log(response, '1');
            dropDownAlertRef.current.alertWithType('success', 'Success', 'Data saved successfully');
            setName('');setEmail('');setPhone('');setAddress('');setLocation(null);setPicture(null);setSubmitted(false)
        })
        .catch((err)=>{
            console.log(err);
            setSubmitted(false)
            dropDownAlertRef.current.alertWithType('error', 'Error', 'Sorry something went wrong');
        })

    }

    return (
        <SafeAreaView >
            <ScrollView style={style.scrollView}>  
                <View style={{flex: 1, alignItems: 'center', marginBottom: 100}}>                    
                    <Input placeholder="Name" onChangeText={(name)=>{setName(name)}} value={name} autoCompleteType="username"/>
                    <Input placeholder="Email" onChangeText={(email)=>{setEmail(email)}} value={email} autoCompleteType="email"/>
                    <Input placeholder="Phone" onChangeText={(phone)=>{setPhone(phone)}} value={phone} autoCompleteType="tel"/>
                    <Input placeholder="Address" onChangeText={(address)=>{setAddress(address)}} value={address} autoCompleteType="street-address"/>
                    
                    {/* <Location/> */}
                    <TouchableOpacity  style={[GlobalStyle.mb10,GlobalStyle.btn]} onPress={getLocation}>
                        <Text style={GlobalStyle.txtCenter}>Current location</Text>
                    </TouchableOpacity>
                        {location ?<Text>{'LAT :'+location.lat+' || LNG :'+location.lng}</Text>:null}
                    <TouchableOpacity onPress={onLibPress} style={[GlobalStyle.mb10,GlobalStyle.btn]}>
                        <Text style={GlobalStyle.txtCenter}>Picture</Text>
                    </TouchableOpacity>
                    {submitted ?
                    <TouchableOpacity style={[GlobalStyle.mb10,GlobalStyle.btn, {backgroundColor:'#005cc5'}]}>
                        <Text style={[GlobalStyle.clrWht, GlobalStyle.txtCenter]}>Sending</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={submitForm} style={[GlobalStyle.mb10,GlobalStyle.btn, {backgroundColor:'#005cc5'}]}>
                        <Text style={[GlobalStyle.clrWht, GlobalStyle.txtCenter]}>Submit</Text>
                    </TouchableOpacity>
                    }
                    <Divider style={{backgroundColor: '#ccc', height: 1, width: '100%'}}/>
                    <TouchableOpacity style={GlobalStyle.btn} onPress={() => navigation.navigate('EmpList')}>
                        <Text style={GlobalStyle.txtCenter}>Listing</Text>
                    </TouchableOpacity>
                    <Divider style={{backgroundColor: '#ccc', height: 1, width: '100%', marginTop: 10}}/>
                    <View style={{width: '100%'}}>
                        <Text style={[GlobalStyle.fw6, GlobalStyle.txtLeft, GlobalStyle.mb10]}>Note :</Text>
                        <Text style={[GlobalStyle.clrlight, GlobalStyle.mb10]}>Address is not integrated with any address API as it requires billing.</Text>
                        <Text style={[GlobalStyle.clrlight, GlobalStyle.mb10]}>Because image can't be stored in mockapi only image path and type is storing.</Text>
                    </View>
            
                </View>          
            </ScrollView>
            <DropdownAlert ref={dropDownAlertRef} closeInterval={2500} updateStatusBar={false} />
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    scrollView:{
        padding: 10,
        backgroundColor: '#fff'
    }
})
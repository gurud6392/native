import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function EmployeeDetails(props) {
    console.log(props.route.params.item, 'pppp');
    const [item, setItem] = React.useState(props.route.params.item)
    return (
        <SafeAreaView style={{ flex: 1 }}>
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>            
            <Card title={item.name} containerStyle={{width: '90%'}} >
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={{ uri: 'https://img.icons8.com/plasticine/2x/user.png' }}
                    style={{ width: 200, height: 200 }}
                />
                </View>                
                    <Text style={{marginBottom: 10}}>
                        <Icon name="envelope" size={12} />  {item.email}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        <Icon name="map-marker" size={14}/>{'  '} {item.address}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        <Icon name="phone" size={14}/>{' '} {item.phone}
                    </Text>
                    <Text style={{marginBottom: 0}}>
                        <Icon name="location-arrow" size={14}/>  Latitude : {item.location.lat}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        {'     '}Longitude : {item.location.lng}
                    </Text>
                    <Text>
                        <Icon name="image" size={14}/> <Text style={{fontSize: 12}}> {item.image[0].uri}</Text>
                    </Text>
                    <Text>Image Type : {item.image[0].type}</Text>

                </Card>
        </View>
        </SafeAreaView>
    );
}
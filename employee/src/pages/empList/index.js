import React from 'react';
import { ListItem } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import Axios from 'axios';

export default class EmployeeList extends React.Component {
    state = {
        dataList: []
    }

    componentDidMount(){
        Axios({
            method: 'GET',
            url: 'https://5ea0322d11b078001679d762.mockapi.io/emp/users?sortBy=createdAt&order=asc',
        })
        .then((response)=>{
            console.log(response.data);
            this.setState({
                dataList: response.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    navigateToRoute = () => {
        console.log('asd');
        
        // this.props.navigation.navigate('Details')
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.email}
            leftAvatar={{ source: { uri: 'https://img.icons8.com/plasticine/2x/user.png' } }}
            bottomDivider
            chevron
            onPress={() => this.props.navigation.navigate('Details',{item: item})
            }
        />
    )

    render () {
        const {dataList} = this.state;

        return (
            dataList.length > 0 ?
            <FlatList
                keyExtractor={this.keyExtractor}
                data={dataList}
                renderItem={this.renderItem}
            />
            :null
        )
    }
}
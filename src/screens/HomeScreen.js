import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import Firebase from '../../constants/FirebaseKeys';

import MealItem from '../components/MealItem';

const HomeScreen = ({ navigation }) => {
    const [username, onUsernameChange] = useState(Firebase.auth().currentUser.displayName);

    return(
        <View style={{backgroundColor: '#FFF', height:'100%'}}>
            <View style={styles.topContainer}>
              <Text style={styles.welcomeStyle}>Hi, {username}</Text>
              <Text style={styles.whatStyle}>What would you like to do today?</Text>
            </View>
            <View style={styles.spaceAround}>
                <TouchableOpacity
                    style= {styles.itemStyle}
                    onPress={()=> navigation.navigate('Pantry')}
                >
                    <List.Item
                        titleStyle={{
                            color: '#fff'
                        }}
                        title="Your Food Pantry"
                        left={() => <List.Icon icon="food-apple" color='#fff' />}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style= {styles.itemStyle}
                    onPress={()=> navigation.navigate('Food')}
                >
                    <List.Item
                        titleStyle={{
                            color: '#fff'
                        }}
                        title="Search for food items"
                        left={() => <List.Icon icon="binoculars" color='#fff'/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style= {styles.itemStyle}
                    onPress={()=> navigation.navigate('Pantry')}
                >
                    <List.Item
                        titleStyle={{
                            color: '#fff'
                        }}
                        title="Your Favorite Recipes"
                        left={() => <List.Icon icon="star" color='#fff' />}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style= {styles.itemStyle}
                    onPress={()=> navigation.navigate('Recipes')}
                >
                    <List.Item
                        titleStyle={{
                            color: '#fff'
                        }}
                        title="Search for Recipes"
                        left={() => <List.Icon icon="binoculars" color='#fff'/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style= {styles.itemStyle}
                    onPress={()=> navigation.navigate('Settings')}
                >
                    <List.Item
                        titleStyle={{
                            color: '#fff'
                        }}
                        title="Settings"
                        left={() => <List.Icon icon="settings" color='#fff' />}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    welcomeStyle: {
        color: '#fff',
        marginTop: 25,
        padding: 15,
        fontSize: 35,
        fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto'
    },
    whatStyle: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 15,
        fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto'
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: 'black'
    },
    spaceAround: {
        justifyContent: "space-around",
        paddingTop: 30,
        paddingLeft: 10
    },
    itemStyle: {
        backgroundColor: '#036D19',
        alignSelf: 'center',
        width: '95%',
        marginTop: '2%',
        borderRadius: 15
    },
    topContainer: {
        backgroundColor: '#09A129',
        alignSelf: 'center',
        width: '95%',
        padding: '5%',
        borderRadius: 25
    }
})

export default HomeScreen;

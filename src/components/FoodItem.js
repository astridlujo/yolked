import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native';

const FoodItem = (props) => {
    return (
        <View>
            <TouchableOpacity
              onPress={() =>{
                console.log('Travel to food!!');
                props.navigation.navigate('FoodDetails', { foodObject: props.foodObject })
              }}>
                <View style={styles.mealItem}>
                    <ImageBackground
                        source={{uri: props.foodObject.food.image}}
                        style={styles.backgroundImage}
                    >
                        <View style={[styles.mealContainer, props.inPantry ? styles.inPantry : null]}>
                            <Text style={styles.titleStyle} numberOfLines={2} >
                            {props.foodObject.food.label}
                            {[props.inPantry ? ` ${props.quantity} In Pantry` : null]}
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.mealContainer}>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
    )
};

styles = StyleSheet.create({
    mealItem: {
        backgroundColor: '#CCC',
        flex: 1,
        margin: 15,
        height: 155,
        width: 155,
        borderRadius: 10,
        overflow: "hidden",
    },
    inPantry: {
        borderColor: '#32cd32',
    },
    mealContainer: {
        flex: 1,
        borderWidth: 5,
        borderColor: '#ccc',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    titleStyle: {
        fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
        fontSize: 15,
        textAlign: "center",
        color: 'white'
    },
    backgroundImage: {
        width: '100%',
        height:'100%',
    }

});

export default FoodItem;

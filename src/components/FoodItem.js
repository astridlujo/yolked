import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native';

const FoodItem = (props) => {
    const foodImage = props.foodObject.food.image;

    return (
        <View>
            <TouchableOpacity
              onPress={() =>{
                props.navigation.navigate('FoodDetails', { foodObject: props.foodObject,
                  inPantry: props.inPantry, quantity: props.quantity, unit: props.unit })
              }}>
                <View style={styles.mealItem}>
                    <ImageBackground
                        source={foodImage !== undefined ? {uri: foodImage} : require('../../assets/images/yolked_logo_grey.png')}
                        style={styles.backgroundImage}
                    >
                        <View style={[styles.mealContainer, props.inPantry ? styles.pantryBorder : null]}>
                            <Text style={styles.titleStyle} numberOfLines={2}>
                            {props.foodObject.food.label}
                            </Text>
                            <Text style={styles.titleStyle} numberOfLines={2}>
                            {[props.inPantry ? ` ${props.quantity} ${props.unit}s in Pantry` : null]}
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
    pantryBorder: {
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
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        padding: 2,
        borderRadius: 5,
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

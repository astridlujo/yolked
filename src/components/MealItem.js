import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native';

const MealItem = props => {
    return (
        <View>
            <TouchableOpacity onPress={props.onSelectMeal}>

                <View style={styles.mealItem}>
                    <ImageBackground 
                        source={{uri: props.image}}
                        style={styles.backgroundImage}
                    
                    >
                        <View style={styles.mealContainer}>
                            <Text style={styles.titleStyle} numberOfLines={2} >{props.title}</Text>
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
        overflow: "hidden"
    },
    mealContainer: {
        flex: 1,
        borderRadius: 10,
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
        height:'100%'
    }

});

export default MealItem;
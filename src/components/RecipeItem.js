import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import Star from '../components/star';

const RecipeItem = (props) => {
    const recipeImage = props.recipeObject.recipe.image
    return (
        <View>
            <TouchableOpacity
              onPress={() =>{
                console.log('Travel to recipe!!');
                props.navigation.navigate('RecipeDetails', { recipeObject: props.recipeObject,
                  inFavorites: props.inFavorites})
              }}>
                <View style={styles.mealItem}>
                    <ImageBackground
                        source={recipeImage !== undefined ? {uri: recipeImage} : require('../../assets/images/yolked_logo_grey.png')}
                        style={styles.backgroundImage}
                    >
                        <View style={[styles.mealContainer, props.inFavorites ? styles.inFavorites : null]}>
                            <Text style={styles.titleStyle} numberOfLines={2} >
                            {props.recipeObject.recipe.label}
                            </Text>
                            <View>
                            {[props.inFavorites ? <Star/> : null]}
                            </View>
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
    inFavorites: {
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
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        padding: 2,
        borderRadius: 5,
        textAlign: "center",
        color: 'white'
    },
    backgroundImage: {
        width: '100%',
        height:'100%',
    }
});

export default RecipeItem;

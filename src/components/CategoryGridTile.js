import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, TouchableNativeFeedback, ImageBackground } from 'react-native';

const CategoryGridTile = props => {

    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }

    return (
        <View style={styles.gridItem}>
            <TouchableComponent
                    style={{flex: 1}}
                    onPress={props.onSelect}
                >
                    {/* <ImageBackground 
                    source={require('../images/american_food.png')}
                    style={styles.backgroundImage}
                    > */}
                    
                        {/* <ImageBackground
                        source={{uri: props.color}}
                        style={styles.backgroundImage}
                    > */}
                    
                        <View style={{ ...styles.container, ...{backgroundColor: props.color}}}>
                            <Text style={styles.titleStyle} numberOfLines={2} >{props.title}</Text>
                        </View>
                    {/* </ImageBackground> */}
                    {/* </ImageBackground> */}
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: '5%',
        height: 150,
        borderRadius: 10,
        overflow: "hidden"
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    titleStyle: {
        fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
        fontSize: 20,
        textAlign: "center"
    },
    // backgroundImage: {
    //     width: '100%',
    //     height:'100%'
    // }
});

export default CategoryGridTile;
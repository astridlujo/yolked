import React from 'react';
import { View, Text, StyleSheet , ScrollView } from 'react-native';

// Import header
import Header from '../components/Header';
// Import Card
import Card from '../components/Card';

const RecipeCategory = props => {
    return (
        <View>
            <View>
                <Header title="Recipes" />
            </View>
            
            <Card />
            
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        
    }
});

export default RecipeCategory;
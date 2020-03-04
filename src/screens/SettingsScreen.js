import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import Switch from '../components/Switch';

const SettingsScreen = props => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.welcomeStyle}>Welcome Astrid</Text>

                <View>
                    <List.Section>
                        <List.Subheader>Settings</List.Subheader>

                        <TouchableOpacity>
                            <List.Item 
                                title="Change Password"
                                left={() => <List.Icon icon="textbox-password" />}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <List.Item 
                                title="Change email"
                                left={() => <List.Icon icon="email" />}
                            />
                        </TouchableOpacity>

                    </List.Section>

                    <List.Section>
                        <List.Subheader>Search Filters</List.Subheader>
                            <List.Item 
                                title="Gluten Free"
                                left={() => <List.Icon icon="food-croissant" />}
                                right={() => <Switch />}
                            />

                            <List.Item 
                                title="Non-Alcoholic Recipes"
                                left={() => <List.Icon icon="glass-wine" />}
                                right={() => <Switch />}
                            />

                            <List.Item 
                                title="Vegetarian"
                                left={() => <List.Icon icon="food-apple" />}
                                right={() => <Switch />}
                            />

                            <List.Item 
                                title="Pescatarian"
                                left={() => <List.Icon icon="fish" />}
                                right={() => <Switch />}
                            />

                            <List.Item 
                                title="Vegan"
                                left={() => <List.Icon icon="food-off" />}
                                right={() => <Switch />}
                            />

                    </List.Section>

                </View>
            </ScrollView>
            
            
            {/* Search Table */}
            {/* <DataTable style={styles.tableStyle}>
                <DataTable.Header>
                    <DataTable.Title>Setting</DataTable.Title>
                    <DataTable.Title>Option</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>Gluten Free</DataTable.Cell>
                    <DataTable.Cell><Switch /></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Vegetarian</DataTable.Cell>
                    <DataTable.Cell><Switch /></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Vegan</DataTable.Cell>
                    <DataTable.Cell><Switch /></DataTable.Cell>
                </DataTable.Row>
            </DataTable>                 */}

        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

    welcomeStyle: {
        marginTop: 25,
        padding: 15,
        fontSize: 35,
        fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto'
    }
});

export default SettingsScreen;
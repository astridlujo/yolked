import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { List, Portal, Dialog, Button, TextInput, Provider } from 'react-native-paper';
import Switch from '../components/Switch';
import Firebase from '../../constants/FirebaseKeys';

const SettingsScreen = props => {
    const [username, onUsernameChange] = useState(Firebase.auth().currentUser.displayName);
    const [email, onEmailChange] = useState('');
    const [visible1, onVisible1Change] = useState(false);
    const [visible2, onVisible2Change] = useState(false);

    function ChangePassword() {
      const auth = Firebase.auth();
      const emailAddress = auth.currentUser.email;
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
    }

    function Logout() {
      Firebase.auth().signOut().then(function() {
        props.navigation.navigate('Login');
      }).catch(function(error) {
        // An error happened.
      });
    }

    function UpdateEmail(newEmail) {
      const user = Firebase.auth().CurrentUser;
      if (user != null) {
        user.UpdateEmailAsync(newEmail).ContinueWith(task => {
          if (task.IsCanceled) {
            Debug.LogError("UpdateEmailAsync was canceled.");
            return;
          }
          if (task.IsFaulted) {
            Debug.LogError("UpdateEmailAsync encountered an error: " + task.Exception);
            return;
          }

          Debug.Log("User email updated successfully.");
        });
      }
    }

    return (
      <Provider>
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.welcomeStyle}>Welcome, {username ? username : ''}</Text>

                <View style={{width:Dimensions.get('window').width}}>
                    <List.Section>
                        <List.Subheader>Settings</List.Subheader>

                        <TouchableOpacity
                          onPress={() => {
                            onVisible2Change(true);
                          }}
                        >
                            <List.Item
                                title="Change Password"
                                left={() => <List.Icon icon="textbox-password" />}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            onVisible1Change(true);
                          }}
                        >
                            <List.Item
                                title="Change email"
                                left={() => <List.Icon icon="email" />}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            Logout()
                          }}
                        >
                            <List.Item
                                title="Logout"
                                left={() => <List.Icon icon="email" />}
                            />
                        </TouchableOpacity>

                    </List.Section>

                    <List.Section>
                        <List.Subheader>Food Search Filters</List.Subheader>
                            <List.Item
                                title="Non-Alcoholic Recipes"
                                left={() => <List.Icon icon="glass-wine" />}
                                right={() => <Switch item={"alcohol-free"}/>}
                            />

                            <List.Item
                                title="Vegetarian"
                                left={() => <List.Icon icon="food-apple" />}
                                right={() => <Switch item={"vegetarian"}/>}
                            />

                            <List.Item
                                title="Vegan"
                                left={() => <List.Icon icon="food-off" />}
                                right={() => <Switch item={"vegan"}/>}
                            />

                            <List.Item
                                title="High Protein"
                                left={() => <List.Icon icon="dumbbell" />}
                                right={() => <Switch item={"high-protein"}/>}
                            />

                            <List.Item
                                title="Peanut Free"
                                left={() => <List.Icon icon="nut" />}
                                right={() => <Switch item={"peanut-free"}/>}
                            />

                            <List.Item
                                title="Low Carb"
                                left={() => <List.Icon icon="bread-slice" />}
                                right={() => <Switch item={"low-carb"}/>}
                            />

                    </List.Section>

                </View>
            </ScrollView>

            <Portal>
              <Dialog
                visible={visible1}
                onDismiss={ () =>{ onVisible1Change(false)}}
              >
                <Dialog.Content>
                  <TextInput
                    label='New Email'
                    value={email}
                    onChangeText={text => onChangeEmail(text)}
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress= { () =>{

                  }}>Done</Button>
                </Dialog.Actions>
            </Dialog>
            <Dialog
              visible={visible2}
              onDismiss={ () =>{ onVisible2Change(false)}}
            >
              <Dialog.Content>
                <Text> Are you sure?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress= { () =>{
                  ChangePassword();
                }}>Yes</Button>
                <Button onPress= { () =>{
                  onVisible2Change(false);
                }}>No</Button>
              </Dialog.Actions>
          </Dialog>
          </Portal>
        </View>
      </Provider>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#D8A120',
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: Dimensions.get('window').width
    },

    welcomeStyle: {
        marginTop: 25,
        padding: 15,
        fontSize: 35,
        fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto'
    }
});

export default SettingsScreen;

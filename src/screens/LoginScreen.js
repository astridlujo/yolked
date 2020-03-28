import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Button from '../components/Button';
import Firebase from '../../constants/FirebaseKeys';

// Images
import LogoSymbol from '../../assets/images/yolked_logo.svg';
import LogoText from '../../assets/images/yolked_text.svg';

const LoginScreen = ({ navigation }) => {
  const [valueEmail, onChangeEmail] = useState('');
  const [valuePassword, onChangePassword] = useState('');
  const [valueStart, onStart] = useState(true);

  // TODO: Look into using a splash screen.
  useEffect(() => {
    onStart(false);
    if(valueStart) {
      console.log(valueStart);
      Firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          onChangeEmail('');
          onChangePassword('');
          console.log('User signed in');
          navigation.navigate('Home'); // TODO: Navigate to homescreen
        } else {
          console.log('User not signed in');
          return;
        }
      });
    }
  }, [valueStart]);

  const Validate = async (email, password) => {
    console.log("Function active");
    let auth = true;
    email = email.trim();
    await Firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(`Error Code: ${errorCode}\n${errorMessage}`);
      onChangePassword('');
      auth = false;
      return;
    });
    if (auth) {
      console.log('User signed in');
      navigation.
      navigation.navigate('Home'); // TODO: Navigate to homescreen
      return;
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#14CC60', paddingTop: '10%' }}>
      <View style={styles.viewStyle}>
        <LogoSymbol width={'100%'} height={'70%'}/>
        <LogoText width={'100%'} height={'50%'}/>
      </View>
      <View style={styles.viewStyle}>
        <TextInput
          placeholder='Email/Username'
          style={styles.inputStyle}
          onChangeText={text => onChangeEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
          value={valueEmail}
        />
        <TextInput
          placeholder='Password'
          style={styles.inputStyle}
          onChangeText={text => onChangePassword(text)}
          value={valuePassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      <View style={styles.viewStyle}>
        <Button
          text='Login'
          onPress={() => {
            Validate(valueEmail, valuePassword);
          }}
        />
        <Button
          text='Signup'
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flexWrap: 'nowrap',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  // Maybe delete and keep viewStyle only
  inputStyle: {
    //fontFamily: 'Roboto',
    paddingLeft: 20,
    borderColor: '#16DB93',
    borderRadius: 20,
    borderWidth: 3,
    marginVertical: 20,
    height: 40,
    width: '70%',
    fontSize: 15,
    backgroundColor: '#fff'
  },
  buttonStyle: {
    margin: 10,
    width: '30%',
    height: 40,
    borderRadius: 20,
    borderColor: '#888888',
    borderWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  textStyle: {
    //fontFamily: 'notoserif',
    color: '#505050',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default LoginScreen;

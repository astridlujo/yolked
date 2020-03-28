import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Button from '../components/Button';
import Firebase, { database } from '../../constants/FirebaseKeys';

// Images
import LogoSymbol from '../../assets/images/yolked_logo.svg';
import LogoText from '../../assets/images/yolked_text.svg';

const SignupScreen = ({ navigation }) => {
  const [valueUser, onChangeUser] = React.useState('');
  const [valueEmail, onChangeEmail] = React.useState('');
  const [valuePassword, onChangePassword] = React.useState('');
  const [valuePasswordCheck, onChangePasswordCheck] = React.useState('');

  const Validate = async (username, email, password, passwordCheck) => {

    email = email.trim();
    // HELPER FUNCTIONS validation
    if (password != passwordCheck) {
      alert('Your passwords do not match');
      return;
    }
    if (username === null) {
      alert('Please enter a username')
    }
    if (email === null) {
      alert('Must enter an email');
    }

    await Firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result) {
      database.collection('users').doc(result.user.uid).set({
         favFoods: [],
         favRecipes: [],
         settings: []
      });
      return result.user.updateProfile({
        displayName: username
      });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Error Code: ${errorCode}\n${errorMessage}`);
        auth = false;
        return;
    });
    if (auth) {
      alert('Welcome to Yolked!');
      navigation.navigate('Login');
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
          placeholder='Username'
          style={styles.inputStyle}
          onChangeText={text => onChangeUser(text)}
          autoCapitalize="none"
          autoCorrect={false}
          value={valueUser}
        />
        <TextInput
          placeholder='Email'
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
        <TextInput
          placeholder='Re-enter Password'
          style={styles.inputStyle}
          onChangeText={text => onChangePasswordCheck(text)}
          value={valuePasswordCheck}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      <View style={styles.viewStyle}>
        <View style={{marginTop: '10%'}}>
          <Button
            text='Confirm'
            onPress={() => {
              Validate(valueUser,valueEmail,valuePassword,valuePasswordCheck);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flexWrap: 'nowrap',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10
  },
  // Maybe delete and keep viewStyle only
  inputStyle: {
    //fontFamily: 'Roboto',
    paddingLeft: 20,
    borderColor: '#16DB93',
    borderRadius: 20,
    borderWidth: 3,
    marginVertical: 10,
    height: 40,
    width: '70%',
    fontSize: 15,
    backgroundColor: '#fff'
  },
  textStyle: {
    //fontFamily: 'notoserif',
    color: '#505050',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default SignupScreen;

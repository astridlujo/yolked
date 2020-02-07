import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Button from '../modules/Button';
import Logo from '../../assets/images/yolked_logo.svg';

const Login = () => {
  const [valueEmail, onChangeEmail] = useState('');
  const [valuePassword, onChangePassword] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: '#D8A120'}}>
      <View style={styles.viewStyle}>
        <Logo width={'100%'} height={'100%'}/>
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
            alert(valueEmail);
          }}
        />
        <Button
          text='Signup'
          onPress={() => {
            alert(valuePassword);
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
    alignItems: 'center',
    backgroundColor: '#D8A120'
  },
  // Maybe delete and keep viewStyle only
  inputStyle: {
    fontFamily: 'Roboto',
    paddingLeft: 20,
    borderColor: '#e09900',
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
    fontFamily: 'notoserif',
    color: '#505050',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default Login;

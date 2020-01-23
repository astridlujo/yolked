import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginTextInput() {
  const [valueEmail, onChangeEmail] = React.useState('');
  const [valuePassword, onChangePassword] = React.useState('');

  return (
    <View style={{flex: 1}}>
      <View style={styles.viewStyle}>
      </View>
      <View style={styles.viewStyle}>
        <TextInput
          placeholder='Email/Username'
          style={styles.inputStyle}
          onChangeText={text => onChangeEmail(text)}
          value={valueEmail}
        />
        <TextInput
          placeholder='Password'
          style={styles.inputStyle}
          onChangeText={text => onChangePassword(text)}
          value={valuePassword}
        />
      </View>
      <View style={styles.viewStyle}>
        <TouchableOpacity
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Signup</Text>
        </TouchableOpacity>
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

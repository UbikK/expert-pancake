import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React from 'react';
import { Text } from 'react-native';

const LoginComponent: React.FC<{ user?: FirebaseAuthTypes.User }> = props => {
  if (!props.user) {
    return <Text>Hello</Text>;
  }
  return <Text>{props.user?.email}</Text>;
};

export default LoginComponent;

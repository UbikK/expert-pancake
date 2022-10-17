import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import { Box, Button, FormControl, Input } from 'native-base';
import React from 'react';
GoogleSignin.configure({
  webClientId:
    '196376175218-qgha44lk933n55gvpao9edhm475nqr62.apps.googleusercontent.com',
});
const SignUpComponent: React.FC = () => {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Box bg="primary.400" p="12" rounded="lg">
      <FormControl isRequired>
        <FormControl.Label>Email</FormControl.Label>
        <Input p={2} />
        <FormControl.Label>Password</FormControl.Label>
        <Input p={2} type="password" />
        <FormControl.Label>Confirm Password</FormControl.Label>
        <Input p={2} type="password" />
        <FormControl.Label>First Name</FormControl.Label>
        <Input p={2} />
        <FormControl.Label>Last Name</FormControl.Label>
        <Input p={2} />
        <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
        <Button>Confirm</Button>
      </FormControl>
      <GoogleSigninButton
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
      />
    </Box>
  );
};

export default SignUpComponent;

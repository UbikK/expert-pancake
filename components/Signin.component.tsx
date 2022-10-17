import auth from '@react-native-firebase/auth';
import { Box, Button, FormControl, Input } from 'native-base';
import React, { useState } from 'react';

const SignInComponent: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [error, setError] = useState<string | undefined>();
  const handleEmail = (text: string) => setEmail(text);
  const handlePwd = (text: string) => setPwd(text);
  return (
    <Box w={'100%'} alignSelf="center" alignItems="center">
      <FormControl isRequired isInvalid={error !== undefined}>
        <Input mt="4" p={2} placeholder="Email" onChangeText={handleEmail} />
        <Input
          mt="2"
          p={2}
          placeholder="Password"
          type="password"
          onChangeText={handlePwd}
        />
        <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
        <Button
          mt="2"
          colorScheme="secondary"
          onPress={() => {
            try {
              auth().signInWithEmailAndPassword(email, pwd);
            } catch (e) {
              console.error(e);
              setError(e as string);
            }
          }}>
          Valider
        </Button>
        <Button onPress={() => auth().sendPasswordResetEmail(email)}>
          Reset Password
        </Button>
      </FormControl>
    </Box>
  );
};

export default SignInComponent;

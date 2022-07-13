import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Box, NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RestoListComponent from './components/RestoList.component';
import SignInComponent from './components/Signin.component';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState(true);

  const authHandler = (loggedInUser: FirebaseAuthTypes.User | null) => {
    console.info(loggedInUser);
    setUser(loggedInUser);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authHandler);
    return subscriber;
  });
  if (initializing) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Box
          bg="primary.400"
          p="12"
          alignItems="center"
          h={'100%'}>
          {user ? <RestoListComponent /> : <SignInComponent />}
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;

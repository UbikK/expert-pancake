import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Box, NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { QueryClient, QueryClientProvider } from 'react-query';
import MenuButton from './components/MenuButton.component';
import RestoListComponent from './components/RestoList.component';
import SearchComponent from './components/Search';
import SignInComponent from './components/Signin.component';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState(true);
  const queryClient = new QueryClient();
  const authHandler = (loggedInUser: FirebaseAuthTypes.User | null) => {
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
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Box
            bg="primary.400"
            p="12"
            alignItems="center"
            h={'100%'}
            w={'100%'}>
            {user ? (
              <>
                <SearchComponent />
                <RestoListComponent />
              </>
            ) : (
              <SignInComponent />
            )}
          </Box>
          <MenuButton />
        </SafeAreaView>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;

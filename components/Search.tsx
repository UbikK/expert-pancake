import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Box,
  FlatList,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  View,
  VStack
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import Config from 'react-native-config';

const SearchComponent: React.FC = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [predictions, setPredictions] = useState<any[]>();
  const [showReco, setShowReco] = useState<boolean>(false);

  const onChange = useCallback(
    () => async (text: string) => {
      if (text.length > 3) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURI(
              text,
            )}&key=${
              Config.MAPS_API_KEY
            }&components=country:fr&types=establishment`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            },
          );
          const payload = await response.json();
          setPredictions(payload.predictions);

          setIsSearching(false);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [],
  );
  useEffect(() => {
    if (isSearching) {
      onChange()(searchText);
    }
  }, [isSearching, searchText, onChange]);

  useEffect(() => {
    if (predictions && predictions.length > 0) {
      setShowReco(true);
    }
  }, [predictions]);

  return (
    <>
      <Stack alignItems="center">
        <InputGroup
          w={{
            base: '90%',
            md: '285',
          }}>
          <Input
            placeholder="Rechercher"
            onChangeText={setSearchText}
            onEndEditing={() => setIsSearching(true)}
            key="searchInput"
            w={{
              base: '100%',
              md: '100%',
            }}
          />
          <InputRightAddon
            children={
              <IconButton onPress={() => setIsSearching(true)} size={'sm'}>
                <FontAwesomeIcon icon={faSearch} />
              </IconButton>
            }
          />
        </InputGroup>
      </Stack>
      {showReco ? (
        <View>
          <FlatList
            data={predictions}
            keyExtractor={item => item.place_id}
            renderItem={({ item }) => (
              <Box borderBottomWidth="1" pl={['0', '4']} pr={['0', '5']} py="2">
                <VStack>
                  <Text>{item.description}</Text>
                </VStack>
              </Box>
            )}
          />
        </View>
      ) : undefined}
    </>
  );
};

export default SearchComponent;

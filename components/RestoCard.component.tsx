import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  AspectRatio,
  Badge,
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Image,
  Stack,
  Text
} from 'native-base';
import React from 'react';
import Config from 'react-native-config';
import Resto from '../types/Resto.type';
const RestoCardComponent: React.FC<{
  resto: Resto;
}> = props => {
  return (
    <Box alignItems="center">
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${props.resto.photoId}&key=${Config.MAPS_API_KEY}&maxwidth=300`,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: 'violet.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5">
            PHOTOS
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {props.resto.name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {props.resto.address}
            </Text>
          </Stack>
          <HStack>
            <FlatList
              horizontal
              data={props.resto.types}
              renderItem={({ item }) => <Badge>{item}</Badge>}
            />
          </HStack>

          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                {props.resto.rating}
              </Text>
              <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};
export default RestoCardComponent;

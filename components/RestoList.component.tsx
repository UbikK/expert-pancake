import auth from '@react-native-firebase/auth';
import {
  firebase,
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore';
import { Center, FlatList, Skeleton, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import Resto from '../types/Resto.type';
import RestoCardComponent from './RestoCard.component';

const RestoListComponent: React.FC = () => {
  const [restos, setRestos] = useState<Resto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const subscriber = firebase
        .firestore()
        .collection('restos')
        .where('userId', '==', auth().currentUser?.uid)
        .onSnapshot(
          (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
            const temp: Resto[] = [];

            querySnapshot.forEach(
              (documentSnapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
                temp.push({
                  ...(documentSnapshot.data() as Resto)
                });
              }
            );

            setRestos(temp);
            setLoading(false);
          },
          (err: any) => {
            console.error('error');
            console.error(err);
          },
          () => {
            console.info('onComplete');
          }
        );

      // Unsubscribe from events when no longer in use
      return () => subscriber();
    } catch (e) {
      console.info(e);
    }
  });

  return (
    <>
      {loading ? (
        <Center w="100%">
          <VStack
            w="90%"
            maxW="400"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: 'coolGray.500'
            }}
            _light={{
              borderColor: 'coolGray.200'
            }}>
            <Skeleton h="40" />
            <Skeleton.Text px="4" />
            <Skeleton
              px="4"
              my="4"
              rounded="md"
              startColor="primary.100"
            />
          </VStack>
        </Center>
      ) : restos.length > 0 ? (
        <FlatList
          data={restos}
          renderItem={(item: ListRenderItemInfo<Resto>) => (
            <RestoCardComponent resto={item.item} />
          )}
          keyExtractor={(item: any) => item.id}
        />
      ) : (
        <RestoCardComponent />
      )}
    </>
  );
};

export default RestoListComponent;

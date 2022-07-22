import { Center, FlatList, Skeleton, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useQuery } from 'react-query';
import useRestosQuery from '../store/restos';
import useUserStore from '../store/user';
import Resto from '../types/Resto.type';
import converter from '../utils/TypeConverter';
import RestoCardComponent from './RestoCard.component';

const RestoListComponent: React.FC = () => {
    const [restos, setRestos] = useState<Resto[]>([]);
    const { userId } = useUserStore();
    const { restosQuery } = useRestosQuery();
    const { isLoading } = useQuery(['restos', userId], restosQuery, {
        onSuccess: data => setRestos(data.docs.map(r => converter<Resto>(r)))
    });

    return (
        <>
            {isLoading ? (
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
            ) : (
                <FlatList
                    data={restos}
                    renderItem={({ item }: ListRenderItemInfo<Resto>) => (
                        <View style={{ marginTop: 8, marginBottom: 8 }}>
                            <RestoCardComponent
                                resto={item}
                                key={item.id}
                            />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            )}
        </>
    );
};

export default RestoListComponent;

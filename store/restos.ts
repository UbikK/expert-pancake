import { firebase } from '@react-native-firebase/firestore';
import useUserStore from './user';

const useRestosQuery = () => {
  const { userId } = useUserStore();

  const restosQuery = async () => {
    console.info('USERID::', userId);
    return firebase
      .firestore()
      .collection('restos')
      .where('userId', '==', userId)
      .get();
  };

  return { restosQuery };
};

export default useRestosQuery;

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import User from '../types/User.type';
import converter from '../utils/TypeConverter';

const useUserStore = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const userQuery = useQuery('user', async () => {
    return converter<User>(
      (
        await firebase
          .firestore()
          .collection('users')
          .where('authId', '==', auth().currentUser?.uid)
          .get()
      ).docs[0]
    );
  });

  useEffect(() => {
    if (userQuery.data) {
      setUserId(userQuery.data.id);
    }
  }, [userQuery]);

  return { userId };
};

export default useUserStore;

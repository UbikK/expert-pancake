import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const converter = <T>(
  data: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
) => {
  const converted = data.data() as T;

  return { ...converted, id: data.id };
};

export default converter;

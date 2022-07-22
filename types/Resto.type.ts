type Resto = {
  id: string;
  name: string;
  address: string;
  comment: string;
  photoId: string;
  placeId: string;
  userId: string;
  rating: string;
  types: string[];
  location: {
    lat: string;
    lng: string;
  };
  hours: Hour[];
};

export type Hour = {
  close: {
    day: number;
    time: number;
  };
  open: {
    day: number;
    time: number;
  };
};
export default Resto;

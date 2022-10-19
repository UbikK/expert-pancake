import {
  faBars,
  faPerson,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View } from 'native-base';
import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30,
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  other: {
    backgroundColor: '#FFF',
  },
  payText: {
    color: '#FFF',
  },
  pay: {
    backgroundColor: '#FFF',
  },
  label: {
    color: '#000',
    position: 'absolute',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
});
const MenuButton: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleOpen = () => {
    if (isOpened) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setIsOpened(!isOpened);
  };

  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const bgStyle = {
    transform: [
      {
        scale: scaleInterpolate,
      },
    ],
  };

  const reloadInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  });

  const orderInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -70, -140],
  });

  const reloadStyle = {
    transform: [
      {
        translateY: reloadInterpolate,
      },
    ],
  };

  const orderStyle = {
    transform: [
      {
        translateY: orderInterpolate,
      },
    ],
  };

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[styles.background, bgStyle]} />
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.other, orderStyle]}>
            <FontAwesomeIcon icon={faPlus} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.other, reloadStyle]}>
            <FontAwesomeIcon icon={faPerson} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={toggleOpen}>
          <View style={[styles.button, styles.pay]}>
            {isOpened ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default MenuButton;

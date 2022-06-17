import React from 'react';
import { Image, View, Modal } from 'react-native';
import propTypes from 'prop-types';
import styles from './style';
import { loader } from '../../assets';

const Loader = ({
  visible,
}) => (
  <View>
    <Modal
      animationType="none"
      transparent
      style={styles.modalWrapper}
      visible={visible}
    >
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={loader}
          style={[styles.imageStyle]}

        />
      </View>

    </Modal>
  </View>
);

Loader.propTypes = {
  visible: propTypes.bool,
};

export default Loader;

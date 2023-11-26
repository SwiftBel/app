import React, {
  createContext, useState, useMemo,
} from 'react';
import propTypes from 'prop-types';

// const TAG = 'ModalProvider: ';

export const AddressContext = createContext({});

export function AddressConsumer({ children }) {
  return (
    <AddressContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error('AddressConsumer must be used within a AddressProvider');
        }
        return children(context);
      }}
    </AddressContext.Consumer>
  );
}

AddressConsumer.propTypes = {
  children: propTypes.any,
};

export function AddressProvider({ children }) {
  const [addressDetail, setAddressDetail] = useState('');
  const [isUpdatingCurrentLocation, setUpdatingCurrentLocation] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditingCurrentAddress, setEditCurrentAddress] = useState(false);

  const mProps = useMemo(() => ({
    addressDetail,
    setAddressDetail,
    isUpdatingCurrentLocation,
    setUpdatingCurrentLocation,
    isModalVisible,
    setModalVisible,
    isEditingCurrentAddress,
    setEditCurrentAddress,
  }), [addressDetail, isUpdatingCurrentLocation, isModalVisible, isEditingCurrentAddress]);

  return (
    <AddressContext.Provider value={mProps}>{children}</AddressContext.Provider>
  );
}

AddressProvider.propTypes = {
  children: propTypes.any,
};

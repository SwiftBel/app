import React, { createContext, useMemo, useRef } from 'react';
import propTypes from 'prop-types';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';

// const TAG = 'ActionSheetProvider: ';

export const ActionSheetContext = createContext({});

export function ActionSheetConsumer({ children }) {
  return (
    <ActionSheetContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            'ActionSheetConsumer must be used within a ActionSheetProvider',
          );
        }
        return children(context);
      }}
    </ActionSheetContext.Consumer>
  );
}

ActionSheetConsumer.propTypes = {
  children: propTypes.any,
};

export function ActionSheetProvider({ children }) {
  const bottomSheetCompleteProfile = useRef();
  const bottomSheetEditAddress = useRef();
  const bottomSheetexist = useRef();
  const services=useRef();

  const { dismissAll } = useBottomSheetModal();

  const openCompleteProfile = () => {
    dismissAll();
    bottomSheetCompleteProfile?.current?.present();
  };

  const openServices = () => {
    dismissAll();
    services?.current?.present();
  };
  

  const openEditAddress = () => {
    dismissAll();
    bottomSheetEditAddress?.current?.present();
  };

  const openEditCurrentAddress = () => {
    dismissAll();
    bottomSheetexist?.current?.present();
  };

  const mProps = useMemo(
    () => ({
      services,
      openServices,
      bottomSheetCompleteProfile,
      openCompleteProfile,
      bottomSheetEditAddress,
      openEditAddress,
      bottomSheetexist,
      openEditCurrentAddress,
    }),
    [
      bottomSheetCompleteProfile,
      bottomSheetEditAddress,
      bottomSheetexist,
      services
    ],
  );

  return (
    <ActionSheetContext.Provider value={mProps}>{children}</ActionSheetContext.Provider>
  );
}

ActionSheetProvider.propTypes = {
  children: propTypes.any,
};

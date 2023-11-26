import React from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

function CustomBackdrop(props) {
  return (
   
      <BottomSheetBackdrop
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        pressBehavior="close"
      />
  )
}
export default CustomBackdrop;

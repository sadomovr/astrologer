import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { astrologersAction } from '../store/astrologers';

export const useURLToAstrologersFilters = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get('name');
    const focusesParam = urlParams.get('focuses');
    const focuses = focusesParam ? focusesParam.split(',').map(Number) : undefined;

    const specializationsParam = urlParams.get('specializations');

    const specializations = specializationsParam
      ? specializationsParam.split(',').map(Number)
      : undefined;
    const status = urlParams.get('status');
    const orderByKey = urlParams.get('orderByKey');
    const orderByValue = urlParams.get('orderByValue');

    // Dispatch actions to update Redux state
    dispatch({
      type: astrologersAction.UPDATE_STATE_FROM_URL,
      payload: {
        filters: {
          name,
          focuses,
          specializations,
          status,
        },
        orderByKey,
        orderByValue,
      },
    });
  }, [dispatch]);
};

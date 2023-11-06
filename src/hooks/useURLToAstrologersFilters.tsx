import { useEffect } from 'react';
import { astrologer } from '../store/astrologers';
import { useAppDispatch } from './useAppDispatch.ts';

export const useURLToAstrologersFilters = () => {
  const dispatch = useAppDispatch();

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
    const orderByKey = urlParams.get('orderByKey') as 'status' | 'rating' | 'price';
    const orderByValue = urlParams.get('orderByValue') as 'ASC' | 'DESC';

    // Dispatch actions to update Redux state
    dispatch(
      astrologer.actions.updateStateFromURL({
        filters: {
          name: name || undefined,
          focuses,
          specializations,
          status: status ? Number(status) : undefined,
        },
        orderByKey: orderByKey || undefined,
        orderByValue: orderByValue || undefined,
      }),
    );
  }, [dispatch]);
};

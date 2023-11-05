import { useEffect } from 'react';

export const useAstrologersFiltersToUrl = (
  filters: { name: string; focuses: number[]; specializations: number[]; status?: number },
  orderByValue: 'ASC' | 'DESC',
  orderByKey: 'status' | 'rating' | 'price',
) => {
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filters.name) {
      queryParams.set('name', filters.name);
    }
    if (filters.focuses.length) {
      queryParams.set('focuses', filters.focuses.join(','));
    }
    if (filters.specializations) {
      queryParams.set('specializations', filters.specializations.join(','));
    }
    if (filters.status) {
      queryParams.set('status', filters.status.toString());
    }
    if (orderByKey) {
      queryParams.set('orderByKey', orderByKey);
    }
    if (orderByValue) {
      queryParams.set('orderByValue', orderByValue);
    }

    // Construct the updated URL with the query parameters
    const updatedUrl = `?${queryParams.toString()}`;

    // Use the window.history API to update the URL
    window.history.pushState({}, '', updatedUrl);
  }, [filters, orderByValue, orderByKey]);
};

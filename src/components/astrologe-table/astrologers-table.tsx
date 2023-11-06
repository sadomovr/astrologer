import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { AstrologersTableBody } from './astrologers-table-body.tsx';
import { AstrologersTableHeader } from './astrologers-table-header.tsx';
import { AstrologersTableFilters } from './astrologers-table-filters.tsx';
import {
  astrologer,
  AstrologersFiltersKey,
  AstrologersState,
  getAstrologersFilters,
  getFilteredAndSortedAstrologers,
} from '../../store/astrologers';
import { useAstrologersFiltersToUrl } from '../../hooks/';
import { useURLToAstrologersFilters } from '../../hooks/useURLToAstrologersFilters.tsx';
import { useAppDispatch } from '../../hooks/useAppDispatch.ts';
import { useAppSelector } from '../../hooks/useAppSelector.ts';

export function AstrologersTable() {
  const dispatch = useAppDispatch();

  const astrologersList = useAppSelector(getFilteredAndSortedAstrologers);
  const { filters, orderByValue, orderByKey, availableSpecializations, availableFocuses } =
    useAppSelector(getAstrologersFilters);

  useURLToAstrologersFilters();
  useAstrologersFiltersToUrl(filters, orderByValue, orderByKey);

  const handleUpdateFilters = (key: AstrologersFiltersKey, value: string | number | number[]) => {
    dispatch(astrologer.actions.updateFilter({ key, value }));
  };

  const handleUpdateSorting = (orderBy: AstrologersState['orderByKey']) => {
    dispatch(astrologer.actions.updateSorting(orderBy));
  };

  const handleRemoveAstrologer = (id: string) => {
    dispatch(astrologer.actions.deleteAstrologer(id));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <AstrologersTableFilters
        filters={filters}
        availableFocuses={availableFocuses}
        availableSpecializations={availableSpecializations}
        handleUpdateFilters={handleUpdateFilters}
      />
      <TableContainer component={Paper}>
        <Table>
          <AstrologersTableHeader handleUpdateSorting={handleUpdateSorting} />
          <AstrologersTableBody
            data={astrologersList}
            handleRemoveAstrologer={handleRemoveAstrologer}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}

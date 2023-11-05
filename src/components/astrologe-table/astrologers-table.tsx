import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { AstrologersTableBody } from './astrologers-table-body.tsx';
import { AstrologersTableHeader } from './astrologers-table-header.tsx';
import { AstrologersTableFilters } from './astrologers-table-filters.tsx';
import { astrologersAction } from '../../store/astrologers';
import { getFilteredAndSortedAstrologers } from '../../store/astrologers/astrologers.selector.ts';

export function AstrologersTable() {
  const astrologersList = useSelector(getFilteredAndSortedAstrologers);
  const dispatch = useDispatch();

  const handleUpdateFilters = (key: string, value: string | number | number[] | undefined) => {
    dispatch({
      type: astrologersAction.UPDATE_FILTER,
      payload: { key, value },
    });
  };

  const handleUpdateSorting = (orderBy: string) => {
    dispatch({
      type: astrologersAction.UPDATE_SORTING,
      payload: orderBy,
    });
  };

  const handleRemoveAstrologer = (id: string) => {
    dispatch({
      type: astrologersAction.DELETE_ASTROLOGER,
      payload: id,
    });
  };

  return (
    <div>
      <AstrologersTableFilters handleUpdateFilters={handleUpdateFilters} />
      <TableContainer component={Paper}>
        <Table>
          <AstrologersTableHeader handleUpdateSorting={handleUpdateSorting} />
          <AstrologersTableBody
            data={astrologersList}
            handleRemoveAstrologer={handleRemoveAstrologer}
          />
        </Table>
      </TableContainer>
    </div>
  );
}

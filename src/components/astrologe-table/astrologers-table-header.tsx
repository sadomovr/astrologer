import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AstrologersTableHeaderItem } from './astrologers-table-header-item.tsx';

type AstrologersTableHeaderProps = {
  handleUpdateSorting: (orderBy: 'rating' | 'status' | 'price') => void;
};

export const AstrologersTableHeader = ({ handleUpdateSorting }: AstrologersTableHeaderProps) => {
  const { orderByKey, orderByValue } = useSelector((state: RootState) => state.astrologers);

  const tableHeaders: { label: string; orderBy: 'rating' | 'status' | 'price' | null }[] = [
    { label: 'ID', orderBy: null },
    { label: 'Photo', orderBy: null },
    { label: 'Name', orderBy: null },
    { label: 'Supply Type', orderBy: null },
    { label: 'Astrology Type', orderBy: null },
    { label: 'Online Chat Price', orderBy: 'price' },
    { label: 'Rating', orderBy: 'rating' },
    { label: 'Focuses', orderBy: null },
    { label: 'Languages', orderBy: null },
    { label: 'Specializations', orderBy: null },
    { label: 'Status', orderBy: 'status' },
  ];

  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map((header, index) => (
          <AstrologersTableHeaderItem
            key={index}
            label={header.label}
            orderBy={header.orderBy}
            handleUpdateSorting={handleUpdateSorting}
            orderByKey={orderByKey}
            orderByValue={orderByValue}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

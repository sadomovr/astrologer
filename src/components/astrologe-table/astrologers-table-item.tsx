import TableCell from '@mui/material/TableCell';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box } from '@mui/material';

const OrderItem = ({ value }: { value: 'ASC' | 'DESC' }) => {
  return value === 'ASC' ? <ArrowUpward /> : value === 'DESC' ? <ArrowDownward /> : null;
};

type AstrologersTableItemProps = {
  label: string;
  orderBy: 'rating' | 'status' | 'price' | null;
  handleUpdateSorting: (orderBy: 'rating' | 'status' | 'price') => void;
  orderByKey: string;
  orderByValue: 'ASC' | 'DESC';
};

export const AstrologersTableItem = ({
  label,
  orderBy,
  handleUpdateSorting,
  orderByKey,
  orderByValue,
}: AstrologersTableItemProps) => {
  const isSortable = orderBy !== null;

  return (
    <TableCell
      onClick={() => isSortable && handleUpdateSorting(orderBy)}
      sx={{ cursor: isSortable ? 'pointer' : 'default' }}
    >
      <Box display='flex' gap='10px'>
        {label}
        {orderByKey === orderBy ? <OrderItem value={orderByValue} /> : null}
      </Box>
    </TableCell>
  );
};

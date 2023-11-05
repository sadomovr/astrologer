import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

type AstrologersTableHeaderProps = {
  handleUpdateSorting: (orderBy: 'rating' | 'status' | 'price') => void;
};

export const AstrologersTableHeader = ({ handleUpdateSorting }: AstrologersTableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Photo</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Supply Type</TableCell>
        <TableCell>Astrology Type</TableCell>
        <TableCell onClick={() => handleUpdateSorting('price')}>Online Chat Price</TableCell>
        <TableCell onClick={() => handleUpdateSorting('rating')}>Rating</TableCell>
        <TableCell>Focuses</TableCell>
        <TableCell>Languages</TableCell>
        <TableCell>Specializations</TableCell>
        <TableCell onClick={() => handleUpdateSorting('status')}>Status</TableCell>
      </TableRow>
    </TableHead>
  );
};

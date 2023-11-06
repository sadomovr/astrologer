import TableBody from '@mui/material/TableBody';
import { Typography } from '@mui/material';
import { AstrologersTableItem } from './astrologers-table-item.tsx';
import { Astrologer } from '../../shared/types/astrologer.ts';

type AstrologersTableBodyProps = {
  data: Astrologer[];
  handleRemoveAstrologer: (id: string) => void;
};

export const AstrologersTableBody = ({
  data,
  handleRemoveAstrologer,
}: AstrologersTableBodyProps) => {
  if (!data.length) {
    return (
      <TableBody>
        <Typography>No data</Typography>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((astrologer) => (
        <AstrologersTableItem
          key={astrologer.id}
          astrologer={astrologer}
          handleRemoveAstrologer={handleRemoveAstrologer}
        />
      ))}
    </TableBody>
  );
};

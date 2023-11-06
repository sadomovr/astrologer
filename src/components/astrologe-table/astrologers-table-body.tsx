import TableBody from '@mui/material/TableBody';
import { Typography } from '@mui/material';
import { AstrologersTableItem } from './astrologers-table-item.tsx';

type AstrologersTableBodyProps = {
  data: {
    id: string;
    user_id: number;
    image_mini: string;
    name: string;
    supply_type: {
      type: string;
    };
    astrology_type: string;
    chat_offers: {
      price: number;
      type: string;
    }[];
    specializations: { name: string }[];
    rating: number;
    focuses: { name: string }[];
    languages: { native_name: string }[];
    status: string;
  }[];
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
          handleRemoveAstrologer={handleRemoveAstrologer}
          {...astrologer}
        />
      ))}
    </TableBody>
  );
};

import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Avatar } from '../../shared/ui/avatar';
import { Box, Typography } from '@mui/material';

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
        <TableRow key={astrologer.id}>
          <TableCell>{astrologer.user_id}</TableCell>
          <TableCell>
            <Avatar src={astrologer.image_mini} alt={astrologer.name} />
          </TableCell>
          <TableCell>
            <Box>{astrologer.name}</Box>
            <Box onClick={() => handleRemoveAstrologer(astrologer.id)}>Delete</Box>
          </TableCell>
          <TableCell>{astrologer.supply_type.type}</TableCell>
          <TableCell>{astrologer.astrology_type}</TableCell>
          <TableCell>
            {astrologer.chat_offers.find((offer) => offer.type === 'online')?.price || ''}
          </TableCell>
          <TableCell>{astrologer.rating}</TableCell>
          <TableCell>{astrologer.focuses.map((item) => item.name).join(', ')}</TableCell>
          <TableCell>{astrologer.languages?.[0]?.native_name || ''}</TableCell>
          <TableCell>{astrologer.specializations.map((item) => item.name).join(', ')}</TableCell>
          <TableCell>{astrologer.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Avatar } from '../../shared/ui/avatar';
import { Box, Chip } from '@mui/material';
import { Delete } from '@mui/icons-material';

type AstrologersTableItemProps = {
  id: string;
  user_id: number;
  image_mini: string;
  name: string;
  supply_type: { type: string };
  astrology_type: string;
  chat_offers: { price: number; type: string }[];
  rating: number;
  focuses: { name: string }[];
  languages: { native_name: string }[];
  specializations: { name: string }[];
  status: string;
  handleRemoveAstrologer: (id: string) => void;
};

export const AstrologersTableItem = ({
  id,
  user_id,
  image_mini,
  name,
  supply_type,
  astrology_type,
  chat_offers,
  rating,
  focuses,
  languages,
  specializations,
  status,
  handleRemoveAstrologer,
}: AstrologersTableItemProps) => {
  const [hoveredName, setHoveredName] = useState<boolean>(false);

  return (
    <TableRow>
      <TableCell>{user_id}</TableCell>
      <TableCell>
        <Avatar src={image_mini} alt={name} />
      </TableCell>
      <TableCell
        onMouseEnter={() => setHoveredName(true)}
        onMouseLeave={() => setHoveredName(false)}
      >
        <Box>{name}</Box>
        {hoveredName ? (
          <Box
            onClick={() => handleRemoveAstrologer(id)}
            sx={{
              cursor: 'pointer',
              color: 'rgba(0,77,117,0.6)',
            }}
          >
            <Delete fontSize='small' />
            Delete
          </Box>
        ) : null}
      </TableCell>
      <TableCell>{supply_type.type}</TableCell>
      <TableCell>{astrology_type}</TableCell>
      <TableCell>{chat_offers.find((offer) => offer.type === 'online')?.price || ''}</TableCell>
      <TableCell>{rating}</TableCell>
      <TableCell>{focuses.map((item) => item.name).join(', ')}</TableCell>
      <TableCell>{languages?.[0]?.native_name || ''}</TableCell>
      <TableCell>{specializations.map((item) => item.name).join(', ')}</TableCell>
      <TableCell>
        <Chip color={status === 'offline' ? 'error' : 'success'} label={status} />
      </TableCell>
    </TableRow>
  );
};

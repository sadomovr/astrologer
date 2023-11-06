import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Avatar } from '../../shared/ui/avatar';
import { Box, Chip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Astrologer } from '../../shared/types/astrologer.ts';

type AstrologersTableItemProps = {
  astrologer: Astrologer;
  handleRemoveAstrologer: (id: string) => void;
};

export const AstrologersTableItem = ({
  astrologer,
  handleRemoveAstrologer,
}: AstrologersTableItemProps) => {
  const [hoveredName, setHoveredName] = useState<boolean>(false);

  return (
    <TableRow>
      <TableCell>{astrologer.user_id}</TableCell>
      <TableCell>
        <Avatar src={astrologer.image_mini} alt={astrologer.name} />
      </TableCell>
      <TableCell
        onMouseEnter={() => setHoveredName(true)}
        onMouseLeave={() => setHoveredName(false)}
      >
        <Box>{astrologer.name}</Box>
        {hoveredName ? (
          <Box
            onClick={() => handleRemoveAstrologer(astrologer.id)}
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
      <TableCell>{astrologer.supply_type.type}</TableCell>
      <TableCell>{astrologer.astrology_type}</TableCell>
      <TableCell>
        {astrologer.chat_offers.find((offer) => offer.type === 'online')?.price || ''}
      </TableCell>
      <TableCell>{astrologer.rating}</TableCell>
      <TableCell>{astrologer.focuses.map((item) => item.name).join(', ')}</TableCell>
      <TableCell>{astrologer.languages?.[0]?.native_name || ''}</TableCell>
      <TableCell>{astrologer.specializations.map((item) => item.name).join(', ')}</TableCell>
      <TableCell>
        <Chip
          color={astrologer.status === 'offline' ? 'error' : 'success'}
          label={astrologer.status}
        />
      </TableCell>
    </TableRow>
  );
};

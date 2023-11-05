import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';

type AstrologersTableFilters = {
  handleUpdateFilters: (
    key: string,
    values: string | number | number[] | string[] | undefined,
  ) => void;
};

export const AstrologersTableFilters = ({ handleUpdateFilters }: AstrologersTableFilters) => {
  const { filters, availableSpecializations, availableFocuses } = useSelector(
    (state: RootState) => state.astrologers,
  );

  const handleChange = (event: SelectChangeEvent<number[] | string | number | undefined>) => {
    handleUpdateFilters(event.target.name, event.target.value);
  };

  const handleChangeMultiple = (event: SelectChangeEvent<(string | number)[]>) => {
    console.log(event.target.value);
    if (event.target.value.includes('all')) {
      handleUpdateFilters(event.target.name, []);

      return;
    }

    handleUpdateFilters(event.target.name, event.target.value as number[]);
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    handleUpdateFilters(event.target.name, event.target.value);
  };

  return (
    <Box component={Paper} display='flex' justifyContent='space-between' gap='20px' padding='15px'>
      <FormControl fullWidth>
        <Typography>Name</Typography>
        <TextField
          type='text'
          name='name'
          variant='outlined'
          placeholder='Search by name'
          value={filters.name}
          onChange={handleChangeName}
        />
      </FormControl>

      <FormControl fullWidth>
        <Typography>Focuses</Typography>
        <Select name='focuses' onChange={handleChangeMultiple} value={filters.focuses} multiple>
          <MenuItem value='all'>All</MenuItem>
          {availableFocuses.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <Typography>Specializations</Typography>
        <Select
          name='specializations'
          onChange={handleChangeMultiple}
          value={filters.specializations}
          multiple
        >
          <MenuItem value='all'>All</MenuItem>
          {availableSpecializations.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <Typography>Status</Typography>
        <Select name='status' onChange={handleChange} value={filters.status}>
          <MenuItem value={undefined}>All</MenuItem>
          <MenuItem value={1}>Online</MenuItem>
          <MenuItem value={2}>Offline</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

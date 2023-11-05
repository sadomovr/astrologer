import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ChangeEvent } from 'react';

type AstrologersTableFilters = {
  handleUpdateFilters: (key: string, values: string | number | number[] | undefined) => void;
};

export const AstrologersTableFilters = ({ handleUpdateFilters }: AstrologersTableFilters) => {
  const { filters, availableSpecializations, availableFocuses } = useSelector(
    (state: RootState) => state.astrologers,
  );

  const handleChange = (event: SelectChangeEvent<number[] | string | number | undefined>) => {
    handleUpdateFilters(event.target.name, event.target.value);
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    handleUpdateFilters(event.target.name, event.target.value);
  };

  return (
    <Box display='flex' justifyContent='space-between' gap='20px'>
      <FormControl fullWidth>
        <InputLabel id='input-name'>Name</InputLabel>
        <Input
          type='text'
          name='name'
          placeholder='Search by name'
          value={filters.name}
          onChange={handleChangeName}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='select-focuses'>Focuses</InputLabel>
        <Select
          name='focuses'
          onChange={handleChange}
          labelId='select-focuses'
          value={filters.focuses}
          multiple
        >
          {availableFocuses.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='select-specializations'>Specializations</InputLabel>
        <Select
          name='specializations'
          onChange={handleChange}
          labelId='select-specializations'
          value={filters.specializations}
          multiple
        >
          {availableSpecializations.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='select-status'>Status</InputLabel>
        <Select
          name='status'
          onChange={handleChange}
          labelId='select-status'
          value={filters.status}
        >
          <MenuItem value={undefined}>Status</MenuItem>
          <MenuItem value={1}>Online</MenuItem>
          <MenuItem value={2}>Offline</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

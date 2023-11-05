import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { RootState } from '../store';

export function App() {
  const data = useSelector<RootState>((state) => state.astrologers.data);

  return <Container>Astrologers Table</Container>;
}

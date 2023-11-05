import { Container } from '@mui/material';
import { AstrologersTable } from './astrologe-table';

export function App() {
  return (
    <Container maxWidth='xl' sx={{ marginTop: '25px' }}>
      <AstrologersTable />
    </Container>
  );
}

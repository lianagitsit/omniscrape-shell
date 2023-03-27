import React, { useEffect } from 'react';
import './App.css';
import useFetch from './useFetch';
import moment from 'moment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function BasicTable({ rows }: { rows: any}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Deck</TableCell>
            <TableCell align="right">Site</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, i: number) => (
            <TableRow
              key={`${row.deck}-${i}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.deck}
              </TableCell>
              <TableCell align="right">{row.url}</TableCell>
              <TableCell align="right">{`$${row.price}`}</TableCell>
              <TableCell align="right">{moment(row.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function App() {
  // const { data: srapeData, loading: scrapeLoading } = useFetch("http://localhost:8080/api/scrape");
  const { data, loading } = useFetch("http://localhost:8080/api");

  const [deck, setDeck] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDeck(event.target.value as string);
  };

  return (
    <div className="App">
      <header className="App-header">
        Scrapey Wapey
      </header>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Deck</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={deck}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"Light Visions Tarot"}>Light Visions Tarot</MenuItem>
            {/* <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        <Button variant='contained'>Scrape</Button>
      </Box>
      <BasicTable rows={data} />
    </div>
  );
}

export default App;

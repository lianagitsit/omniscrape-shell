import React, { useEffect } from 'react';
import './App.css';
import useScans from './useScans';
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

function ScansTable() {
  const { data, loading } = useScans("http://localhost:8080/api/scans");

  let rows = data;
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

function DeckSelect({deck, onSelect}: {deck: string, onSelect: (event: SelectChangeEvent) => void}) {
  return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Deck</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={deck}
            label="Deck"
            onChange={onSelect}
          >
            <MenuItem value={"Light Visions Tarot"}>Light Visions Tarot</MenuItem>
          </Select>
        </FormControl>
      </Box>
  )
}

function SiteSelect({site, onSelect}: {site: string, onSelect: (event: SelectChangeEvent) => void}) {
  return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Site</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={site}
            label="Site"
            onChange={onSelect}
          >
            <MenuItem value={"Phoenix & Lotus"}>Phoenix & Lotus</MenuItem>
          </Select>
        </FormControl>
      </Box>
  )
}

function ScrapeButton({deck, site}: {deck: string, site: string}) {
  return (
    <Button variant='contained'>Scrape</Button>
  )
}


function App() {
  // const { data: srapeData, loading: scrapeLoading } = useFetch("http://localhost:8080/api/scrape");

  const [deck, setDeck] = React.useState('');
  const handleDeckChange = (event: SelectChangeEvent) => {
    setDeck(event.target.value as string);
  };

  const [site, setSite] = React.useState('');
  const handleSiteChange = (event: SelectChangeEvent) => {
    setSite(event.target.value as string);
  };

  return (
    <div className="App">
      <h1 className="App-header">
        Scrapey Wapey
      </h1>
      <DeckSelect deck={deck} onSelect={handleDeckChange} />
      <SiteSelect site={site} onSelect={handleSiteChange} />
      <ScrapeButton deck={deck} site={site}/>
      <ScansTable />
    </div>
  );
}

export default App;

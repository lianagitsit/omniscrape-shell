const express = require('express')
const app = express()
// const path = require('path');
const port = 8080

const scraper = require('./scrape');

// const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');
app.use(express.json())

// Add Access Control Allow Origin headers
app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/api', (req: any, res: any) => {
  res.set('Content-Type', 'application/json');

  (async () => {
    const data = await scraper.scrape();
    res.send(JSON.stringify(data, null, 2));
  })()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const app = express()
// const path = require('path');
const port = 8080

const phoenixAndLotusScraper = require('./scrapePhoenixAndLotus');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

app.get('/api/scans', (req: any, res: any) => {
  res.set('Content-Type', 'application/json');

  try {
    (async () => {
      const allScans = await prisma.scans.findMany();
      return res.send(allScans)
    })()
  } catch (error) {
    return res.json({
        success: false,
        message: error
    });
  }
})

app.post('/api/scrape', (req: any, res: any) => {
  (async () => {
    const { pageTitle, deckName, price } = await phoenixAndLotusScraper.scrape(req.body.deckTitle);
    const zPrice = price.trim().slice(1);
    try {
      const newScan = await prisma.scans.create({
          data: {
              url: pageTitle,
              deck: deckName,
              price: parseFloat(zPrice)
          }
      });
      return res.send({
          success: true,
          data: newScan
      });
    } catch (error) {
      return res.json({
          success: false,
          message: error
      });
    }
  })()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
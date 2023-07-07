import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

import express from 'express';
import bodyParser from 'body-parser';
// import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';


import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";

async function getBrowserInstance() {

  // const executablePath = await chromium.executablePath;

  // if (!executablePath) {
  return puppeteer.launch();
  // }

  // return chromium.puppeteer.launch({
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath,
  //   headless: chromium.headless,
  //   ignoreHTTPSErrors: true,
  // });
}


const pixel5 = {
  userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5 Build/RD1A.201105.003.C1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.66 Mobile Safari/537.36',
  viewport: {
    width: 393,
    height: 851,
    isMobile: true,
    deviceScaleFactor: 1,
    hasTouch: true
  }
};


const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();



app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.get('/api/record-winner', async (req, res) => {
    res.setHeader('Content-Type', 'video/mp4');
    // res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    try {
      const browser = await getBrowserInstance();

      const page = await browser.newPage();

      await page.emulate(pixel5);
      const recorder = new PuppeteerScreenRecorder(page as any);

      const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://chose-a-winner.vercel.app';

      await page.goto(url, { waitUntil: "networkidle0" });
      await page.click('#loginSubmit');

      await recorder.start(`video/winner.mp4`);

      await recorder.stop();
      await browser.close();

      res.sendFile('/video/winner.mp4', {}, (error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3030);

  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV
    }`
  );
});
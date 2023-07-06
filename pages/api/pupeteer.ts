import { NextApiRequest, NextApiResponse } from "next";
import { Device } from "puppeteer";
import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";
// import puppeteer from "puppeteer";

// import chromium from 'chrome-aws-lambda';

// import { v4 as uuidv4 } from 'uuid';
import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';


async function getBrowserInstance() {

  // const executablePath = await chromium.executablePath;

  // if (!executablePath) {
  return puppeteer.launch({
    args: chromium.args,
    ignoreHTTPSErrors: true,
  });
  // }

  // return chromium.puppeteer.launch({
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath,
  //   headless: chromium.headless,
  //   ignoreHTTPSErrors: true,
  // });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pixel5: Device = {
    userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5 Build/RD1A.201105.003.C1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.66 Mobile Safari/537.36',
    viewport: {
      width: 393,
      height: 851,
      isMobile: true,
      deviceScaleFactor: 1,
      hasTouch: true
    }
  };

  // TODO try fix
  const browser = await getBrowserInstance();

  const page = await browser.newPage();

  await page.emulate(pixel5);
  const recorder = new PuppeteerScreenRecorder(page as any);

  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://chose-a-winner.vercel.app/';
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.click('#loginSubmit');
  // const id = uuidv4();
  await recorder.start(`public/video/winner.mp4`);

  await recorder.stop();
  await browser.close();

  res.send({ recorder, ID: 'winner' });
}

import { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { Device } from "puppeteer";
import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";
import { v4 as uuidv4 } from 'uuid';

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
  const browser = await puppeteer.launch();


  const page = await browser.newPage();
  // await page.setViewport({
  //   width: 414,
  //   height: 896,
  //   isMobile: true,

  // });
  await page.emulate(pixel5);
  const recorder = new PuppeteerScreenRecorder(page);


  await page.goto('http://localhost:3000', { waitUntil: "networkidle0" });
  await page.click('#loginSubmit');
  const id = uuidv4();
  await recorder.start(`public/video/${id}.mp4`);

  await recorder.stop();
  await browser.close();

  res.send({ recorder, ID: id });

  return page;
}

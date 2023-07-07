"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const puppeteer_screen_recorder_1 = require("puppeteer-screen-recorder");
async function getBrowserInstance() {
    const executablePath = await chrome_aws_lambda_1.default.executablePath;
    if (!executablePath) {
        return puppeteer_1.default.launch({
            args: chrome_aws_lambda_1.default.args,
            ignoreHTTPSErrors: true,
        });
    }
    return chrome_aws_lambda_1.default.puppeteer.launch({
        args: chrome_aws_lambda_1.default.args,
        defaultViewport: chrome_aws_lambda_1.default.defaultViewport,
        executablePath,
        headless: chrome_aws_lambda_1.default.headless,
        ignoreHTTPSErrors: true,
    });
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
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = (0, express_1.default)();
    server.use(body_parser_1.default.json());
    server.use(body_parser_1.default.urlencoded({ extended: true }));
    server.get('/api/record-winner', async (req, res) => {
        res.setHeader('Content-Type', 'video/mp4');
        // res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        try {
            const browser = await getBrowserInstance();
            const page = await browser.newPage();
            await page.emulate(pixel5);
            const recorder = new puppeteer_screen_recorder_1.PuppeteerScreenRecorder(page);
            const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://chose-a-winner.vercel.app';
            await page.goto(url, { waitUntil: "networkidle0" });
            await page.click('#loginSubmit');
            await recorder.start(`video/winner.mp4`);
            await recorder.stop();
            await browser.close();
            res.sendFile('/video/winner.mp4', {}, (error) => console.log(error));
        }
        catch (error) {
            console.error(error);
        }
    });
    server.get('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(3030);
    (0, http_1.createServer)((req, res) => {
        const parsedUrl = (0, url_1.parse)(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port);
    console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});

const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://www.japannetbank.co.jp/service/payment/web_all/csv_download.html"
  );

  const result = await page.evaluate(async () => {
    const down = async url => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.overrideMimeType("text/plain; charset=Shift_JIS");
      xhr.send();
      return xhr.responseText;
    };

    const a_tag = document.querySelector(
      "#contents > div.sec03 > ul > li:nth-child(1) > a"
    );
    const url = a_tag.href;
    const result = await down(url);
    return result;
  });

  fs.writeFileSync("./result.csv", result, { encoding: null });
})();

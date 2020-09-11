const puppeteer = require('puppeteer');
const IMDB_URL = (movie_id) => `https://www.imdb.com/title/${movie_id}/`;
const MOVIE_ID = `tt3042408`;

(async () => {
    /*initiate the puppeteer browser */
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    /*go to imdb movie page wait for it to load */
    await page.goto(IMDB_URL(MOVIE_ID), { waitUntil: 'networkidle0' });

    /*run javascript inside of the page */
    let data = await page.evaluate(() => {

        let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
        let duration = document.querySelector('time[datetime]').innerText;
        let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
        let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

        /*returning an object filled with the scraped data*/
        return {
            title,
            duration,
            rating,
            ratingCount
        }

    });

    /*output of the scraped result*/
    console.log(data);

    debugger;

    await browser.close();
})();
const router = require('express').Router();
const middlewares = require('./middlewares');
const cheerio = require('cheerio');

router.get('/api/html', middlewares.queryLink, middlewares.scrapedHtml, (req, res) => {
    const { html } = req;
    res.status(200).json(html);
});

router.get('/api/links', middlewares.queryLink, middlewares.scrapedHtml, (req, res) => {
    const { html } = req;
    const $ = cheerio.load(html);
    const scrapedUrls = [];
        
    $('a').each(function() {
        const title = $(this).text();
        const url = $(this).attr('href');
        
        if (/http/.test(url)) scrapedUrls.push({ title, url });
    });

    if (scrapedUrls == '') return res.status(404).json('There is no links on target url');
    res.status(200).json(scrapedUrls);
});

router.get('/api/images', middlewares.queryLink, middlewares.scrapedHtml, (req, res) => {
    const { html } = req;
    const $ = cheerio.load(html);
    const scrapedImages = [];

    $('img').each(function() {
        const image = $(this).attr('src');
        const alt = $(this).attr('alt');
        
        scrapedImages.push({ alt, image });
    });

    if (scrapedImages == '') return res.status(404).json('There is no images on target url');
    res.status(200).json(scrapedImages);
});

router.get('/api/videos', middlewares.queryLink, middlewares.scrapedHtml, (req, res) => {
    const { html } = req;
    const $ = cheerio.load(html);
    const scrapedVideos = [];

    $('video').each(function() {
        const video = $(this).attr('src');
        
        scrapedImages.push(video);
    });

    if (scrapedVideos == '') return res.status(404).json('There is no videos on target url');
    res.status(200).json(scrapedVideos);
});

module.exports = router;
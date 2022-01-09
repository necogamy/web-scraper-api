const router = require('express').Router();
const middlewares = require('./middlewares');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/api/html', middlewares.queryLink, middlewares.scrapedHtml, (req, res) => {
    const { html } = req;
    res.status(200).json(html);
});

router.get('/api/links', middlewares.queryLink, middlewares.scrapedHtml, (req, res) => {
    const { link } = req;

    axios(link)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const scrapedUrls = [];
        
            $('.fc-item__title', html).each(function() {
                const title = $(this).text();
                const url = $(this).find('a').attr('href');
                articles.push({
                    title,
                    url
                }); 
            });

            return res.status(200).json(scrapedUrls);
        }).catch(err => res.status(500).json(err));
});

router.get('/api/images', middlewares.queryLink, middlewares.scrapedHtml, (req, res) => {
    const { html } = req;

    return res.status(200).json(html);
});

module.exports = router;
const axios = require("axios");

const queryLink = (req, res, next) => {
    if (req.query && !req.query.link) return res.status(400).send('You must give to the api a valid link as query');
    
    req.link = req.query.link;
    next();
}

const scrapedHtml = (req, res, next) => {
    const { link } = req;

    try {
        axios(link)
            .then(response => {
                req.html = response.data;
                next();
            })
            .catch(error => res.status(500).json(error));
    } catch(e) {
        res.status(500).json(e);
    }
}

module.exports = {
    queryLink,
    scrapedHtml
}
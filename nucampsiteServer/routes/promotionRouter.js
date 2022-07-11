const express = require('express');
const Promotion = require('../models/promotion');
const promotionRouter = express.Router();

/* ------ Promotions Route ------*/
promotionRouter.route('/')
.get((req, res, next) => {
    Promotion.find()
    .then(promotionss => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotionss);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Promotion.create(req.body)
    .then(promotions => {
        console.log('promotions Created ', promotions);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403; // operation is not supported
    res.end('PUT operation not supported on /promotionss'); // send message and exit
})
.delete((req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

/* ------ promotionss Route Parameter ------*/
promotionRouter.route('/:promotionsId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionsId)
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotionss/${req.params.promotionsId}`);
})
.put((req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionsId, {
        $set: req.body
    }, { new: true })
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionsId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = promotionRouter;
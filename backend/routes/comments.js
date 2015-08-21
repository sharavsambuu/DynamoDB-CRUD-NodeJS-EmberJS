var express = require('express');
var uuid    = require('node-uuid');

module.exports = function(app, client) {
    var router = express.Router();
    router.get('/comments', function(req, res, next) {
        client.newScanBuilder('Comment')
        .execute()
        .then(function(data) {
            return res.status(200).json({"comments": data.result});
        })
        .fail(function(data) {
            return res.status(200).json({"comments": []});
        });
    });
    router.get('/comments/:hash', function(req, res, next) {
        client.getItem('Comment')
        .setHashKey('id', req.params.hash)
        .execute()
        .then(function(data) {
            return res.status(200).json({"comment": data.result});
        })
        .fail(function(data) {
            return res.status(200).json({"comment": {}});
        });
    });
    router.post('/comments', function(req, res, next) {
        var payload = req.body.comment;
        payload.id         = uuid.v1();
        payload.created_at = Date.now().toString();
        client.putItem('Comment', payload)
        .execute()
        .then(function(data) {
            return res.status(201).json({"comment": data.result});
        })
        .fail(function(data) {
            return res.status(204).json({});
        });
    });
    router.put('/comments/:hash', function(req, res, next) {
        var payload = req.body.comment;
        client.newUpdateBuilder('Comment')
        .setHashKey  ('id'        , req.params.hash    )
        .enableUpsert()
        .putAttribute('body'      , payload.body       )
        .execute()
        .then(function(data) {
            return res.status(200).json({"comment": data.result});
        });
    });
    router.delete('/comments/:hash', function(req, res, next) {
        client.deleteItem('Comment')
        .setHashKey('id', req.params.hash)
        .execute()
        .then(function(data) {
            return res.status(204).json({});
        })
        .fail(function(data) {
            console.log(data);
            return res.status(204).json({});
        });
    });
    app.use('/api/v1', router);
};

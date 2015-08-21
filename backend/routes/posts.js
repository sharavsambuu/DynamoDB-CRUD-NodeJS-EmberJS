var express = require('express');
var uuid    = require('node-uuid');

module.exports = function(app, client) {
    var router = express.Router();
    router.get('/posts', function(req, res, next) {
        client.newScanBuilder('Post')
        .execute()
        .then(function(data) {
            return res.status(200).json({"posts": data.result});
        })
        .fail(function(data) {
            return res.status(200).json({"posts": []});
        });
    });
    router.get('/posts/:hash', function(req, res, next) {
        client.getItem('Post')
        .setHashKey('id', req.params.hash)
        .execute()
        .then(function(data) {
            return res.status(200).json({"post": data.result});
        })
        .fail(function(data) {
            return res.status(200).json({"post": {}});
        });
    });
    router.post('/posts', function(req, res, next) {
        var payload = req.body.post;
        payload.id         = uuid.v1();
        payload.created_at = Date.now().toString();
        payload.updated_at = Date.now().toString();
        delete payload.comments;
        client.putItem('Post', payload)
        .execute()
        .then(function(data) {
            return res.status(201).json({"post": data.result});
        })
        .fail(function(data) {
            return res.status(204).json({});
        });
    });
    router.put('/posts/:hash', function(req, res, next) {
        var payload = req.body.post;
        payload.updated_at = Date.now().toString();
        client.newUpdateBuilder('Post')
        .setHashKey  ('id'        , req.params.hash    )
        .enableUpsert()
        .putAttribute('title'     , payload.title      )
        .putAttribute('body'      , payload.body       )
        .putAttribute('updated_at', payload.updated_at )
        .deleteAttribute('comments')
        .putAttribute('comments'  , payload.comments   )
        .execute()
        .then(function(data) {
            return res.status(200).json({"post": data.result});
        });
    });
    router.delete('/posts/:hash', function(req, res, next) {
        client.deleteItem('Post')
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

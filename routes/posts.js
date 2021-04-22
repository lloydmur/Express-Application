var express = require('express');
var router = express.Router();
var postModel = require('../public/models/post')

router.post('/', (req, res) => {
    var newPost = new postModel({
        title: req.body.title,
        content: req.body.content,
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    postModel.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect: '/posts'})
        })
        .catch((err) => console.log(err))
})


module.exports = router;
const express = require("express");
const router = express.Router()
const ObjID = require('mongoose').Types.ObjectId;
const user = require('../models/User')


router.get('/api/users', async (req, res) => {
    await user.find({}, function (err, users) {

        if (err) return console.log(err);
        res.send(users)
    });
})

router.get('/api/users/:id', (req, res) => {
    user.findOne({
        _id: req.params.id
    }, function (err, user) {
        if (err) return console.log(err);
        console.log(user)
        res.send(user)
    });
})



router.post('/api/users', async (req, res) => {
    if (req.body.name == "") req.body.name = "Anonim";
    const newUser = new user(req.body)
    console.log('req.body: ', req.body);
    await newUser.save()
        .then(result => {
            console.log(result)
            res.send(result)
        })
})

router.put('/api/users', async (req, res) => {
    let id = ObjID(req.body.id);
    const newUser = await user.updateOne({
        _id: id
    }, {
        $set: {
            id: id,
            name: req.body.name,
            comment: req.body.comment
        }
    });

    res.send(newUser)


})

router.delete('/api/users/:id', (req, res) => {

    user.deleteOne({
            _id: req.params.id
        })
        .then(result => {

            res.status(200).send(result)
        })
        .catch(e => {
            throw new Error(e);
        })
})

module.exports = router
const express = require('express');
const mongodb = require('mongodb');

const url = require("../url");
const client = mongodb.MongoClient
const router = express.Router();

router.post("/", (req, res) => {
    let uname = req.body.uname
    let upwd = req.body.upwd
    let obj = { uname, upwd }
    client.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db("miniprj")
            db.collection('users').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    if (array.length > 0)
                        res.json({ 'auth': 'success', 'user': uname })
                    else
                        res.json({ 'auth': 'failed' })
                    console.log('Auth response sent')
                    conn.close()
                }
            })
        }
    })
})

module.exports = router;
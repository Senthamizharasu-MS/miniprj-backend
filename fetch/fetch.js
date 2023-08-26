const express = require('express');
const mongodb = require('mongodb');

const url = require("../url");
const client = mongodb.MongoClient
const router = express.Router();

router.get('/', async (req, res) => {
    client.connect(url, (err, conn) => {
        if (err) {
            console.log("Error in connection ", err);
        }
        else {
            const db = conn.db("miniprj");
            db.collection("products").find().toArray((err, array) => {
                if (err) {
                    console.log("Error in fetching ", err);
                }
                else {
                    console.log("Data fetched successfully");
                    res.json(array);
                    conn.close();
                }
            })
        }
    })
})

router.get('/cart', async (req, res) => {
    let uname = req.query.uname;
    let obj = { uname };

    client.connect(url, (err, conn) => {
        if (err) {
            console.log("Error in connection ", err);
        }
        else {
            let db = conn.db("miniprj")
            db.collection('cart').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    res.json(array)
                    console.log(`Cart response for ${obj.uname} sent`)
                    conn.close()
                }
            })
        }
    })
})

module.exports = router;
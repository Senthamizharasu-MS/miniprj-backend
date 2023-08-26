const express = require('express');``
const mongodb = require('mongodb');

const url = require("../url");
const client = mongodb.MongoClient
const router = express.Router();

router.post('/', async (req, res) => {
    let obj = req.body;
    client.connect(url, (err, conn) => {
        if (err) {
            console.log("Error in connection ", err);
        }
        else {
            let db = conn.db("miniprj");
            db.collection("products").insertOne(obj, (err, result) => {
                if (err) {
                    res.json({ "insert": "Error in insertion" + err });
                    console.log(err);
                }
                else {
                    console.log("Data inserted successfully");
                    res.json({ "insert": "Data inserted successfully" });
                    conn.close();
                }
            })
        }
    })
})

router.post('/user', async (req, res) => {
    let obj = {
        "userid": req.body.userid,
        "uname": req.body.uname,
        "upwd": req.body.upwd,
        "address": req.body.address,
        "contact": req.body.contact
    }
    client.connect(url, (err, conn) => {
        if (err) {
            console.log("Error in connection ", err);
        }
        else {
            let db = conn.db("miniprj");
            db.collection("users").insertOne(obj, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({ "insert": "Error in insertion" + err });
                }
                else {
                    console.log("Data inserted successfully");
                    res.json({ "insert": "Data inserted successfully" });
                    conn.close();
                }
            })
        }
    })
})

router.post('/cart', async (req, res) => {
    let obj = {
        "p_id": req.body.p_id,
        "p_cost": req.body.p_cost,
        qty: 1,
        "p_img": req.body.p_img,
        "uname": req.body.uname
    }
    client.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection :- ', err)
        else {
            let db = conn.db("miniprj")
            db.collection('cart').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'cartInsert': 'Error ' + err })
                else {
                    console.log("Prouct in Cart inserted")
                    res.json({ 'cartInsert': 'success' })
                    conn.close()
                }
            })
        }
    })
})


module.exports = router;


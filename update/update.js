const express = require('express');
const mongodb = require('mongodb');

const url = require("../url");
const client = mongodb.MongoClient
const router = express.Router();

router.post('/', async (req, res) => {
    let p_id = req.body.p_id;
    let obj = {
        // "p_name": req.body.p_name,
        "p_cost": req.body.p_cost
    }
    client.connect(url, (err, conn) => {
        if (err) {
            console.log("Error in connection ", err);
        }
        else {
            let db = conn.db("miniprj");
            db.collection("products").updateOne({ p_id }, { $set: obj }, (err, result) => {
                if (err) {
                    res.json({ "update": "Error in updation" + err });
                }
                else {
                    if (result.modifiedCount != 0) {
                        console.log("Data updated successfully");
                        res.json({ "update": "Data updated successfully" });
                    }
                    else {
                        console.log("Data not found");
                        res.json({ "update": "Data not found" });
                    }
                    conn.close();
                }
            })
        }
    })
})

router.post('/cart', async (req, res) => {
    let uname = req.body.uname;
    let p_id = req.body.p_id;
    let obj = { "qty": req.body.qty }

    client.connect(url, (err, conn) => {
        if (err) {
            console.log("Error in connection ", err);
        }
        else {
            let db = conn.db("miniprj");
            db.collection("cart").updateOne({ uname, p_id }, { $set: obj }, (err, result) => {
                if (err) {
                    res.json({ "cartUpdate": "Error in updation" + err });
                }
                else {
                    if (result.matchedCount != 0) {
                        console.log(`Cart data is updated for ${uname}`)
                        res.json({ 'cartUpdate': 'Data updated successfully' })
                    }
                    else {
                        console.log(`Record not updated`)
                        res.json({ 'cartUpdate': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})

router.post('/user', async (req, res) => {
    let userid = req.body.p_id;
    let obj = {
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
            db.collection("user").updateOne({ userid }, { $set: obj }, (err, result) => {
                if (err) {
                    res.json({ "update": "Error in updation" + err });
                }
                else {
                    if (result.modifiedCount != 0) {
                        console.log("User Data is updated successfully");
                        res.json({ "update": "Data updated successfully" });
                    }
                    else {
                        console.log("Data not found");
                        res.json({ "update": "Data not found" });
                    }
                    conn.close();
                }
            })
        }
    })
})


module.exports = router;
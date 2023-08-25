const express = require('express');
const mongodb = require('mongodb');

const url = require("../url");
const client = mongodb.MongoClient
const router = express.Router();

router.post('/', async (req, res) => {
    let p_id = req.body.p_id;
    let obj = {
        "p_name": req.body.p_name,
        "p_cost": req.body.p_cost
    }
    client.connect(url, (err, conn) => {
        if (err) {
            console.log("Error in connection ", err);
        }
        else {
            let db = conn.db("nodedb");
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

module.exports = router;
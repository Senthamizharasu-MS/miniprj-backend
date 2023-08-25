const express = require('express');
const mongodb = require('mongodb');

const url = require("../url");
const client = mongodb.MongoClient
const router = express.Router();

router.post('/', async (req, res) => {
    let obj = req.body;
    client.connect(url, (err, conn) => {
        if(err){
            console.log("Error in connection ", err);
        }
        else{
            let db = conn.db("nodedb");
            db.collection("products").insertOne(obj, (err, result) => {
                if(err){
                    res.json({"insert": "Error in insertion" + err});
                }
                else{
                    console.log("Data inserted successfully");
                    res.json({"insert": "Data inserted successfully"});
                    conn.close();
                }
            })
        }
    })
})

module.exports = router;
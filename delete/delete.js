const express = require('express');
const mongodb = require('mongodb');

let url = require("../url");
const client = mongodb.MongoClient
const router = express.Router();

router.post("/", (req, res) => {
    let obj = {
        "p_id": req.body.p_id
    }

    client.connect(url, (err, conn) => {
        if (err){
            console.log('Error in connection :- ', err)
        }
        else {
            let db = conn.db('miniprj')
            db.collection('products').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'delete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log('Data deleted')
                        res.json({ 'delete': 'success' })
                    }
                    else {
                        console.log('Data Not deleted')
                        res.json({ 'delete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})

router.post('/cart', async (req, res) => {
    let obj = { 
        "p_id": req.body.p_id, 
        "uname": req.body.uname 
    }

    client.connect(url, (err, conn) => {
        if(err){
            console.log('Error in connection :- ', err)
        }
        else {
            let db = conn.db('miniprj')
            db.collection('cart').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'delete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log('Data deleted')
                        res.json({ 'delete': 'Cart data deleted successfully' })
                    }
                    else {
                        console.log('Data Not deleted')
                        res.json({ 'delete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})

router.post('/user',async(req, res) => {
    let obj = {
        "userid": req.body.userid
    }

    client.connect(url, (err, conn) => {
        if(err){
            console.log('Error in connection :- ', err)
        }
        else {
            let db = conn.db('miniprj')
            db.collection('users').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'delete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log('Data deleted')
                        res.json({ 'delete': 'User data deleted successfully' })
                    }
                    else {
                        console.log('Data Not deleted')
                        res.json({ 'delete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})


module.exports = router;

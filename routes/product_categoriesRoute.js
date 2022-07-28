const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM product_categories", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.post('/', (req, res)=> {
const { 
    product_category_id, 
    product_id,
    category_id,
} = req.body    
try {
    con.query(
        `INSERT INTO product_categories ( product_category_id,product_id,category_id) 
        values
         ('${product_category_id}', '${product_id}','${category_id }') `, 
    (err, result) => {
        if (err) throw err;
        res.send(result);
    });
} catch (error) {
    console.log(error)
    
}
});

module.exports = router;
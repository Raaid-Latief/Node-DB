const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM categories", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.post('/', (req, res)=> {
const {category_id, 
    name, 
    description, 
    thumbnail, 
} = req.body    
try {
    con.query(
        `INSERT INTO categories (category_id,name,description,thumbnail) values ('${category_id}','${name}', '${description}', '${thumbnail}') `, 
    (err, result) => {
        if (err) throw err;
        res.send(result);
    });
} catch (error) {
    console.log(error)
    
}
});


// delete//

exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Tutorial with id " + req.params.id
          });
        }
      } else res.send({ message: `Tutorial was deleted successfully!` });
    });
  };

module.exports = router;
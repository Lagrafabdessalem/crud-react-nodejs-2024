import express from "express"
import mysql from "mysql"
import cors from "cors"

 const app = express();

app.use(cors())
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"2001",
    database:"crud"
});

app.get("/", (req, res) => {
    res.json("This is home page")
})

app.get("/products", (req, res) => {
    const q = "SELECT * FROM crud.products";
    db.query(q, (err, data) => {
        if (err) return console.log(err);
            return res.json(data);
    })
})



app.post("/products", (req, res) => {
    const q = "INSERT INTO `crud`.`products`(`id`,`name`,`price`) VALUES (?)"
    const values = 
    [
        req.body.id,
        req.body.name,
        req.body.price
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.json("Error connected to database");
            return res.json(data);
    })
})


app.put("/products/:id", (req, res) => {
    const productId = req.params.id;
    const q = "UPDATE `crud`.`products` SET `id` = ? , `name` = ?, `price` = ? WHERE id = ?"
    const values = 
    [
        req.body.id,
        req.body.name,
        req.body.price
    ]
    db.query(q, [...values, productId], (err, data) => {
        if (err) return res.json(err);
            return res.json(data);
    })
})
app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;
    const q = "DELETE FROM `crud`.`products` WHERE id = ?";
    db.query(q, [productId], (err, data) => {
        if (err) return console.log(err);
            return res.json(data);
    })
})
app.listen(4000, () => {
    console.log("hello")
})


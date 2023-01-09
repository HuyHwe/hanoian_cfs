const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const {Client} = require('pg');
const e = require('express');

__dirname += "/../"
const PORT = process.env.PORT || 5500;
const client = new Client({
    host: "ec2-44-194-4-127.compute-1.amazonaws.com",
    user: "ggfuetdphnkznr",
    port: 5432,
    password: "26a4000dd4191d1641d11d963309f1717fc5e16d6e5bd78ce32a37a66aaeed2b",
    database: "dbvf991ujkjv9e",
    ssl: {
        require: true, // This will help you. But you will see new error
        rejectUnauthorized: false // This line will fix new error
      }
});

client.connect();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use("/", express.static(__dirname + '/assets'));
app.use("/", express.static(__dirname + '/views'));
app.get('/index/', (req, res, next) => {
    res.render('index')
})
app.post('/index/', (req, res, next) => {
    let cfs = `${req.body.cfs}`;
    cfs = cfs.replaceAll(`'`, `''`);
    client.query(`INSERT INTO quotes(cfs) VALUES ('${cfs}')`, (error, resolve) => {
        if (error) {
            console.log(error);
            res.render('error')
        } else {
            res.render('thanks')
        }
    })
})
app.get('/listen', (req, res, next) => {
    client.query(`SELECT id FROM quotes`)
            .then((resolve) => {
                const idList = resolve.rows
                const id = idList[Math.floor(Math.random()*idList.length)].id;
                client.query(`SELECT cfs FROM quotes WHERE id = ${id}`)
                        .then(resolve => {
                            res.render('listen', {data: {quote: resolve.rows[0], id: id}});
                        })
                        .catch(e => console.log(e))
            })
})

app.listen(PORT, () => {
    console.log('listening to port: ' + PORT);
})

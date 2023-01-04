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

app.use(bodyParser.urlencoded({extended:true}))
app.use("/assets", express.static(__dirname + '/assets'));
app.get('/assets/index/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'assets/index.html'));

})
app.post('/assets/index/', (req, res, next) => {
    const cfs = req.body.cfs
    client.query(`INSERT INTO quotes(cfs) VALUES ('${cfs}')`, (error, resolve) => {
        if (error) {
            console.log(error);
            res.sendFile(path.join(__dirname + 'assets/error.html'));
        } else {
            res.sendFile(path.join(__dirname+'assets/thanks.html'));      
        }
    })
})


app.listen(PORT, () => {
    console.log('listening to port: ' + PORT);
})

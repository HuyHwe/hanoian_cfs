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
app.get('/index/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'assets/index.html'));

})
app.post('/index/', (req, res, next) => {
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
app.get('/listen', (req, res, next) => {
    let quote, min, max;
    client.query(`SELECT MAX(id) FROM quotes`)
            .then(resolve => {
                const max = resolve.rows[0].max;
                client.query(`SELECT MIN(id) FROM quotes`)
                        .then(resolve => {
                            const min = resolve.rows[0].min;
                            const dif = max - min;
                            const id = Math.floor(min+Math.random()*dif)
                            console.log(min,max,dif,id);
                            client.query(`SELECT cfs FROM quotes WHERE id = ${id}`)
                                    .then(resolve => {
                                        res.render('listen', {data: {quote: resolve.rows[0]}});
                                    })
                                    .catch(e => console.log(e))
                        })
                        .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    console.log(min, max);
    
})

app.listen(PORT, () => {
    console.log('listening to port: ' + PORT);
})

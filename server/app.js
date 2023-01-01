const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
__dirname = 'D:/MyWebScript/Cfs/'

const PORT = process.env.PORT || 5500;

app.use(bodyParser.urlencoded({extended:true}))
app.use("/assets", express.static(__dirname + '/assets'));
app.get('/assets/index/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'assets/index.html'));

})
app.post('/assets/index/', (req, res, next) => {
    console.log(req.body.cfs);
    res.send("oke")
})


app.listen(PORT, "127.0.0.1", () => {
    console.log('listening to port: ' + PORT);
})
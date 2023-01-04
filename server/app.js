const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
__dirname = 'app/'

const PORT = process.env.PORT || 5500;

app.use(bodyParser.urlencoded({extended:true}))
app.use("/assets", express.static(__dirname + '/assets'));
app.get('/assets/index/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'assets/index.html'));

})
app.post('/assets/index/', (req, res, next) => {
    console.log(req.body.cfs);
    res.sendFile(path.join(__dirname+'assets/thanks.html'));
})


app.listen(PORT, () => {
    console.log('listening to port: ' + PORT);
})

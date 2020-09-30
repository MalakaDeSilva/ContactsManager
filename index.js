const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require("fs");
const Bundler = require("parcel-bundler");
const bundler = new Bundler('./public/index.html');

const auth = require('./auth/auth');
const controller = require('./controller/operations');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req,res)=>{
    const url = auth.getAuthUrl();
    res.redirect(url)
})

app.get('/auth', (req,res)=>{
    let params = parseParams(req)
    auth.storeToken(params['code'])
    res.redirect('/home');
})

app.get('/contacts', (req, res) => {
    let response = null
    let authObj = auth.authorize();
    setTimeout(() => {
        let result = controller.listConnectionNames(authObj)
        result.then((data) => {
            response = data
            res.json(response);
        })
    }, 4000);
});

app.post('/new-contact', (req, res) => {
    let contact = req.body
    let response = null
    fs.readFile('credentials.json', (err, content) => {
        let authObj = auth.authorize();
        setTimeout(() => {
            let result = controller.insertContact(authObj, contact)
            result.then((data) => {
                response = data
                res.json(response);
            })
        }, 2000);

    });
})


app.use(bundler.middleware());

app.use(express.static('./dist'));

app.get('/home', (req, res) => {
    res.sendFile('./dist/index.html');
});

function parseParams(req){
    let q=req.url.split('?'),result={};
    if(q.length>=2){
        q[1].split('&').forEach((item)=>{
             try {
               result[item.split('=')[0]]=item.split('=')[1];
             } catch (e) {
               result[item.split('=')[0]]='';
             }
        })
    }
    return result;
  }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
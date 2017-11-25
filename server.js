const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs')
app.use(express.static(__dirname+'/public-assest'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log('server log : ',log);

    fs.appendFileSync('server.log',log + '\n');
    next();
});

// app.use((req,res,next) => {
//     res.render('outage.hbs');
//     next();
// });

app.get('/',(req,res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name : 'kshitij',
    //     body : 'muscular',
    //     datte : 'soon'
    // })

    res.render('home.hbs',{
        task : 'tu tak tu tak',
        currentYear : new Date().getFullYear()
    })
});

app.get('/about', (req,res)=>{
    // res.send('About PAge');
    res.render('about.hbs',{
        body : 'awsome',
        pageTitle : 'Master Kshitij',
        currentYear : new Date().getFullYear()
    })
});

app.get('/bad',(req,res) => {
    res.send({
        error : 'Boht bhayankar'
    })
})

app.listen(3000);
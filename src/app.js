const path = require('path');  //core node module
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast= require('./utils/forecast.js');

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname,'../public'));

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
const port = process.env.PORT || 3000;
//setup handlebars engine and view location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('/index',(req,res)=>{

    res.render('index',{
        title: 'Weather App',
        name : 'Andrew Mead'
    });
});
//app.com
//app.com/help
//app.com/about

app.get('',(req,res)=>{
    // res.send('Hello Express');
    res.render('index',{
        title:'Weather',
        name : 'Andrew Mead'
    });
});

app.get('/help',(req,res)=> {
    res.render('help', {
        title : 'Help',
        helpText: 'This is helpful text',
        name : 'Andrew Mead'
    });
});



app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
});



app.get('/weather',(req,res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        });
    }
    // console.log(req.query);
    // console.log(req.query.address);
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
            // res.send({
            //     forecast : '50 degress',
            //     location : 'Philadelphia',
            //     address : req.query.address
        });
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query);
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help Article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('server is up on port ' + port);
});

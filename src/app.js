const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manan Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Manan Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some Helpful Text',
        title: 'Help',
        name: 'Manan Sharma'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({ 
            error: "please enter a location"
        }) 
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })  
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manan Sharma',
        errorMessage: '404 Help Article not Found'
    }) 
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manan Sharma',
        errorMessage: '404 Page not Found'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})
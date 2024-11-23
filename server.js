const express = require('express')
const path = require('path')
const app = express();
const port = 3000;

// Hour check middleware
function workingHours(req, res, next) {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();

    if (day >= 1 && day <= 6 && hours >= 6 && hours < 17) {
        next(); // next route in work hours
    } else {
        res.send('Sorry, the web application is only available Monday to Friday, from 9 to 17.')
    }
}

// Use middleware for all routes
app.use(workingHours);

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join('Check_ExpressJS')));

// Routes for all pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/homePage.html')); // Home page
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname + '/ourServices.html')); // Services page
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname + '/contactUs.html')); // Contact page
});

// Launch server
app.listen(port, () => {
    console.log('Server is running on http://localhost:3000/');
});
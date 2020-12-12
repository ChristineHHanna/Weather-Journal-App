// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express= require('express');

// Start up an instance of app
const app= express();

/* Middleware*/
const bodyParser= require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/all', (req,res) =>{
    res.send(projectData);
    console.log(projectData);
})


// POST method route
app.post('/addData', (request, response) => {
    projectData.temp = request.body.temp;
    projectData.date = request.body.date;
    projectData.feeling = request.body.feeling;
    //response.send('POST received')
});



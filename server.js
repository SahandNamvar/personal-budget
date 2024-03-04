// Express, Mongoose

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');

// Use CORS middleware
app.use(cors());
app.use(cors({ origin: '*' }));

// Middleware to parse JSON bodies
app.use(express.json());

// Route to serve static content located inside the public folder
app.use('/', express.static('public'));

// MongoDB Connection URI
const uri = 'mongodb://localhost:27017/personalBudget_db';

// Data schema definition
const budgetSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    budget: { type: Number, required: true, unique: true },
    colorCode: { 
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                // Check if the color code matches hexadecimal format with at least 6 characters
                return /^#[0-9A-Fa-f]{6,}$/.test(value);
            },
            message: function(props) {
                return props.value + ' is not a valid color code. It must be in hexadecimal format with at least 6 characters (including \'#\').';
            }
        }
    }
});

// Define the Budget model with explicit collection name
const Budget = mongoose.model('Budget', budgetSchema, 'budgetData');

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function() {
        console.log('\nConnected to MongoDB from -> server.js');
        // Start the server after connecting to the database
        app.listen(port, function() { // TODO: Optimize
            console.log('Server Listening on Port:', port);
        });
    })
    .catch(function(error) {
        console.error('Error connecting to MongoDB:', error);
    });

// Route to retrieve budget data
/*

GET Requests:
Ideal for retrieving data from the server without causing any side effects or modifying the state of the server or the data.
Considered idempotent, meaning that making the same request multiple times should have the same effect as making it once.
Responses to GET requests are cacheable by default, which can improve performance by serving cached responses.
Provides a uniform interface and aligns with RESTful API principles, making it easier for clients to understand and interact with the API.
Generally used for safe operations that only retrieve information.

*/
app.get('/budget', async function(req, res) {
    try {
        // Find and return budget data - array of documents
        const budgetData = await Budget.find({});

        // If there is no data, send an empty response
        if (!budgetData || budgetData.length === 0) {
            return res.status(404).json({ error: 'No budget data found' });
        }

        // Logging the title, budget, and colorCode for each document
        console.log('\nBudget Data:')
        budgetData.forEach(function(item) {
            console.log('Title:', item.title);
            console.log('Budget:', item.budget);
            console.log('Color Code:', item.colorCode);
            console.log('-------------------------');
        });

        // Send response object to localhost:3000/budget -> { myBudget: [ {title: str, budget: num, colorCode: str }, {title: str, budget: num, colorCode: str }, ... ] } -> {myBudget: [array of docs]}
        res.json({ myBudget: budgetData });

    } catch (error) {
        console.error('Error fetching budget data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add new data to the budget collection
/*

POST Requests:
Typically used for creating new resources or submitting data to be processed by the server.
Not idempotent, meaning that making the same request multiple times may have different effects each time.
Responses to POST requests are not cacheable by default.
Less suitable for retrieving data, as it does not align with RESTful API conventions and may lead to confusion for clients.
Generally used for operations that modify the state of the server or the data.

*/
app.post('/budget/add', async function(req, res) {
    try {
        const newData = req.body; // Extract new data from request body

        // Check if all required fields are present
        if (!newData.title || !newData.budget || !newData.colorCode) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate color format (must be in the format #XXXXXX)
        if (!/^#[0-9A-F]{6}$/i.test(newData.colorCode)) {
            return res.status(400).json({ error: 'Invalid color format. Color must be in the format #XXXXXX' });
        }

        // Insert new data into the budget collection
        const result = await Budget.create(newData);
        res.json({ message: 'Data added successfully', data: result });
    } catch (error) {
        // Check if the error is due to a uniqueness constraint violation
        if (error.name === 'MongoError' && error.code === 11000) {
            // Log a message or return an appropriate response indicating that the data is not unique
            /*
            error code 11000 in MongoDB typically indicates a duplicate key error.
            */
            console.error('Error adding data: Duplicate entry');
            return res.status(409).json({ error: 'Duplicate entry. Data already exists' });
        }
        // For other errors, return an Internal Server Error response
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});

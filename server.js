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
    title: { type: String, required: true },
    budget: { type: Number, required: true },
    colorCode: { 
        type: String, 
        required: true,
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
        console.log('Connected to MongoDB');
        // Start the server after connecting to the database
        app.listen(port, function() {
            console.log('Server is listening on port', port);
        });
    })
    .catch(function(error) {
        console.error('Error connecting to MongoDB:', error);
    });

// Route to retrieve budget data
app.get('/budget', async function(req, res) {
    try {
        // Find and return budget data
        const budgetData = await Budget.find({});
        res.json({ myBudget: budgetData });
    } catch (error) {
        console.error('Error fetching budget data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add new data to the budget collection
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
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
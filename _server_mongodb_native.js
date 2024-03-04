// Native Mongodb driver

// NodeJS
const express = require('express'); // Import Express
const app = express();
const port = 3000;
const cors = require('cors'); // Import CORS middleware
const { MongoClient } = require('mongodb'); // Import MongoClient

// Use CORS middleware
app.use(cors());
app.use(cors({ origin: '*' }));

// Middleware to parse JSON bodies
app.use(express.json());

// Route to serve static content located inside the public folder
app.use('/', express.static('public'));

// MongoDB Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'personalBudget_db';

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to MongoDB and define route handlers
async function main() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to the MongoDB server');

        // Access the database
        const db = client.db(dbName);

        // Get reference to the budget collection
        const budgetCollection = db.collection('budgetData');

        // Find and print budget data
        const budgetData = await budgetCollection.find({}).toArray();
        console.log('Budget data:');
        for (let i = 0; i < budgetData.length; i++) {
            const item = budgetData[i];
            console.log(item.title, item.budget, item.colorCode);
        }

        // Route to retrieve budget data
        app.get('/budget', async (req, res) => {
            try {
                // Return budget data as JSON response
                res.json({ myBudget: budgetData });
            } catch (error) {
                console.error('Error fetching budget data:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        // Route to add new data to the budget collection --> Tested using Postman
        app.post('/budget/add', async (req, res) => {
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
                const result = await budgetCollection.insertOne(newData);
                res.json({ message: 'Data added successfully', data: result.ops });
            } catch (error) {
                console.error('Error adding data:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        // Start the server
        app.listen(port, () => {
            console.log('Server is listening on port', port);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the main function
main();

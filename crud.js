const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'personalBudget_db';

// Create a new MongoClient
const client = new MongoClient(uri);

// Data to insert - budget_data
const budgetData = {
    'myBudget': [
        { 'title': 'Dining', 'budget': 40, 'colorCode': '#FF5733' },
        { 'title': 'Rent', 'budget': 450, 'colorCode': '#33FFCC' },
        { 'title': 'Grocery', 'budget': 120, 'colorCode': '#FF3399' },
        { 'title': 'Transportation', 'budget': 50, 'colorCode': '#66FF33' },
        { 'title': 'Utilities', 'budget': 80, 'colorCode': '#9966FF' },
        { 'title': 'Medical', 'budget': 100, 'colorCode': '#FFCC33' },
        { 'title': 'Insurance', 'budget': 95, 'colorCode': '#3399FF' },
        { 'title': 'Personal', 'budget': 40, 'colorCode': '#FF3366' },
        { 'title': 'Education', 'budget': 35, 'colorCode': '#33FF99' },
        { 'title': 'Entertainment', 'budget': 30, 'colorCode': '#FF9933' }
    ]
};

async function main() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to the MongoDB server');

        // Access the database
        const db = client.db(dbName);

        // Get reference to the collection
        const collection = db.collection('budgetData');

        // Insert budget data
        const insertBudgetResult = await collection.insertMany(budgetData.myBudget);
        console.log('Inserted budget data:', insertBudgetResult.insertedIds);

        // Find documents
        const findResult = await collection.find({}).toArray();
        console.log('Found documents:', findResult);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        await client.close();
        console.log('Disconnected from the MongoDB server');
    }
}

async function retrieve() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to the MongoDB server');

        // Access the database
        const db = client.db(dbName);

        // Get reference to the budget collection
        const budgetCollection = db.collection('testing_myBudgetData');

        // Find and print budget data
        const budgetData_retrieve = await budgetCollection.find({}).toArray();
        console.log('Budget data:');
        for (let i = 0; i < budgetData_retrieve.length; i++) {
            const item = budgetData_retrieve[i];
            console.log(item.title, item.budget);
        }

        // Get reference to the colors collection
        const colorsCollection = db.collection('testing_myColorsData');

        // Find and print colors data
        const colorsData_retrieve = await colorsCollection.find({}).toArray();
        console.log('Colors data:');
        for (let i = 0; i < colorsData_retrieve.length; i++) {
            const item = colorsData_retrieve[i];
            console.log(item.colorCode);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        await client.close();
        console.log('Disconnected from the MongoDB server');
    }
}

// Run the retrieve function
//retrieve();


// Run the main function
main();

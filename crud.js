// Mongoose

const mongoose = require('mongoose');

// Connection URI
const uri = 'mongodb://localhost:27017/personalBudget_db';

// Data schema definition with validations
/* 
Schema - Blueprint that defines the structure of documents within a MongoDB collection.
    It specifies the fields that documents in the collection can have and the type of data each field can contain.
*/
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

/*

Model Creation:
The mongoose.model() method is used to define a model for a MongoDB collection.
It takes three arguments:
The first argument ('Budget') is the name of the model. It's used to identify the model within your application.
The second argument (budgetSchema) is the schema definition for the documents in the collection. It defines the structure and validation rules for the data.
The third argument ('budgetData') is the name of the MongoDB collection to which the model corresponds. If the collection doesn't exist, Mongoose will create it when you start inserting documents using this model.

Purpose:
This line of code creates a Mongoose model named Budget.
The model is associated with the MongoDB collection named budgetData.
It allows you to perform CRUD operations on documents in the budgetData collection using methods provided by Mongoose, such as find, create, update, and delete.

Usage:
You can use the Budget model to interact with documents in the budgetData collection. For example:
Budget.find({ - query conditions - }): Retrieves documents from the collection based on specified conditions.
new Budget({ - document data - }).save(): Creates and saves a new document to the collection --> document data passed in must match the schema defined.
Other CRUD operations can also be performed using methods provided by the Budget model.

 >>>> A constructor function that allows us to interact with a specific MongoDB collection based on a defined schema

 */
// Define a Budget model with explicit collection name
const Budget = mongoose.model('Budget', budgetSchema, 'budgetData');

// Data to insert - personalBudget_db >> budgetData
/*
    Could retrieve from budget_data.json, instead of local object here.
*/
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
        { 'title': 'Entertainment', 'budget': 30, 'colorCode': '#FF9933' },
    ]
};

async function main() {
    try {
        // Connect to the MongoDB server
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('\nConnected to the MongoDB server from -> crud.js');

        // Insert budget data - passing an array of objects, each object is a document
        const insertBudgetResult = await Budget.insertMany(budgetData.myBudget);
        console.log('Inserted budget data:', insertBudgetResult);

        // Find documents
        const findResult = await Budget.find({});
        console.log('Found documents:', findResult);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('Disconnected from the MongoDB server');
    }
}

// Run the main function
main();
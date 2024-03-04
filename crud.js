// Mongoose

const mongoose = require('mongoose');

// Connection URI
const uri = 'mongodb://localhost:27017/personalBudget_db';

// Data schema definition with validations
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

// Define a Budget model with explicit collection name
const Budget = mongoose.model('Budget', budgetSchema, 'budgetData');

// Data to insert - personalBudget_db >> budgetData
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
        console.log('Connected to the MongoDB server');

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
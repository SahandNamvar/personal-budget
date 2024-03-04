# Personal Budget Web App - MongoDB, Express, NodeJS

## Express & Mongoose Budget Management API (`server.js`)

A RESTful API using Express.js and Mongoose for managing budget data. The script sets up an Express.js server to handle CRUD (create, read, update, delete) operations on a MongoDB database using Mongoose as the ODM (Object Data Modeling) tool.

### **Code Breakdown Notes**
- RESTful API: Standardized interface for interacting with budget data through HTTP methods.
- Validation: Mongoose schema and middleware for validating incoming data to ensure consistency and integrity.
- Error Handling: Error handling mechanisms to gracefully handle exceptions and provide informative responses.
- Middleware: Express middleware for enabling CORS (Cross-Origin Resource Sharing) and parsing JSON requests.

#### Setting Up the Server

The script initializes an Express application (`app`) and sets up middleware to enable CORS and parse JSON bodies in incoming requests. CORS middleware is essential for allowing cross-origin requests, facilitating communication between the client-side application and the server.

#### Connecting to MongoDB

The script establishes a connection to MongoDB using Mongoose, a MongoDB object modeling tool. The connection URI (`uri`) specifies the location of the MongoDB server and the name of the database (`personalBudget_db`). Upon successful connection, the Express server starts listening on the specified port (`3000`).

#### Defining the Data Schema

The script defines a Mongoose schema (`budgetSchema`) to structure the budget data stored in the MongoDB database. The schema defines three fields:

1. `title`: A string representing the title or name of the budget item.
2. `budget`: A numerical value indicating the budget allocated for the item.
3. `colorCode`: A string representing the color code associated with the item, validated against a hexadecimal format.

#### Creating the Budget Model

Using the defined schema, the script creates a Mongoose model (`Budget`) to interact with the MongoDB collection named `'budgetData'`. The model encapsulates methods for performing CRUD operations on budget data.

#### Handling GET Requests

The script defines a route (`/budget`) to handle HTTP GET requests for retrieving budget data. Upon receiving a GET request, the server queries the MongoDB collection using the `find()` method and returns the retrieved data as a JSON response.

#### Handling POST Requests

Another route (`/budget/add`) is defined to handle HTTP POST requests for adding new data to the budget collection. When a POST request is received, the server validates the incoming data against the schema requirements. If the data is valid, it creates a new document in the MongoDB collection using the `create()` method and returns a success message.

### Prerequisites

- Node.js installed
- MongoDB server running locally on default port 27017 (`mongod || brew services start mongodb/brew/mongodb-community`)
- Required Node.js packages installed: (` npm install express, cors, mongoose`)

### Usage

To use the Express and Mongoose Budget Management API:

1. Ensure MongoDB is running locally.
2. Install dependencies: `npm install`.
3. Run the script: `node server.js`.
4. Access the API endpoints using tools like cURL, Postman, or a web browser.
<hr>


## Mongoose Budget Data Insertion and Retrieval (`crud.js`)

This script uses Mongoose, MongoDB object modeling tool for Node.js, to perform CRUD (Create, Read, Update, Delete) operations on a MongoDB database.

### **Code Breakdown Notes**

#### Connection URI

The `uri` variable defines the connection URI to the MongoDB server. It specifies the protocol (`mongodb://`), host (`localhost`), port (`27017`), and database name (`personalBudget_db`).

#### Data Schema Definition

The `budgetSchema` variable defines the schema for the budget data. It specifies the structure of each document in the `budgetData` collection, including the `title`, `budget`, and `colorCode` fields. Additionally, it includes validation rules for the `colorCode` field using a custom validator function.

#### Budget Model

The `Budget` model is created using `mongoose.model()`, specifying the model name, schema, and collection name. This model represents the `budgetData` collection in the MongoDB database.

#### Budget Data

The `budgetData` object contains an array of budget objects, each representing a document to be inserted into the `budgetData` collection.

#### Main Function

The `main()` function is an asynchronous function that serves as the entry point for executing the script. It performs the following tasks:

1. Connects to the MongoDB server using `mongoose.connect()`.
2. Inserts the budget data into the `budgetData` collection using `Budget.insertMany()`.
3. Retrieves all documents from the `budgetData` collection using `Budget.find()`.
4. Logs the inserted budget data and retrieved documents to the console.
5. Closes the MongoDB connection using `mongoose.connection.close()`.

### Prerequisites

- Node.js installed
- MongoDB server running locally on the default port 27017 (`mongod || brew services start mongodb/brew/mongodb-community`)
- Mongoose npm package installed (`npm install mongoose`)

### Usage

1. Ensure MongoDB is running locally.
2. Install dependencies: `npm install`.
3. Run the script: `node crud.js`.

#### Output

- The script outputs messages indicating the connection status, insertion of budget data, and retrieval of documents.
- Inserted budget data and retrieved documents are logged to the console.
- Any errors encountered during execution are logged to the console as well.
<hr>

# Budget Visualization with Node.js, Express, and MongoDB (`script.js`)

This script fetches budget data from a server using Axios, populates a data source object, and creates visualizations using Chart.js and D3.js.

### **Code Breakdown Notes**

The script consists of the following components:

1. **Data Source Object**: 
   - Initializes an object named `dataSource` containing datasets for Chart.js visualizations.
   - The datasets include arrays for data values, background colors, and labels.

2. **createChart Function**:
   - Creates a new instance of a pie chart using Chart.js.
   - Passes the `dataSource` object as the chart's data source.

3. **getBudget Function**:
   - Uses Axios to make an HTTP GET request to the `/budget` route on the server.
   - Retrieves budget data from the server's response.
   - Populates the `dataSource` object with budget data fetched from the server.
   - Calls the `createChart` function to generate the pie chart.
   - Calls the `createDonutChart` function to create a donut chart using D3.js.

4. **createDonutChart Function**:
   - Checks if the donut chart already exists on the page.
   - If not, creates a new SVG element for the donut chart using D3.js.
   - Defines the dimensions and positioning of the donut chart.
   - Defines the arc and pie functions for creating the chart segments.
   - Appends paths for each data element in the pie chart.
   - Configures hover event listeners to display tooltips with data details.

5. **Commented Code for Adding New Budget Entries**:
   - Provides a commented-out function (`addNewBudgetEntry`) for adding new budget entries via a POST request to the server.
   - Demonstrates the usage of the function with an example and error handling.

### Prerequisites

- Node.js installed
- Server running on `http://localhost:3000` providing budget data
- Required Node.js packages installed: `Axios, Chart.js, D3.js`

### Usage

1. Ensure the server providing budget data is running.
2. Install dependencies: `npm install`.
3. Run the script: `node script.js`.
4. Access the HTML page containing the visualizations in a web browser.

#### Output

- The script fetches budget data from the server using Axios.
- Chart.js creates a pie chart based on the fetched data.
- D3.js creates a donut chart with interactive tooltips.
- Budget data retrieved from the server is visualized in the charts.
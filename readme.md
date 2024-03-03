### Data Visualization with NodeJS, Express and MongoDB

# MongoDB Budget Data Insertion and Retrieval (crud.js)

This script connects to a MongoDB server, inserts budget data into a database, and retrieves the data.

## Prerequisites

- Node.js installed
- MongoDB server running locally on default port 27017 (`brew services start mongodb/brew/mongodb-community`)
- `mongodb` Node.js driver installed (`npm install mongodb`)

## Description

The script performs the following steps:

1. Imports the `MongoClient` class from the `mongodb` package.
2. Defines the connection URI (`uri`) for the MongoDB server and the database name (`dbName`).
3. Creates a new `MongoClient` instance.
4. Defines budget data (`budgetData`) to be inserted into the database.
5. Defines an `async` function `main()` to perform the main operations.
6. Connects to the MongoDB server using `await client.connect()`.
7. Accesses the specified database using `client.db(dbName)`.
8. Gets a reference to the collection named `'budgetData'`.
9. Inserts the budget data into the collection using `insertMany()`.
10. Finds and retrieves all documents from the collection using `find({}).toArray()`.
11. Defines an `async` function `retrieve()` to retrieve data from the database.
12. Connects to the MongoDB server using `await client.connect()`.
13. Accesses the specified database.
14. Gets references to the collections for budget and color data.
15. Finds and retrieves all documents from both collections.
16. Closes the MongoDB connection using `await client.close()`.

## Usage

1. Ensure MongoDB is running locally.
2. Install dependencies: `npm install`.
3. Run the script: `node crud.js`.

## Output

- The script outputs messages indicating the connection status and the operations performed.
- Budget data and color data retrieved from the database are logged to the console.
<hr>

# Express.js Server with MongoDB Integration

This script sets up an Express.js server to handle CRUD operations on a MongoDB database.

## Prerequisites

- Node.js installed
- MongoDB server running locally on default port 27017
- `express`, `cors`, and `mongodb` Node.js packages installed (`npm install express cors mongodb`)

## Description

The script performs the following steps:

1. Imports necessary modules: `express`, `cors`, and `mongodb`.
2. Creates an instance of the Express application (`app`).
3. Defines the port number (`port`) for the server to listen on.
4. Imports CORS middleware and uses it to enable cross-origin resource sharing.
5. Configures the Express application to parse JSON bodies in incoming requests.
6. Configures a route to serve static content located inside the public folder.
7. Defines the connection URI (`uri`) for the MongoDB server and the database name (`dbName`).
8. Creates a new `MongoClient` instance.
9. Defines an `async` function `main()` to connect to MongoDB and define route handlers.
10. Connects to the MongoDB server using `await client.connect()`.
11. Accesses the specified database using `client.db(dbName)`.
12. Gets a reference to the collection named `'budgetData'` and retrieves budget data.
13. Defines routes to handle HTTP requests:
    - **GET /budget:** Retrieves budget data as JSON response.
    - **POST /budget/add:** Adds new data to the budget collection.
14. Starts the Express.js server to listen for incoming HTTP requests.
15. Handles errors encountered during execution by logging them to the console and sending appropriate HTTP responses.

## Usage

1. Ensure MongoDB is running locally.
2. Install dependencies: `npm install`.
3. Run the script: `node <filename>.js`.
4. Access the routes using tools like cURL, Postman, or a web browser.

## Routes

- **GET /budget:** Retrieves budget data.
- **POST /budget/add:** Adds new data to the budget collection.

## Output

- The script outputs messages indicating the status of the Express.js server and MongoDB connection.
- Budget data retrieved from the database is logged to the console.
- Success or failure messages for CRUD operations are sent as HTTP responses.
- Any errors encountered during execution are logged to the console.
<hr>

# Budget Visualization Script

This script retrieves budget data from a server using Axios, and visualizes it using Chart.js and D3.js.

## Prerequisites

- Node.js installed
- Access to a server providing budget data (e.g., the server.js script)
- `axios`, `chart.js`, and `d3` Node.js packages installed (`npm install axios chart.js d3`)

## Description

The script performs the following tasks:

1. Defines a `dataSource` object to store budget data for visualization.
2. Implements a function `getBudget()` to retrieve budget data from the server using Axios and update the `dataSource` object accordingly.
3. Uses Chart.js to create a pie chart based on the retrieved budget data.
4. Uses D3.js to create a donut chart based on the retrieved budget data.
5. Adds event listeners to the donut chart slices to display tooltips on hover.

### Axios Usage and Data Retrieval

The `getBudget()` function utilizes Axios to make an HTTP GET request to the server endpoint (`http://localhost:3000/budget`). Upon receiving a response, the function processes the data and updates the `dataSource` object.

- The Axios `get()` method is used to fetch data from the specified URL.
- Upon successful retrieval, the `then()` method is called with a callback function to handle the response.
- The retrieved budget data is stored in `res.data`.
- The budget data is then iterated over to extract relevant information (budget, color code, title) and populate the `dataSource` object.
- If an error occurs during the request, the `catch()` method is called to handle the error.

## Usage

1. Ensure the server providing budget data is running.
2. Install dependencies: `npm install`.
3. Run the script: `node script.js`.
4. Access the HTML page containing the visualizations in a web browser.

## Output

- The script retrieves budget data from the server using Axios and updates the `dataSource` object.
- Chart.js creates a pie chart using the budget data.
- D3.js creates a donut chart using the budget data.
- Hovering over segments of the donut chart displays tooltips with details about each budget item.
<hr>

The path to NGInx main folder (when serverd on DigitalOcean Droplet):
/usr/share/nginx/html

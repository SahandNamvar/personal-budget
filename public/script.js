var dataSource = {
    datasets: [
        {
            data: [], // will be populated by budget object values from server.js
            backgroundColor: [] // will be populated by colors object values from server.js
        }
    ],
    labels: [] // same as above
};

// Function to create a new instance of the chart and pass it the data
function createChart() {
    var ctx = document.getElementById("myChart").getContext("2d"); // Create ChartJS
    var myPieChart = new Chart(ctx, { type: 'pie', data: dataSource });
}

// Function to navigate to the Route defined in server.js (/budget) using Axios, get a response (the json object budget)
function getBudget() {
    axios.get('http://localhost:3000/budget') // access the /budget route defined in the server.js through the axios api, get a response back, manipulate the dataSource here with the budget object value from the server.
        .then(function (res) {
            console.log("Response from axios.get() for budget:", res.data);
            // Upon receiving a response, populate the local dataSource object
            for (var i = 0; i < res.data.myBudget.length; i++) {
                dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                dataSource.datasets[0].backgroundColor[i] = res.data.myBudget[i].colorCode;
                dataSource.labels[i] = res.data.myBudget[i].title;
            }
            //console.log('Budget: ', dataSource.datasets[0].data);
            //console.log('Color: ', dataSource.datasets[0].backgroundColor);
            //console.log('Title: ', dataSource.labels)
            createChart();
            createDonutChart();
        }).catch(function (error) {
            console.error('Error fetching budget data:', error);
        });
}

function createDonutChart() {
    // Check if the donutChart already contains an SVG element
    var existingSVG = d3.select("#donutChart svg");

    if (existingSVG.empty()) { // If no SVG element exists, create a new one
        // Create Donut Chart using D3.js
        var donutChart = d3.select("#donutChart")
            .append("svg")
            .attr("width", 400)
            .attr("height", 400)
            .append("g")
            .attr("transform", "translate(200,200)");

        var arc = d3.arc()
            .innerRadius(100)
            .outerRadius(200);

        var pie = d3.pie();

        // Append paths for each data element in the pie chart
        donutChart.selectAll("path")
            .data(pie(dataSource.datasets[0].data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", function (d, i) {
                var color = dataSource.datasets[0].backgroundColor[i];
                return color;
            })
            // Add hover event listeners
            .on("mouseover", function(d, i) {
                // Get the background color of the slice
                var color = dataSource.datasets[0].backgroundColor[i];

                // Update tooltip text with relevant data and set text color to match slice background color
                var tooltip = d3.select("#donutTooltip");
                tooltip.text(dataSource.labels[i] + ": " + dataSource.datasets[0].data[i])
                    .style("color", color); // Set text color

                // Scale down the slice
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("transform", "scale(0.9)");
            })
            .on("mouseout", function() {
                // Reset tooltip text when mouse leaves the segment
                var tooltip = d3.select("#donutTooltip");
                tooltip.text("Hover over a segment to see details");

                tooltip.style("color", "black");

                // Scale up the slice back to its original size
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("transform", "scale(1)");
            })
    }
}
getBudget();

/*
    // For use to retrieve values from user on the web, and make a post request. Then in server.js, the POST request is processed and new item is added to the db.
function addNewBudgetEntry(newEntry) {
    // URL of your server's endpoint
    const url = 'http://localhost:3000/budget/add';

    // Options for the fetch request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry) // Convert data to JSON string
    };

    // Send the POST request
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data added successfully:', data);
            return data; // Return the added data
        })
        .catch(error => {
            console.error('Error adding data:', error);
            throw error; // Re-throw the error for handling in the calling code
        });
}

// Usage example:
const newBudgetEntry = {
    title: 'New Expense',
    budget: 100
};

addNewBudgetEntry(newBudgetEntry)
    .then(addedData => {
        // Do something with the added data if needed
    })
    .catch(error => {
        // Handle error
    });

    */

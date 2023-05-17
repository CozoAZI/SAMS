const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 2000;

// MongoDB connection URL
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'mydb';

// Collection name
const collectionName = 'mycollection';

// Connect to MongoDB
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error(err);
    return;
  }

  // Use the database
  const db = client.db(dbName);

  // Get the collection
  const collection = db.collection(collectionName);

  // Define a route that displays a dropdown with options fetched from MongoDB
  app.get('/', function(req, res) {
    // Find all documents in the collection and convert them to an array
    collection.find().toArray(function(err, docs) {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Extract the options from the documents
      const options = docs.map(doc => doc.option);

      // Generate the HTML for the dropdown
      const html = `
        <form>
          <label for="dropdown">Select an option:</label>
          <select name="dropdown" id="dropdown">
            ${options.map(option => `<option value="${option}">${option}</option>`).join('\n')}
          </select>
          <button type="submit">Submit</button>
        </form>
      `;

      // Send the HTML to the client
      res.send(html);
    });
  });

  // Start the server
  app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
  });
});

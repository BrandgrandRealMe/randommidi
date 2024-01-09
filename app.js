const port = process.env.PORT || 3001;
// Import the modules
const fs = require("fs");
const path = require("path");
const express = require('express');
const { createServer } = require('node:http');
const bl = require("betterdevlogs");
const log = bl({ logfolder: "logs" });

const app = express();
const server = createServer(app);

// Define the folder path
const folderPath = "./midis";

// Define the url handler function
function handleUrl(req, res) {
  // Read the folder contents
  fs.readdir(folderPath, (err, files) => {
    // Handle any errors
    if (err) {
      res.statusCode = 500;
      res.end("Error reading folder");
      return;
    }
    // Check if the folder is empty
    if (files.length === 0) {
      res.statusCode = 404;
      res.end("Folder is empty");
      return;
    }
    // Generate a random index
    let randomIndex = Math.floor(Math.random() * files.length);
    // Get the file name at the random index
    let fileName = files[randomIndex];
    // Get the full file path
    let filePath = path.join(folderPath, fileName);
    // Read the file contents
    fs.readFile(filePath, (err, data) => {
      // Handle any errors
      if (err) {
        res.statusCode = 500;
        res.end("Error reading file");
        return;
      }
      // Send the file contents as a response
      res.statusCode = 200;
      res.end(data);
    });
  });
}

app.get('/random.mid', (req, res) => {
  handleUrl(req, res);
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  log.info('server running!');
});

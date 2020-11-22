const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const order = require('./routes/order');

// set public folder
app.use(express.static(path.join(__dirname, 'src')));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable cors
app.use(cors());

app.use('/order', order);

const port = 3000;

// start server
app.listen(port, () => console.log(`server started on port ${port}`));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const sequelize = require("./config/database")
const studentRoutes = require("./routes/studentRoutes");
// Load environment variables

const app = express();

const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());



// Routes
app.use('/api/students', studentRoutes);

// Test DB connection and start server
sequelize.sync()
    .then(() => {
        console.log('Database connected...');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit process with failure
    });

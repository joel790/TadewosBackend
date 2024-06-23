const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const studentRoutes = require("./routes/studentRoutes");
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
// app.use(cors());
app.use(express.json());

// Routes
app.use('api/students', studentRoutes);

// Test DB connection and start server
sequelize.authenticate()
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

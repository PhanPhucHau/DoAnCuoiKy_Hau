require('dotenv').config(); // Nạp biến môi trường từ file .env
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const sequelize = require("./supabase/connection"); 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const app = express();


async function connectDB() {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); 
        console.log("Connected to PostgreSQL database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/v1/auth", authRoute); 
app.use("/v1/user", userRoute);

// Khởi động server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

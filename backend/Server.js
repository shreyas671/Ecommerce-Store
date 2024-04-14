const app = require("./App");

const dotenv = require("dotenv");
const connectDB = require("./config/database");
const error = require("./middleware/error");

//Handling Uncaught Error

process.on("uncaughtException",(error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Shutting Down the Server due to unCaught Exception`);
    process.exit(1);
} )

//Config
dotenv.config({path:"backend/config/config.env"});

//Connection to Database
connectDB();

app.listen(process.env.PORT,() => {
    console.log(`Server is Working on http://localhost:${process.env.PORT}`)
})


//unHandler Promise Rejection

process.on("unhandledRejection",(error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to unHandled Promise Rejection`);
    process.exit(1);
})
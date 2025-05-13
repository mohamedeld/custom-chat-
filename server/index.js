const express =require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDB");
const authRoutes = require("./routes/authRoute");

require("dotenv").config();
connectToDb();
const app = express();
app.use(express.json())
app.use(cors())
app.use("/api/v1/auth",authRoutes);
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
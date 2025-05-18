require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");
const dataRouter = require("./controllers/data.controller");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const swaggerUi = require('swagger-ui-express');
const swaggerAPIOptions = require("./swagger/swagger.options");

const app = express();

//middleware
// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions"
    })
}));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1", dataRouter);

// Swagger documentation using postman
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerAPIOptions));

app.use("/", (req, res) => {
    res.send("-- PhutiCee Apis :)")
})

mongoose.connect(process.env.MONGODB_URI)
    .then((result) => console.log(`Database connection established`)
    )
    .catch((error) => console.log(`Failed to establish Database connection`)
    )


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);

})

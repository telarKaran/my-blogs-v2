const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");
require("dotenv").config();

const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");

// const client = new MongoClient(process.env.MONGODB_URI, {
//   serverApi: { version: "1", strict: true, deprecationErrors: true },
// });

mongoose
  .connect(process.env.MONGODB_URI, {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("Mocking some data for development purposes");
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
// app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

// app.get("/api/blogs", async (req, res) => {
//   await client.connect(); // Connect to the MongoDB client
//   const database = client.db("mydatabase"); // Replace with your database name
//   const collection = database.collection("users"); // Replace with your collection name

//   const blogs = await collection.find({}).toArray(); // Fetch all documents
//   res.status(200).send(blogs);
//   await client.close();
// });

// app.post("/api/blogs", async (req, res) => {
//   console.log(req.body);
//   const { title, content, author } = req.body; // Extract data from the request body

//   if (!title || !content || !author) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   await client.connect(); // Connect to the MongoDB client
//   const database = client.db("mydatabase"); // Replace with your database name
//   const collection = database.collection("users"); // Replace with your collection name

//   const newBlog = { title, content, author, createdAt: new Date() }; // Create a new blog document
//   const result = await collection.insertOne(newBlog); // Insert the document into the collection

//   res.status(201).json({ message: "Blog created successfully", blog: result });
//   await client.close();
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("server is running on port 8000");
});

const express = require("express");
const app = express();
const cors = require("cors");


const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
require('dotenv').config()

app.use(express.json());
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://ai-based-gym-equipment.vercel.app',
      'https://ai-gym-equipment.netlify.app'
    ];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const productRoutes = require('./src/products/product.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes =  require("./src/users/user.route")
const adminRoutes =  require("./src/stats/admin.stats")
const discountRoutes = require("./src/discounts/discount.route")

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/discounts", discountRoutes)


async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use("/", (req, res) => {
      res.send("Gym Store Server is running!");
    });
  }
  
  main().then(() => console.log("Mongodb connect successfully!")).catch(err => console.log(err));
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
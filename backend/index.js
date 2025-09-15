const express = require('express');
const cors = require('cors');
const {mainRouter} = require('./routes/mainRouter');
require('dotenv').config();  

const allowedOrigins = [
  "https://transactly-orpin.vercel.app", // your Vercel frontend
  "http://localhost:3000"                // local dev frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

const app = express();
app.use(express.json());

app.use('/api/v1', mainRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

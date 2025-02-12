const express=require("express");
const router = require("./routes/index");

const app=express();

app.use(cors());

app.use("/api/vi",router);

  app.listen(3000);


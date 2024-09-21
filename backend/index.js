const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// jsonの受け取り
app.use(express.json());

// cors対策
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// postの処理
app.post("/", function (req, res) {
    console.log(req.body);
  try {
    res.json(req.body); // jsonで返却
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

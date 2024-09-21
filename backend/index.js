const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// express作成
const app = express();

// ポート番号指定
const port = 3000;

// jsonの受け取り
app.use(express.json());

// cors対策
// app.use(cors());
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
}
app.use(allowCrossDomain);

//Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017/todo-app');

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// dbのエラー処理
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// todoのスキーマを作成
var todoSchema = new mongoose.Schema({
    title: String,
    date: Date,
    isDone: Boolean
})

// Compile model from schema
var Todo = mongoose.model('Todo', todoSchema);

// todoリストの中身を全取得
app.get("/todo/list", async (req, res) => {
    const todos = await Todo.find();
    console.log("todos", todos);
    console.log("getが実行されています。")
    res.json(todos);
})

// 
app.post('/todo/add', async (req, res) => {
    const newTodo = new Todo({
      text: req.body.text
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  });


app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  });


// 以下、Todoとはあまり関係ないやつ

// http://localhost:3000 にGETリクエストが来た時(アクセスしたとき)に出すレスポンス
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// http://localhost:3000 にPOSTリクエストが来た時に出すレスポンス
// 現在はJSONデータでレスポンスが来たらそれをそのまま返している
app.post("/", function (req, res) {
    console.log(req.body);
  try {
    res.json(req.body); // jsonで返却
  } catch (error) {
    console.error(error);
  }
});

// ポート番号3000でサーバーを立てる
// これを消すと、http://localhost:3000 にリクエストがあっても対処できない
app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

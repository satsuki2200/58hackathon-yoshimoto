const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todo.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('データベース接続成功');
    }
});

'use strict';
// DBの作成と接続
// const { DatabaseSync } = require('node:sqlite');
// これ揮発性たぶん
// const db = new DatabaseSync(':memory:');


/**
 * express作成
 * @description expressのインスタンスを作成
 * @type {express}
 */
const app = express();

/**
 * ポート番号
 * @description ポート番号を指定
 * @type {number}
 */
const port = 3000;

/**
 * jsonの受け取り
 * @description jsonの受け取りを許可
 * @type {function}
 */
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

// dbが作成されているかの確認
// console.log(db instanceof sqlite3.Database);


// テーブルの作成

/**
 * タスクのID
 * @type {number}
 * @description 2から都度更新。1は初期値で使用。
 */
let id = 2;

/**
 * タスクの作成日時
 * @type {string}
 * @description 初期値を作成、都度更新
 */
let created_at = new Date().toISOString();

/**
 * dbの初期設定
 * @description テーブルの作成、初期値の挿入
 * @type {function}
 * @param {number} id タスクのID
 * @param {string} created_at 作成日時
 * @param {string} update_at 更新日時
 * @param {string} title タイトル
 * @param {string} person_name 作成者
 * @param {number} isDone 完了フラグ
 * @param {string} err エラー
 */
db.serialize(() => {
    db.run(
        'CREATE TABLE IF NOT EXISTS todo(id NUMBER, created_at TEXT, update_at TEXT, title TEXT, person_name TEXT, isDone INTEGER);'
    ), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("テーブル作成完了");
        }
    };

    // // テーブル作成時はコメント外して初期値挿入
    // db.run(
    //     'INSERT INTO todo (id, created_at, update_at, title, person_name, isDone) VALUES(?, ?, ?, ?, ?, ?);',
    //     [1, created_at, created_at, "初期値", "admin", 0]
    // ), (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("初期値の挿入完了");
    //     }
    // };
});

/**
 * todoリストの取得
 * @description todoリストの中身を全取得
 * @type {function}
 * @param {object} req リクエスト
 * @param {object} res レスポンス
 */
app.get("/todo/list", (req, res) => {
    // const todos = await Todo.find();
    // const todos = db.all('SELECT * FROM todo');
    db.all('SELECT * FROM todo', (err, todos) => {
        if (err) {
            console.error(err.message);
        }
        console.log("todos", todos);
        console.log("getが実行されています。")
        res.json(todos); 
    });
});

/**
 * タスクの追加
 * @description タスクの追加
 * @type {function}
 * @param {object} req リクエスト
 * @param {object} res レスポンス
 */
app.post('/todo/add', async (req, res) => {
    const { title, person_name } = req.body;
    created_at = new Date().toISOString();
    db.run(
        'INSERT INTO todo (id, created_at, update_at, title, person_name, isDone) VALUES(?, ?, ?, ?, ?, ?);',
        [id, created_at, created_at, title, person_name, 0]
    ), (err) => {
        if (err) {
            console.log(err);
        }
    };
    id++;
    // res.sendStatus(201);
    res.json({ status: 'success'});
  });

/**
 * タスクの削除
 * @description タスクの削除
 * @type {function}
 * @param {object} req リクエスト
 * @param {object} res レスポンス
 */
app.delete('/todo/delete/:id', async (req, res) => {
    db.run('DELETE FROM todo WHERE id = ?', req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("削除完了");
        }
    })
    // res.sendStatus(204);
    res.json({ status: 'success'});
  });

/**
 * タスクの完了
 * TODO: 更新日時の変更も必要
 * @description タスクの完了
 * @type {function}
 * @param {object} req リクエスト
 * @param {object} res レスポンス
 * @param {number} id 削除するタスクのID
 */
app.put('/todo/done/:id', (req, res) => {
    db.run('UPDATE todo SET isDone = 1 WHERE id = ?', req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("更新完了");
            // res.sendStatus(204);
            res.json({ status: 'success'});
        };
    });
});

/**
 * 完了したタスク数を取得
 * @description 完了したタスク数を取得
 * @type {function}
 * @param {object} req リクエスト
 * @param {object} res レスポンス
 * @param {number} sum 完了したタスク数
 */
app.get('/todo/completed/sum', (req, res) => {
    db.get('SELECT COUNT(*) as count FROM todo WHERE isDone = 1', [], (err, sum) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("完了タスク数", sum);
            res.json({ completed_sum : sum });
        }
    })
})

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

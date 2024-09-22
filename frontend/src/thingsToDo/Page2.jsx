import React, { useState } from "react";
import "./things";
import "./things.css";
import axios from "axios";


const Page2 = () => {
  // todoリスト
  const [todoText, setTodoText] = useState("");
  const [todoList, setNewTodoList] = React.useState([]);
  const [filteredTodoList, setFilteredTodoList] = React.useState([]);
  const [radio, setRadio] = React.useState('all');

    window.location.href = 'page2.html';
  // ラジオボタン更新
//   const handleChange = (event) => {
//     setRadio(event.target.value);
//     if (event.target.value === "incomplete") {
//       const incompleteTodoList = [...todoList].filter((todo) => todo.status === "完了にする");
//       setFilteredTodoList(incompleteTodoList);
//     } else if (event.target.value === "complete") {
//       const completeTodoList = [...todoList].filter((todo) => todo.status === "未完了に戻す");
//       setFilteredTodoList(completeTodoList);
//     } 
//     return
//   }

  // インプットフォームの状態を管理
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };
  
//   追加ボタンを押すとタスクがToDoリストに追加される
  const onClickAdd = () => {
    if (todoText === "") {
        console.log("エラー：タスク名が記載されていません．")
        return;
    }
    const newTodo = {
      comment: todoText,
      status: "完了にする"
    }
    // DOMが更新される
    todoList.push(newTodo);
    // 入力フォーム内を""にする
    setTodoText("");
    //getリクエストを行う
    axios.get("http://localhost:3000/todo/list")
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
  };

  // 削除
  const onClickDelete = (index) => {
    const deletedTodoList = [...todoList];
    deletedTodoList.splice(index, 1);
    setNewTodoList(deletedTodoList);
    //DELETEリクエストを行う
    // axios.delete("http://localhost:5173/")
    // .then(function (response) {
    //   console.log(response);
    // })
    // .then((error) => console.log(error))
  };

  // statusの切り替え
  const onClickSwitch = (index) => {
    const switchTodoList = [...todoList];
    if (switchTodoList[index].status === "完了にする") {
      switchTodoList[index].status = "未完了に戻す";
    } else if (switchTodoList[index].status === "未完了に戻す") {
      switchTodoList[index].status = "完了にする";
    }
    setNewTodoList(switchTodoList);
  };

  function buttonClick(){
    //送信ボタンを押すとタスク一覧画面に遷移する
    location.href = "http://localhost:5173/";
  }
  let button = document.getElementById('btn');
  button.onclick = buttonClick;

  return (
    <>
  
      <div className="complete-area">
        {/* <label>
          <input type="radio" value="all" onChange={handleChange} checked={radio === 'all'} />
          すべて
        </label>

        <label>
          <input type="radio" value="incomplete" onChange={handleChange} checked={radio === 'incomplete'} />
          未完了
        </label>

        <label>
          <input type="radio" value="complete" onChange={handleChange} checked={radio === 'complete'} />
          完了
        </label>
        */}

        <h1 className="todoList">新規タスク追加</h1>
        <table className="index">
            <thred className="list">

            {
              radio === "all"?
              <tbody id="todo-body">  
              {todoList.map((todo, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{todo.comment}</td>
                  <td>
                      <button onClick={() => onClickSwitch(index)}>
                    {todo.status}
                      </button>
                  </td>
                  {/* <td>
                    <button onClick={() => onClickDelete(index)}>削除</button>
                  </td> */}
                </tr>
              ))}
              </tbody>
              :
              <tbody id="todo-body">  
              {filteredTodoList.map((todo, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{todo.comment}</td>
                  <td><button onClick={() => onClickSwitch(index)}>{todo.status}</button></td>
                  <td><button onClick={() => onClickDelete(index)}>削除</button></td>
                </tr>
              ))}
              </tbody>
            }        
            </thred>
            {/* ここ */}

        </table>
      </div>

      <div className="add-todo">
        {/* <button type="button" className="newTask">
          新規タスクの追加
        </button>  */}
        タスク名
        <form> 
        <input className="tasks" value={todoText} onChange={onChangeTodoText} />
        </form>
        なまえ
        <form>
            <input className="name"/>
        </form>
        <button type="button" id="btn" className="addButton" onClick={onClickAdd}>追加</button>
      </div>

      {/* <div className="growth">
        <button type="button" className="growthButton" >成長度合いを見に行く</button>
      </div> */}

    </>

  );
}

export default Page2;

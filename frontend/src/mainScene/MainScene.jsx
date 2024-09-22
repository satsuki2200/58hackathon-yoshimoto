
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./MainScene.css";
import { useNavigate } from "react-router-dom";

function MainScene() {
  let sum = 0;
  let bestSum = 0;
  let bestMember = "";
  const goalNum = 100;

  const db = useState([
    {
      id: 1,
      name: "　清",
      completedNums: ["10", "10", "10", "10", "10", "10", "10"],
    },
    {
      id: 2,
      name: "堂西",
      completedNums: ["4", "2", "3", "4", "8", "5", "4"],
    },
    {
      id: 3,
      name: "神谷",
      completedNums: ["10", "20", "60", "10", "20", "20", "10"],
    },
    {
      id: 4,
      name: "外島",
      completedNums: ["0", "2", "3", "0", "10", "15", "0"],
    },
    {
      id: 5,
      name: "三上",
      completedNums: ["1", "2", "1", "0", "0", "5", "0"],
    },
    {
      id: 6,
      name: "堂西2",
      completedNums: ["4", "2", "3", "4", "8", "5", "4"],
    },
    {
      id: 7,
      name: "神谷2",
      completedNums: ["10", "20", "20", "0", "20", "20", "10"],
    },
    {
      id: 8,
      name: "外島2",
      completedNums: ["0", "2", "3", "0", "10", "15", "0"],
    },
    {
      id: 9,
      name: "三上2",
      completedNums: ["1", "2", "1", "0", "0", "5", "0"],
    },
  ])[0];

  const bestChecker = (sum, name) => {
    if (sum > bestSum) {
      bestSum = sum;
      bestMember = name;
    }
  };

  const createLeaf = (sum) => {
    if (sum > 90) sum = 90;
    sum -= 10;
    if (sum >= 0) {
      return (
        <div>
          <div className="leafImage"></div>
          {createLeaf(sum)}
        </div>
      );
    }
  };

  const createFlower = (sum) => {
    if (sum >= 100) {
      return <div className="flowerImage"></div>;
    }
  };
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };


  /**
    <必要な要素>(上から優先順位)
    ネームプレート:クリア!!
    植木鉢:クリア!!
    葉っぱ:クリア!!
    花:クリア!!
    各々のスコア(茎の上、花の上に表示):クリア!!
    目標スコア:クリア!!
    一位の人の名前:クリア!!
    一位の人のスコア:クリア!!
    締切日(残り日数)
    **/
  return (
    (bestSum = 0),
    (bestMember = ""),
    (
      <div className="App">
        <button className="button" onClick={handleHome}> </button>

        <div>
          <div className="AllOfData">
            {db.map((data) => {
              sum = 0;
              return (
                // eslint-disable-next-line react/jsx-key
                <div className="PersonalData">
                  <div className="nameplate">
                    {/* ネームプレート */}
                    {/* 名前: {data.name} */}
                  </div>

                  <div className="potImage">
                    <div className="nameplate">{data.name}</div>
                  </div>

                  <div className="stem">
                    {data.completedNums.map((num) => {
                      sum += parseInt(num);
                    })}
                    {createLeaf(sum)}
                  </div>

                  <div className="result">
                    <div className="bestMember">
                      {bestChecker(sum, data.name)}
                      <div className="flower">{createFlower(sum)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Infomation">
            <div className="TopInfo">現在のトップは{bestMember}さんです</div>
            <div className="ScoreInfo">スコア: {bestSum}</div>
            <div className="GoalInfo">目標スコア: {goalNum}</div>
          </div>
        </div>
      </div>
    )
  );
}

export default MainScene;
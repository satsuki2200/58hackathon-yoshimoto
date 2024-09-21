import React from "react";

import { App } from "./things";
import { createRoot } from "react-dom/client";

// ReactDOM.render(<App />, document.getElementById("root"));
const container = document.getElementById("root");
// const root = createRoot(container!);
// root.render(<App />);

//containerがnullかどうかをチェックしないとエラーがでる
if(container){
    const root = createRoot(container);
    root.render(<App />);
}else {
    console.error('Failed to find the root element.');
}

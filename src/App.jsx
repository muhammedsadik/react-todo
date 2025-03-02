const DATAPATH = "../public/data.json";
import React, { useEffect, useState } from "react";
import userLogo from "./assets/user.png";
import "./App.css";

function App() {
  const [data, setData] = useState({ todos: [] });
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState("inProgress");
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(DATAPATH);
        if (!response.ok) throw new Error("Data not found.");
        const resData = await response.json();
        setData(resData);
      } catch (error) {
        console.log("fetch error: ", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (data.todos && data.todos.length > 0) {
      if (activeTab === "inProgress") {
        setContent(<InProgress data={data} setData={setData} />);
      }

      if (activeTab === "complated") {
        setContent(<Complated data={data} setData={setData} />);
      }

      if (activeTab === "all") {
        setContent(<All data={data} setData={setData} />);
      }
    }
  }, [data, activeTab]); // data değiştiğinde bu useEffect tetiklenir

  return (
    <>
      <Header
        data={data}
        setData={setData}
        content={content}
        setContent={setContent}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
}

function Header({
  data,
  content,
  setContent,
  setData,
  activeTab,
  setActiveTab,
}) {
  return (
    <>
      <div className="header">
        <div className="header-top">
          <img src={userLogo} className="logo" alt="React logo" />

          <div className="content">
            <h3>Welcome, Sadık Orak</h3>
            <p>Prioritize, Plan, Achieve</p>
          </div>

          <div className="user">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>

        <div className="header-bottom">
          <div className="in-progress-header">
            <a
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("inProgress");
                setContent(<InProgress data={data} setData={setData} />);
              }}
              className={activeTab === "inProgress" ? "active" : ""}
              href="#"
            >
              In-Progress
              <span className="item-count">
                {data?.todos?.filter((d) => !d.isCompleted).length}
              </span>
            </a>
          </div>

          <div className="complated-header">
            <a
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("complated");
                setContent(
                  <Complated
                    data={data}
                    setData={setData}
                    setContent={setContent}
                  />
                );
              }}
              className={activeTab === "complated" ? "active" : ""}
              href="#"
            >
              Complated
              <span className="item-count">
                {data?.todos?.filter((d) => d.isCompleted).length}
              </span>
            </a>
          </div>

          <div className="all-header">
            <a
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("all");
                setContent(
                  <All data={data} setData={setData} setContent={setContent} />
                );
              }}
              className={activeTab === "all" ? "active" : ""}
              href="#"
            >
              All
              <span className="item-count">{data?.todos?.length}</span>
            </a>
          </div>
        </div>
      </div>
      {content && content}
    </>
  );
}

function InProgress({ data, setData }) {
  const inProgress = data?.todos?.filter((d) => !d.isCompleted) || [];

  return (
    <>
      <div className="container">
        {inProgress.map((d) => (
          <div className="card" key={d.id}>
            <div className="checkbox-container">
              <label>
                <input
                  onChange={(e) => {
                    const updateTodos = data.todos.map((todo) =>
                      todo.id === d.id
                        ? { ...todo, isCompleted: !todo.isCompleted }
                        : todo
                    );
                    setTimeout(() => {
                      setData({ ...data, todos: updateTodos });
                    }, 500);
                  }}
                  type="checkbox"
                  //id={d.id}
                />
              </label>
            </div>
            <div className="content-container">
              <div className="content">
                <h4 className="content-title">{d.title}</h4>
                <span>{d.date}</span>
              </div>
              <button
                onClick={() => {
                  const updateTodos = data.todos.filter(
                    (todo) => todo.id !== d.id
                  );

                  setData({ ...data, todos: updateTodos });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Complated({ data, setData }) {
  const complated = data?.todos?.filter((d) => d.isCompleted) || [];

  return (
    <>
      <div className="container">
        {complated.map((d) => (
          <div className="card" key={d.id}>
            <div className="checkbox-container">
              <label>
                <input
                  onChange={(e) => {
                    const updateTodos = data.todos.map((todo) =>
                      todo.id === d.id
                        ? { ...todo, isCompleted: !todo.isCompleted }
                        : todo
                    );
                    setTimeout(() => {
                      setData({ ...data, todos: updateTodos });
                    }, 500);
                  }}
                  type="checkbox"
                  //checked={true}
                />
              </label>
            </div>
            <div className="content-container">
              <div className="content">
                <h4 className="content-title">{d.title}</h4>
                <span>{d.date}</span>
              </div>
              <button
                onClick={() => {
                  const updateTodos = data.todos.filter(
                    (todo) => todo.id !== d.id
                  );

                  setData({ ...data, todos: updateTodos });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function All({ data, setData }) {
  const all = data?.todos || [];

  return (
    <>
      <div className="container">
        {all.map((d) => (
          <div className="card" key={d.id}>
            <div className="checkbox-container">
              <label>
                <input
                  onChange={(e) => {
                    const updateTodos = data.todos.map((todo) =>
                      todo.id === d.id
                        ? { ...todo, isCompleted: !todo.isCompleted }
                        : todo
                    );
                    setTimeout(() => {
                      setData({ ...data, todos: updateTodos });
                    }, 500);
                  }}
                  type="checkbox"
                  //id={d.id}
                />
              </label>
            </div>
            <div className="content-container">
              <div className="content">
                <h4 className="content-title">{d.title}</h4>
                <span>{d.date}</span>
              </div>
              <button
                onClick={() => {
                  const updateTodos = data.todos.filter(
                    (todo) => todo.id !== d.id
                  );

                  setData({ ...data, todos: updateTodos });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
import { useEffect, useReducer, useState } from "react";
import { TodoInput } from "../components/TodoInput";
import { addTodoApi, delTodoApi, getTodoApi } from "../helpers/apiTest";

export function TodoList() {
  const [tabData, setTabData] = useState([
    {
      content: '全部',
      className: 'active'
    },
    {
      content: '待完成',
      className: null
    },
    {
      content: '已完成',
      className: null
    }
  ])
  const [tabState, setTabState] = useState('全部')
  const [data, setData] = useState([]); // !api回來的data
  const [todo, dispatchFn] = useReducer(reducerFn, []); // !拿來渲染的todo,跑map

  // reducerFn 這樣寫的好處在於需要特定的State更明確
  function reducerFn(state, action) {
    switch (action.type) {
      case 'getData': //函式
        return data
      case 'unCompleted':
        return data.filter(item => item.completed_at === null)
      case 'isCompleted':
        return data.filter(item => item.completed_at)
      default:
        return state
    }
  }

  useEffect(() => {
    getTodoApi()
      .then((res) => {
        setData(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  useEffect(() => {
    switch (tabState) {
      case '全部':
        getData() //! 渲染 改變todo State
        break;
      case '待完成':
        unCompleted()
        break;
      case '已完成':
        isCompleted()
        break;
      default:
        break;
    }
  }, [tabState, data])

  // dispatchFn()
  function getData() {
    dispatchFn({ type: 'getData' })
  }
  function unCompleted() {
    dispatchFn({ type: 'unCompleted' })
  }
  function isCompleted() {
    dispatchFn({ type: 'isCompleted' })
  }

  // 綁定DOM事件
  function changeTab(index, item) {
    return () => {
      const newTabData = [...tabData];
      newTabData.map((item) => {
        item.className = null; //全部設為null
        newTabData[index].className = 'active'; //指定index設為active
        return item;
      });
      setTabData(newTabData);
      setTabState(item.content);
    };
  }
  function addTodo() {
    addTodoApi(123)
      .then(() => {
        return getTodoApi()
      })
      .then((res) => {
        console.log(res);
        setData(res.data.todos);
      })
  }
  function delTodo(id) {
    return () => {
      delTodoApi(id)
        .then(() => {
          return getTodoApi()
        })
        .then((res) => {
          setData(res.data.todos);
        })
    }
  }

  return (<div className="conatiner todoListPage vhContainer">
    <button onClick={addTodo}>增加</button>
    <div className="todoList_Content">
      <TodoInput></TodoInput>
      <div className="todoList_list">
        <ul className="todoList_tab">
          {tabData.map((item, index) => {
            return (
              <li key={index}><a className={item.className}
                onClick={changeTab(index, item)}
              >{item.content}</a></li>
            )
          })}
        </ul>
        <div className="todoList_items">
          <ul className="todoList_item">
            {todo.map((item) => {
              return (<li key={item.id}>
                <label className="todoList_label">
                  <input className="todoList_input" type="checkbox" checked={item.completed_at}
                    onClick={() => {
                      // checkFn api
                    }}
                  />
                  <span>{item.content}</span>
                </label>
                <a href="#"
                  onClick={delTodo(item.id)}
                >
                  <i className="fa fa-times"></i>
                </a>
              </li>)
            })}
          </ul>
          <div className="todoList_statistics">
            <p> {data.length} 個已完成項目</p>
            <a href="#">清除已完成項目</a>
          </div>
        </div>
      </div>
    </div>
  </div >);
}

function TodoTab({ item, index, changeTab }) {
  return (<ul className="todoList_tab">
    {tabData.map((item, index) => {
      return <li key={index}><a className={item.className} onClick={changeTab(index, item)}>{item.content}</a></li>;
    })}
  </ul>);
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthApi } from "../helpers/apiTest";
import { Navbar } from "/src/components/Navbar";
import { TodoList } from "/src/containers/TodoList";
import '/src/scss/todo.scss'

export function TodoPage() {
  const navigate = useNavigate()

  function checkAuth() {
    checkAuthApi()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        navigate('/login', { replace: true })
        console.log(err);
      })
  }

  useEffect(() => {
    console.log('載入元件');
    checkAuth()
    return () => { console.log('卸載元件'); }
  }, [])

  return (
    <div id="todoListPage" className="bg-half">
      <Navbar></Navbar>
      <TodoList></TodoList>
    </div>);
}

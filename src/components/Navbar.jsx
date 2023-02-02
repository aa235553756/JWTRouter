import { useNavigate } from "react-router-dom";
import { api, logOutApi } from "../helpers/apiTest";
import { useAuth } from "../helpers/Context";


export function Navbar() {
  const navigate = useNavigate()
  const { setToken } = useAuth()
  const nickname = localStorage.getItem('nickName')

  function logOut() {
    logOutApi()
      .then((res) => {
        console.log(res);
        setToken(null); //將App刷新,token設為無(同時local也設無),使下一位無法繼續使用同組token
        localStorage.setItem('token', null); //local記得一起設定為無,下一次重整才不會有token
        alert('登出成功')
        navigate('/login', { replace: true })
      })
      .catch(err => console.log(err))
  }

  return (<nav>
    <h1><a>ONLINE TODO LIST</a></h1>
    <ul>
      <li className="todo_sm"><a style={{ cursor: 'pointer' }}><span>{nickname}的代辦</span></a></li>
      <li ><a onClick={logOut} style={{ cursor: 'pointer' }}>登出</a></li>
    </ul>
  </nav>);
}

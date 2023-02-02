import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { signUpApi } from '../helpers/apiTest';
import { useAuth } from '../helpers/Context';

export function SignUpPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const { setToken } = useAuth()

  const onSubmit = data => {
    console.log(data);
    const { email, nickName, password } = data;
    signUp(email, nickName, password);
  }

  function signUp(email, nickName, password) {
    signUpApi(email, nickName || 'user', password)
      .then(res => {
        console.log(res);
        const { headers: { authorization }, data: { nickname } } = res;
        setToken(authorization);
        localStorage.setItem('token', authorization);
        localStorage.setItem('nickName', nickname)
        alert('註冊成功,自動跳轉畫面');
        navigate('/', {
          replace: true,
          state: { nickname }
        })
      })
      .catch(err => {
        console.log(err);
        if (err.response.status = 422) {
          console.log(err.response.data.error.toString());
          alert('註冊失敗,' + err.response.data.error.toString());
        }
      });
  }

  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <div className="side">
          <a href="#"><img className="logoImg" src="src/assets/images/loginLogo.png" alt="" /></a>
          <img className="d-m-n" src="src/assets/images/login.png" alt="workImg" />
        </div>
        <div>
          <form className="formControls"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="formControls_txt">註冊帳號</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" type="email" id="email" placeholder="請輸入 email"
              {...register('email', {
                required: {
                  value: true,
                  message: "此欄位不可留空"
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "請輸入正確的信箱格式"
                }
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
            <label className="formControls_label" htmlFor="nickName">您的暱稱</label>
            <input className="formControls_input" type="text" id="nickName" placeholder="請輸入您的暱稱" {
              ...register('nickName')
            } />
            {/* {errors.nickName && <span>{errors.nickName.message}</span>} */}
            <label className="formControls_label" htmlFor="pwd">密碼</label>
            <input className="formControls_input" type="password" id="pwd" placeholder="請輸入密碼"
              {...register('password', {
                required: {
                  value: true,
                  message: "此欄位不可留空"
                },
                minLength: {
                  value: 6,
                  message: "密碼最少須包含六個字元"
                }
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <label className="formControls_label" htmlFor="pwd_repeat">再次輸入密碼</label>
            <input className="formControls_input" type="password" id="pwd_repeat" placeholder="請再次輸入密碼"
              {...register('pwd_repeat', {
                validate: (val) => {
                  if (watch('password') != val) { //watch
                    return "密碼輸入不一致"; //return到erros...message內
                  }
                },
              })}
            />
            {errors.pwd_repeat && <span>{errors.pwd_repeat.message}</span>}
            <input className="formControls_btnSubmit" type="submit" value="註冊帳號" />
            <NavLink className="formControls_btnLink" to="/login">登入</NavLink>
          </form>
        </div>
      </div>

    </div>
  )
}

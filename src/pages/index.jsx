import { LoginPage } from "./LoginPage"; //匿名,應該要改成 具名
import { SignUpPage } from "./SignUpPage";
import { TodoPage } from "./TodoPage";

export { //匿名
  LoginPage, SignUpPage, TodoPage
}

//所以比較好的做法是index包成物件並 匿名,component改成具名(以防撞套件名稱)
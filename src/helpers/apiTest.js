import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://todoo.5xcamp.us/',
  // timeout: 1000,
});

export function checkAuthApi() {
  return api.get(`/check`)
}

export function logInApi(email, password) {
  return api.post(`/users/sign_in`, { "user": { email, password } })
}

export function logOutApi() {
  return api.delete(`/users/sign_out`)
}

export function signUpApi(email, nickname, password) {
  return api.post(`/users`, { "user": { email, nickname, password } })
}

export function getTodoApi() {
  return api.get(`/todos`)
}

export function addTodoApi(content) {
  return api.post(`/todos`, { "todo": { content } })
}

export function changeTodoApi(id, content) {
  return api.put(`/todos/${id}`, { "todo": { content } })
}

export function delTodoApi(id) {
  return api.delete(`/todos/${id}`)
}

export function toggleTodoApi(id) {
  return api.patch(`/todos/${id}/toggle`)
}

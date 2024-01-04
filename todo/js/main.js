'use strict';

import Todo from '../js/todo.js'
import ProfileImg from '../js/img.js'
import * as weather from "../js/weather.js";
import Clock from '../js/clock.js'
import Paint from '../js/draw.js'

const loadedTodos = localStorage.getItem('todos');
const loadedTodosC = localStorage.getItem('todosC');
const loadCurrentUser = localStorage.getItem('currentUser');

const userName = document.querySelector('.user');
const onGoingBtn = document.querySelector('.ongoing__btn');
const completedBtn = document.querySelector('.completed__btn');
const lists = document.querySelector('.lists');
const completedLists = document.querySelector('.completed__lists');
const userEditBtn = document.querySelector('.fa-user-edit');
const userInput = document.querySelector('.userName__input');

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const todo = new Todo();
const profileImg = new ProfileImg();
const time = new Clock();
const paint = new Paint();

window.addEventListener('load', ()=>{
    todo.focusInput();
    loadToDos();
    loadCompletedToDos();
    loadUser();
    loadImg();
    loadCoords();
    setInterval(time.getTime(), 1000);
});
onGoingBtn.addEventListener('click', ()=>{
    if(lists.matches('.hide')){
        listHide();
    }
})
completedBtn.addEventListener('click', ()=>{
    if(completedLists.matches('.hide')){
        listHide();
    }
})
userEditBtn.addEventListener('click', ()=>{
    if(userEditBtn.matches('.fa-user-edit')){
        changeUserName();
    }
})
userInput.addEventListener('keydown', event =>{
    let text = event.target.value;
    if(event.keyCode === 13){
        editUserName(text);
    }
})
function loadToDos(){
    if(loadedTodos != null){
        const parseJson = JSON.parse(loadedTodos);
        parseJson.forEach(function(toDo){
            todo.addList(toDo.text);
        })
    }
}
function loadCompletedToDos(){
    if(loadedTodosC != null){
        const parseJson = JSON.parse(loadedTodosC);
        parseJson.forEach(function(toDo){
            todo.ShowToDoC(toDo.text, toDo.id);
        })
    }
}
function listHide(){
    lists.classList.toggle('hide')
    completedLists.classList.toggle('hide')
}
function loadUser(){
    console.log(loadCurrentUser);
    userName.textContent = loadCurrentUser;
}
function changeUserName(){
    localStorage.removeItem('currentUser');
    userInput.classList.add('show');
    userInput.focus();
    userInput.value = '';
}
function editUserName(text){
    localStorage.setItem('currentUser', text);
    userInput.classList.remove('show');
    userName.textContent = text;
}
function loadImg(){
    const recentImageDataUrl = localStorage.getItem('profile_img');
    if(recentImageDataUrl){
        profileImg.loadImg(recentImageDataUrl);
    }
}
function loadCoords() {
  const loadedCoords = localStorage.getItem("coords");
  if (loadedCoords === null) {
    weather.askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    weather.getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}


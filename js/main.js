'use strict';

import Popup from '../js/popup.js'

// name
const user = document.querySelector('.user');
const userName = document.querySelector('.user-name');
const sendTime = document.querySelector('.ms-time');
const sendBtn = document.querySelector('.send-btn');

const USER_LS = "currentUser";

const popUp = new Popup();

init();  

function init(){
    getSendTime()
    userName.focus();
    setInterval(getSendTime, 1000);
}  

function getSendTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    sendTime.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function changeName(){
    let msOne = document.querySelector('.message-one');
    msOne.classList.add('border-change');
}
setInterval(changeName,1600);

user.addEventListener('click', (event) =>{
    const target = event.target;
    if(target.matches('.send-btn')){
        const text = userName.value;
        addUser(text);
    }
})
userName.addEventListener('keydown', event=>{
    let text = event.target.value;
    if(event.keyCode === 13){
        addUser(text);
    }
})

function addUser(text){
    if(text != ""){
        handleSubmit(text);
    } else{
        popUp.alertNoText();
    }
}

function handleSubmit(currentUser){
    saveName(currentUser);
}

function saveName(currentUser){
    localStorage.setItem(USER_LS, currentUser);
    goNextPage();
}

function goNextPage(){
    document.location.href = "todo/todo.html";
}




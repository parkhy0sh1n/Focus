'use strict';

import PopUp from '../js/popup.js'

export default class Todo{
    constructor(){
        this.input = document.querySelector('.todolist__input');
        this.addBtn = document.querySelector('.todolist__btn');
        this.lists = document.querySelector('.lists');
        this.completedLists = document.querySelector('.completed__lists')
    
        this.id = 1;
        this.saveStatus = 0;
        this.TODOS = 'todos';
        this.TODOS_C = 'todosC';
        this.todos = [];
        this.todosC = [];

        this.popUp = new PopUp();
        
        this.addBtn.addEventListener('click', ()=>{
            let text = this.input.value;
            this.addList(text);
        });
        this.input.addEventListener('keydown', event =>{
            let text = event.target.value;
            if(event.keyCode === 13){
                this.addList(text);
            }
        })
        this.lists.addEventListener('click', ()=>{
            let target = event.target
            this.removeItemOrCompleteItem(target);
            this.editItem(target);
        })
        this.completedLists.addEventListener('click', ()=>{
            let target = event.target
            this.deleteCompletedToDo(target);
        })
}
    // focus input
    focusInput(){
        this.input.focus();
    }
    // run addList when user put input.value;
    addList(text){
        if(text === ""){
            if(this.popUp.alerText.matches('.scaleUp')){
                this.popUp.removeAlert();
            }else{
                this.popUp.alertNoText();
            }
            return this.input.focus();
        } else {
            const list = this.createItem(text);  
            this.lists.appendChild(list);
            list.scrollIntoView({block: 'center'});
            this.input.value = '';
            this.saveStatus = 1;
        }
    }
    // run from addList or loadData
    createItem(text){
        const listRow = document.createElement('li');
        let newId = Math.floor(Math.random() * 1000);
        listRow.setAttribute('class', 'item__row');
        listRow.setAttribute('data-id', newId);
        listRow.innerHTML = `
            <div class="item">
                <input type="radio" class="fake__input">
                <label for="" class="check__btn" data-id=${newId}>
                    <i class="fas fa-check"></i>
                </label>
                <span class="item_name">
                    ${text}
                </span>
                <button class="item__edit">
                    <i class="fas fa-pen" data-id=${newId}></i>
                </button>
                <button class="item__delete">
                    <i class="fas fa-trash" data-id=${newId}></i>
                </button>
            </div>
        `
        const todoObj = {
            text : text,
            id : newId
        }
        newId++;
        this.todos.push(todoObj);

        let newData = this.todos;

        if(this.saveStatus === 1){
            this.saveTodo(newData);
        }
        return listRow;
    }
    removeItemOrCompleteItem(target){
        const id = event.target.dataset.id;
        let newId = this.todosC.length;

        if(target.matches('.fa-trash')){
            const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`)
            toBeDeleted.remove();
            this.deleteToDo(toBeDeleted);

        } else if(target.matches('.check__btn')){
            const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`)
            let checkBtn = target;
            const text = toBeDeleted.innerText;
            checkBtn.innerHTML = `<i class="fas fa-check checked"></i>`;

            this.ShowToDoC(text, id);
            
            this.saveStatus = 1;

            setTimeout(()=>{
                toBeDeleted.remove();
                this.deleteToDo(toBeDeleted);
            }, 1000);
        }
    }
    deleteToDo(target){
        const cleanToDos = this.todos.filter(function(toDo){
            return toDo.id !== parseInt(target.dataset.id)
        })
        this.todos = cleanToDos;
        this.saveTodo(this.todos);
    }
    deleteCompletedToDo(target){
        const id = event.target.dataset.id;
        if(target.matches('.fa-trash')){
            const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
            const cleanToDosCompleted = this.todosC.filter(function(toDo){
                return toDo.id !== parseInt(id);
            })
            this.todosC = cleanToDosCompleted;
            this.saveTodoComplete(this.todosC);
            console.log(this.todosC);
            toBeDeleted.remove();
        }
    }
    saveTodo(newData){
        localStorage.setItem(this.TODOS, JSON.stringify(newData));
    }

    saveTodoComplete(todoC){
        localStorage.setItem(this.TODOS_C, JSON.stringify(todoC));
    }
    ShowToDoC(text, id){
        const listRow = document.createElement('li');     
        this.completedLists.appendChild(listRow);
        let newId = Math.floor(Math.random()* 10000) + 1000 

        listRow.setAttribute('class', 'item__row completed');
        listRow.setAttribute('data-id', newId);
        listRow.innerHTML = 
        `<div class="item">
                <input type="radio" class="fake__input">
                <label for="" class="check__btn" data-id=${newId}>
                    <i class="fas fa-check checked"></i>
                </label>
                <span class="item_name textLine">
                    ${text}
                </span>
                <button class="item__delete">
                    <i class="fas fa-trash" data-id=${newId}></i>
                </button>
            </div>`

        const completedToDoObj = {
            text: text,
            id : newId
        }
        newId++;

        this.todosC.push(completedToDoObj);
        let newData = this.todosC;

        if(this.saveStatus === 1){
        this.saveTodoComplete(newData);
        }

        return listRow;
    }
    editItem(target){
        if(target.matches('.fa-pen')){
            const btn = target.parentNode;
            const div = btn.parentNode;
            const editInput = document.createElement('input');
            editInput.setAttribute('class', 'edit__text');
            editInput.setAttribute('data-id', target.dataset.id);
            div.appendChild(editInput);
            editInput.classList.add('show');
            editInput.focus();
            editInput.addEventListener('keydown', event =>{
                const text = event.target.value;
                const id = target.dataset.id;
                if(event.keyCode === 13){
                    if(text === ''){
                        if(this.popUp.alerText.matches('.scaleUp')){
                            this.popUp.removeAlert();
                        }else{
                            this.popUp.alertNoText();
                        }
                        editInput.classList.add('type__null');
                        return editInput.focus();
                    } else{
                        this.editText(text, id, editInput);   
                    }
                }
            })
        }
    }
    editText(newList, newId, target){
        for(let i = 0; i < this.todos.length; i++){
            if(this.todos[i].id == newId){          
                const currentText = document.querySelectorAll('.item_name');
                
                currentText[i].innerText = newList;
                target.classList.add('hide');

                this.todos[i].text = newList;
                this.saveTodo(this.todos);
            }
        }   
    }
}
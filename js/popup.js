'use strict';

export default class PopUp{
    constructor(){
 
        this.alerText = document.querySelector('.alert__text');
        this.close = document.querySelector('.close');
        this.input = document.querySelector('.todolist__input');
        
        this.close.addEventListener('click', ()=>{     
            this.removeAlert();
        })
    }
    alertNoText(){
        this.alerText.classList.add('scaleUp');
    }   
    removeAlert(){
        this.alerText.classList.toggle('scaleUp');
    } 
}
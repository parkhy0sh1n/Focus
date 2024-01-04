'use strict';

export default class Clock {
    constructor(){
        this.timeContainer = document.querySelector('.time');
        this.time = document.querySelector('.currentTime');
        this.dates = document.querySelector('.date');

        this.week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    }

    getTime(){
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let month = date.getMonth() + 1;
        let days = date.getDate();
        let dayName = this.week[date.getDay()];

        this.time.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`

        if (month === 1){
            month = 'JAN'
        } else if(month === 2){
            month = 'FEB'
        } else if(month === 3){
            month = 'MAR'
        } else if(month === 4){
            month = 'APR'
        } else if(month === 5){
            month = 'MAY'
        } else if(month === 6){
            month = 'JUNE'
        } else if(month === 7){
            month = 'JULY'
        } else if(month === 8){
            month = 'AUG'
        } else if(month === 9){
            month = 'SEP'
        } else if(month === 10){
            month = 'OCT'
        } else if(month === 11){
            month = 'NOV'
        } else if(month === 12){
            month = 'DEC'
        }
        
        this.dates.innerText = `${dayName}, ${month} ${days}`
    }
}

'user strict';

export default class Paint{
    constructor(){
        this.app = document.querySelector('.app');
        this.canvas = document.querySelector('.canvas');
        this.ctx = this.canvas.getContext('2d');

        this.paintBtn = document.querySelector('.draw');
        this.todolist = document.querySelector('.todolist');
        this.todoMenu = document.querySelector('.todolist__menu');

        this.color = document.querySelector('.color');
        this.colors = document.getElementsByClassName('colors');
        this.range = document.querySelector('.width-range');
        this.palleteBtn = document.querySelector('.palette');
        this.newLayer = document.querySelector('.new-layer');
        this.drawingTool = document.querySelector('.drawing__tool');
        this.paletteTool = document.querySelector('.palette__tool');
        this.brushBtn = document.querySelector('.brush-btn');
        this.fillBtn = document.querySelector('.fill-btn');
        this.controller = document.querySelector('.controller');
        this.saveBtn = document.querySelector('.save-btn');
        this.brushTip = document.getElementById('brush-tip');
        this.paintTop = document.getElementById('paint-top');

        this.canvas.width = document.querySelector('.canvas').offsetWidth;
        this.canvas.height = document.querySelector('.canvas').offsetHeight;

        this.INITAL_COLOR = '#fff';
        this.CANVAS_SIZE_WIDTH = this.todolist.offsetWidth;
        this.CANVAS_SIZE_HEIGHT = this.todolist.offsetHeight;

        this.HIDE = 'hide';
        this.SHOW = 'show';

        this.canvas.width = this.CANVAS_SIZE_WIDTH;
        this.canvas.height = this.CANVAS_SIZE_HEIGHT;

        this.painting = false;
        this.filling = false;
        this.colorEvent = false;

        this.colorOne = '#E17055'
        this.colorTwo = '#FDCB6E'
        this.colorThree = '#00B894'
        this.colorFour = '#2D5DC9'
        this.colorFive = '#6C5CE7'

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.CANVAS_SIZE_WIDTH, this.CANVAS_SIZE_HEIGHT);
        this.ctx.strokeStyle = this.INITAL_COLOR ;
        this.ctx.fillStyle = this.INITAL_COLOR ;
        this.ctx.lineWidth = 2.5;

        this.app.addEventListener('click', (event)=>{
            if(event.target.matches('.draw') || event.target.matches('.fa-paint-brush')){
                this.openCanvas();
            } else if(event.target.matches('.todo') || event.target.matches('.fa-list-ul')){
                this.closeCanvas();
            }
        })

        this.paletteTool.addEventListener('click', ()=>{
            if(event.target.matches('.palette') || event.target.matches('.palette i')){
                this.color.classList.toggle('scaleToOne');
                this.palleteBtn.classList.toggle('btnFocused');
                this.brushBtn.classList.remove('btnFocused');
                this.controller.classList.remove('scaleToOne');
                this.fillBtn.classList.remove('btnFocused');
            } else if(event.target.matches('.new-layer') || event.target.matches('.new-layer i')){ 
                this.color.classList.remove('scaleToOne');
                this.palleteBtn.classList.remove('btnFocused');
                this.brushBtn.classList.remove('btnFocused');
                this.controller.classList.remove('scaleToOne');
                this.fillBtn.classList.remove('btnFocused');
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.beginPath();
            }
        })

        this.drawingTool.addEventListener('click', ()=>{
            if(event.target.matches('.brush-btn') || event.target.matches('.brush-btn svg') || event.target.matches('.brush-btn svg path')){
                this.brushBtn.classList.toggle('btnFocused');
                this.fillBtn.classList.remove('btnFocused');
                this.controller.classList.toggle('scaleToOne');
                this.color.classList.remove('scaleToOne');
                this.palleteBtn.classList.remove('btnFocused');
                this.filling = false;
            } else if(event.target.matches('.fill-btn') || event.target.matches('.fill-btn svg') || event.target.matches('.fill-btn svg path')){
                this.fillBtn.classList.toggle('btnFocused');
                this.brushBtn.classList.remove('btnFocused');
                this.controller.classList.remove('scaleToOne');
                this.color.classList.remove('scaleToOne');
                this.palleteBtn.classList.remove('btnFocused');
                this.filling = true;
            }
        })

        if(this.canvas){
            // this.canvas.addEventListener('mousemove', this.onMouseMove);

            this.canvas.addEventListener('mousemove', ()=>{
                this.onMouseMove(this.canvas);
            });
            this.canvas.addEventListener('mousedown', ()=>{
                this.startPainting()
            });
            this.canvas.addEventListener('mouseup', ()=>{
                this.stopPainting();
            });
            this.canvas.addEventListener('mouseleave', ()=>{
                this.stopPainting();
            });
            this.canvas.addEventListener('click', ()=>{
                this.handleCanvasClick(this.canvas);
            });
            this.canvas.addEventListener('contextmenu', ()=>{
                this.handleCM();
            });
        }
            // Array.from 메소드는 object로부터 array를 만든다.
            // console.log(Array.from(colors));

        Array.from(this.colors).forEach((color) =>{ 
            color.addEventListener('click', ()=>{
                this.handleColorClick(this.canvas);
            })
        })

        
        if(this.range){
            this.range.addEventListener('input', ()=>{
                this.handelRangeChange(this.canvas);
            })
        }

        // if(this.mode){
        //     mode.addEventListener('click', ()=>{
        //         this.handleModeClick
        //     })
        // }

        this.saveBtn.addEventListener('click', ()=>{
                this.handleSaveClick(this.canvas);
            });
    }

    openCanvas(){
        this.canvas.classList.remove(this.HIDE); 
        this.canvas.classList.add(this.SHOW); 
        
        this.todolist.classList.add(this.HIDE);
        this.todoMenu.classList.add(this.HIDE);

        this.drawingTool.classList.toggle('scaleToOne');
        this.newLayer.classList.toggle('scaleToOne');
        this.palleteBtn.classList.toggle('scaleToOne');
        this.saveBtn.classList.toggle('scaleToOne');

    }
    
    closeCanvas(){ 
        this.canvas.classList.remove(this.SHOW);   
        this.canvas.classList.add(this.HIDE); 
        
        this.todolist.classList.remove(this.HIDE);
        this.todoMenu.classList.remove(this.HIDE);

        this.drawingTool.classList.toggle('scaleToOne');
        this.newLayer.classList.toggle('scaleToOne');
        this.palleteBtn.classList.toggle('scaleToOne');
        this.saveBtn.classList.toggle('scaleToOne');

        this.controller.classList.remove('scaleToOne');
        this.color.classList.remove('scaleToOne');
    }

    stopPainting(){
        this.painting = false;
    }
    
    startPainting(){
        this.painting = true;
    }
    onMouseMove(canvas){
        // const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');

        const x = event.offsetX;
        const y = event.offsetY;
        if(!this.painting){
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        // ctx.beginPath(); //경로 생성
        // ctx.moveTo(x, y); //선 시작 좌표
        // ctx.lineTo(x, y); //선 끝 좌표
        // ctx.stroke(); //선 그리기

4


    }
    
    handleColorClick(canvas){
        const ctx = canvas.getContext('2d');
        const color = event.target.style.backgroundColor;

        for(let i = 0; i < this.colors.length; i++){
            this.colors[i].classList.remove('colorFocused');
            this.colorEvent = false;
        }
        
        if(!this.colorEvent){
            event.target.classList.add('colorFocused');
            this.colorEvent = true;
        }

        this.brushTip.style.fill = color;
        this.paintTop.style.fill = color;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }
    
    handelRangeChange(canvas){
        const ctx = canvas.getContext('2d');
        const size = event.target.value;

        ctx.lineWidth = size;
    }
    
    // ctx.fillRect(50, 20, 100, 49); ctx.fillStyle = 'green';
    
    handleCanvasClick(canvas){
        const ctx = canvas.getContext('2d');

        if(this.filling){
            ctx.fillRect(0, 0, this.CANVAS_SIZE_WIDTH, this.CANVAS_SIZE_HEIGHT);
        }
    }
    
    handleCM(event){
        // event.preventDefault();
        // 우클릭방지
    }
    
    handleSaveClick(canvas){
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'Your Masterpiece';
        link.click();
        // <a download='PaintJS[EXPORT]' href=image></a>
    }
}

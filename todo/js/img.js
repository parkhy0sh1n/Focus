'use strict';

export default class ProfileImg{
    constructor(){
        this.imgBtn = document.querySelector('.profile__img');
        this.imgInput = document.querySelector('.img-upload');
        this.imgIcon = document.querySelector('.fa-user-plus')

        this.fileTypes = [
            "image/apng",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/svg+xml",
            "image/tiff",
            "image/webp",
            "image/x-icon"
        ];

        this.IMG_LS = 'profile_img';

        this.imgBtn.addEventListener('click', () =>{
            this.imgInput.click();
        })
        this.imgInput.addEventListener('change', ()=>{
            this.uploadImg();
        })
    }
    uploadImg(){
        const currentFiles = this.imgInput.files;

        if(this.imgBtn.children.length > 0){
            localStorage.removeItem(this.IMG_LS);
            this.imgBtn.children[0].remove();
        }

        if(currentFiles.length === 0){
            alert('No files currently selected for upload');
        } else {
            // for of 는 배열
            for(const file of currentFiles){        
                if(this.validFileType(file)){
                    const reader = new FileReader();
                    reader.addEventListener('load', ()=>{
                        localStorage.setItem(this.IMG_LS, reader.result);
                        this.loadImg(reader.result)
                    })
                    reader.readAsDataURL(file);
                }else {
                    alert('Not a valid file type. Update your selection.')
                }  
            }
        }
    }

    loadImg(recentImageDataUrl){
        const imgFile = document.createElement('img');
        this.imgIcon.remove();
        this.imgBtn.appendChild(imgFile);
        imgFile.src = recentImageDataUrl;
    }

    validFileType(file) {
        return this.fileTypes.includes(file.type);
    }

}
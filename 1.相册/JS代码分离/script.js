function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

addLoadEvent(preGallery);

function preGallery(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById('gallery')) return false;
    let gallery = document.getElementById('gallery');
    let links = gallery.getElementsByTagName('a');
    for(let i =0;i<links.length;i++){
        links[i].onclick = function(){
            return showPic(this)?false:true;
        }
    }
}

function showPic(whichpic){
    if(!document.getElementById('pic')) return false;
    let source = whichpic.getAttribute('href');
    let pic = document.getElementById('pic');
    pic.setAttribute('src',source);
    if(document.getElementById('text')){
        let tips = whichpic.getAttribute('title');
        let description = document.getElementById('text');
        description.firstChild.nodeValue = tips;
    }
    return true;
}
//页面加载时挂载函数
function addLoadEvent(func) {
    var oldLoad = window.onload;
    if (typeof oldLoad != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldLoad();
            func();
        }
    }
}

//在某个DOM元素后面插入元素
function insertAfter(newElem, targetElem) {
    var parent = targetElem.parentNode;
    if (parent.lastChild == targetElem) {
        parent.appendChild(newElem);
    } else {
        parent.insertBefore(newElem, targetElem.nextSibling);
    }
}

//addClass方法:添加class名,修改样式
function addClass(elem, value) {
    if (!elem.className) {
        elem.className = value;
    } else {
        newClassName = elem.className;
        newClassName += " ";
        newClassName += value;
        elem.className = newClassName;
    }
}

//导航菜单nav切换高亮显示
function hilightPage() {
    if (!document.getElementById) return false;
    if (!document.getElementsByClassName) return false;
    var headers = document.getElementsByClassName('logo');
    if (headers.length < 0) return false;
    var nav = headers[0].getElementsByTagName('nav');
    if (nav.length < 0) return false;
    var links = nav[0].getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var linkurl;
        for (var i = 0; i < links.length; i++) {
            linkurl = links[i].getAttribute('href');
            if (window.location.href.indexOf(linkurl) != -1) {
                links[i].className = "here";

                // 设置header的背景图片(配合CSS代码详见style.css的99行)
                var linkText = links[i].lastChild.nodeValue.toLowerCase();
                document.body.setAttribute('id', linkText);
            }
        }
    }
}



/**
 * 幻灯片切换动画
 * **/ 

// 移动元素动画函数
//moveElem(elemID移动的元素,final_x目标的X轴位置,final_y目标的Y轴位置,interval移动速度)
//interval越大速度越慢
function moveElem(elemID, fina_x, fina_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elemID)) return false;
    let elem = document.getElementById(elemID);

    //安全检查
    if (!elem.style.left) {
        elem.style.left = '0px';
    }

    if (!elem.style.top) {
        elem.style.top = '0px';
    }

    //增加dist变量调节动画速度
    let dist = 0;
    //位置随时间递增递减函数
    let xpos = parseInt(elem.style.left);
    let ypos = parseInt(elem.style.top);


    //清除滑动过程中的异常
    if (elem.movement) {
        clearTimeout(elem.movement);
    }

    if (xpos == fina_x && ypos == fina_y) {
        return true;
    }
    if (xpos < fina_x) {
        dist = Math.ceil((fina_x - xpos) / 10);
        xpos += dist;
    }
    if (xpos > fina_x) {
        dist = Math.ceil((xpos - fina_x) / 10);
        xpos -= dist;
    }
    if (ypos < fina_y) {
        dist = Math.ceil((fina_y - ypos) / 10);
        ypos += dist;
    }
    if (ypos > fina_y) {
        dist = Math.ceil((ypos - fina_y) / 10);
        ypos -= dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    let repeat = "moveElem('" + elemID + "'," + fina_x + "," + fina_y + "," + interval + ")";
    //递归调用(函数体内用setTimeout)
    //通过元素(elem)的属性,实现消除计时器
    elem.movement = setTimeout(repeat, interval);
}

//幻灯片初始化函数
function prepareSlideshow(){
    //选择器兼容性检测
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementsByClassName) return false;
    if(!document.getElementById('intro')) return false;
    var intro = document.getElementById('intro');
    var slideshow = document.createElement('div');
    slideshow.setAttribute('id','slideshow');
    var preview = document.createElement('img');
    preview.setAttribute('id','preview');
    preview.setAttribute('src','./img/slideshow.gif');
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);

    //获取文章中的所有链接
    var links = document.getElementsByTagName('a');
    var destination;

    for(var i=0;i<links.length;i++){
        
        links[i].onmouseover = function(){
            //console.log(1);
            destination = this.getAttribute('href');
            if(destination.indexOf('index.html')!=-1){
                moveElem('preview',0,0,5);
            }
            if(destination.indexOf('about.html')!=-1){
                moveElem('preview',-150,0,5);
            }
            if(destination.indexOf('photos.html')!=-1){
                moveElem('preview',-300,0,5);
            }
            if(destination.indexOf('live.html')!=-1){
                moveElem('preview',-450,0,5);
            }
            if(destination.indexOf('contact.html')!=-1){
                moveElem('preview',-600,0,5);
            }
        }
    }
}

// about页面显示更多文章内容
function showSection(id){
    var section = document.getElementsByTagName("section");
    for(var i=0;i<section.length;i++){
        if(section[i].getAttribute('id')!= id){
            section[i].style.display = "none";
        }else{
            section[i].style.display = "block";
        }
    }
}

function prepareInternalnav(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById)return false;
    var articles = document.getElementsByTagName('article');
    if(articles.length == 0)return false;
    var navs = articles[0].getElementsByTagName('nav');
    if(navs.length == 0)return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
        var sectionId = links[i].getAttribute('href').split('#')[1];
        //console.log(sectionId);
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        //console.log(typeof links[i]);//打印结果为对象
        links[i].destination = sectionId;//给links对象增加destination属性保存id
        links[i].onclick = function(){
            showSection(this.destination);
            return false;
        }
    }
}

/*
*创建图片展示区节点
*/
function placeholder(){
    if(!document.createElement) return false;
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    var gallery = document.createElement('div');
    gallery.setAttribute('id','gallery');
    var text = document.createElement('p');
    text.setAttribute('id','text');
    text.innerText = "show picture here";
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src','./img/placeholder.gif');
    gallery.appendChild(text);
    gallery.appendChild(placeholder);
    if(!document.getElementById('imagegallery'))return false;
    var imagegallery = document.getElementById('imagegallery');
    insertAfter(gallery,imagegallery);
}

function prepareGallery(){
    if(!document.createElement) return false;
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById('imagegallery')) return false;
    var imagegallery = document.getElementById('imagegallery');
    var links = imagegallery.getElementsByTagName('a');
    console.log(links);
    for(var i =0;i<links.length;i++){
        links[i].onclick = function(){
            return showPic(this)?false : true;
        }
    }
}

function showPic(whichPic){
    if(!document.getElementById("placeholder")) return false;
    var source = whichPic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    if(placeholder.nodeName != 'IMG') return false;
    placeholder.setAttribute('src',source);
    var description = document.getElementById('text');
    if(description){
        var text = whichPic.getAttribute('title')?whichPic.getAttribute('title'):"";
        if(description.firstChild.nodeType == 3){
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}

/*
*增强表格
*/
//根据行数的奇偶设置该行的背景颜色(斑马线颜色表格)
function stripTables(){
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName('table');
    for(var i=0;i<tables.length;i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName('tr');
        for(var j=0;j<rows.length;j++){
            if(odd == true){
                addClass(rows[j],"odd");
                odd = false;
            }else{
                odd = true;
            }
        }
    }
}

//悬浮至某行高亮
function hilightRow(){
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName('tr');
    for(var i=0;i<rows.length;i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function(){
            console.log(1);
            addClass(this,"highlight");
        }
        rows[i].onmouseout = function(){
            this.className = this.oldClassName;
        }
    }
}

function displayAbbreviations(){
    if(!document.createElement || !document.createTextNode || !document.getElementsByTagName)return false;
    var abbreviations = document.getElementsByTagName('abbr');
    if(abbreviations.length < 1) return false;
    var defs = new Array();
    for(var i=0;i<abbreviations.length;i++){
        var current_abbr = abbreviations[i];
        if(current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    var dlist = document.createElement("dl");
    for(key in defs){
        var defination = defs[key];
        var dtitle = document.createElement('dt');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(defination);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if(dlist.childNodes.length < 1) return false;
    var header = document.createElement('h3');
    var header_txt = document.createTextNode("Abbreviations");
    header.appendChild(header_txt);
    var articles = document.getElementsByTagName('article');
    if(articles.length == 0)return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}

/*
*contact页面函数和方法
*/ 
//设置input的id为label的for属性值
function focusLabels(){
    if(!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for(var i =0;i<labels.length;i++){
        if(!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function(){
            var id = document.getAttribute('for');
            if(!document.getElementById) return false;
            var elem = document.getElementById(id);
            elem.focus();
        }
    }
}

//设置placeholder值在输入框失去焦点和获得焦点时发生变化
function resetField(whichForm){
    if(Moderinzr.input.placeholder) return;
    for(var i=0;i<whichForm.elements.length;i++){
        var element = whichForm.elements[i];
        if(element.type == "submit") continue;
        var check = element.placeholder || element.getAttribute('placeholder');
        if(!check) continue;
        element.onfocus = function(){
            var text = this.placeholder || this.getAttribute('placeholder');
            if(this.value == text){
                this.className = "";
                this.value = "";
            }
        }
        element.onblur = function(){
            if(this.value == ""){
                this.className = 'placeholder';
                this.value = this.placeholder || this.getAttribute('placeholder');
            }
        }
        element.onblur();
    }
}

//初始化表单
function prepareForm(){
    var forms = document.getElementsByTagName('form');
    for(var i =0;i<forms.length;i++){
        var thisform = forms[i];
        resetField(thisform);
    }
}


/*
*函数调用
*/ 
addLoadEvent(hilightPage);
function loadEvent(){
    //about页面函数
    prepareInternalnav();
    //index页面函数
    prepareSlideshow();
    //photos页面函数
    placeholder();
    prepareGallery();

    //live页面函数
    stripTables();
    hilightRow();
    displayAbbreviations();

    //表单Contact页面函数
    focusLabels();
    prepareForm();
}
addLoadEvent(loadEvent);

function prepareSlideshow() {
    //判断是否支持DOM方法
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;

    //是否存在元素
    if (!document.getElementById('links')) return false;

    //创建元素
    //创建id=slideshow的标签元素
    let slideshow = document.createElement('div');
    slideshow.setAttribute('id','slideshow');
    //创建id=preview的图片元素
    let preview = document.createElement('img');
    preview.setAttribute('id','preview');
    preview.setAttribute('src','./topics.gif');
    slideshow.appendChild(preview);

    //获取列表所有链接地址
    let links = document.getElementById('links');
    let list = links.getElementsByTagName('a');
    
    //将js动态生成元素插入DOM
    insertAfter(slideshow,links);//将slideshow所在元素节点,插入到links所在节点之后

    //mouseover事件添加动画
    list[0].onmouseover = function () {
        moveElem('preview', -100, 0, 10);
    }

    list[1].onmouseover = function () {
        moveElem('preview', -200, 0, 10);
    }

    list[2].onmouseover = function () {
        moveElem('preview', -300, 0, 10);
    }
    
}

addLoadEvent(prepareSlideshow);
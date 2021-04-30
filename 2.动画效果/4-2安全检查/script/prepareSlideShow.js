function prepareSlideshow() {
    //判断是否支持DOM方法
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;

    //是否存在元素
    if (!document.getElementById('slideshow')) return false;
    if (!document.getElementById('preview')) return false;

    //初始化图片位置
    let preview = document.getElementById('preview');
    preview.style.position = 'absolute';

    //获取列表所有链接地址
    let links = document.getElementById('links');
    let list = links.getElementsByTagName('a');

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
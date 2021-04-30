//文本移动动画
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

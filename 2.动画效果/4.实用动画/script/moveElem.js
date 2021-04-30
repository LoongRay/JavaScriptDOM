//文本移动动画
//moveElem(elemID移动的元素,final_x目标的X轴位置,final_y目标的Y轴位置,interval移动速度)
//interval越大速度越慢
function moveElem(elemID,fina_x,fina_y,interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elemID)) return false;
    let elem = document.getElementById(elemID);
    //位置随时间递增递减函数
    let xpos = parseInt(elem.style.left);
    let ypos = parseInt(elem.style.top);
    if(xpos == fina_x && ypos == fina_y){
        return true;
    }
    if(xpos < fina_x){
        xpos ++;
    }
    if(xpos > fina_x){
        xpos --;
    }
    if(ypos < fina_y){
        ypos ++;
    }
    if(ypos > fina_y){
        ypos --;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    let repeat = "moveElem('"+elemID+"',"+fina_x+","+fina_y+","+interval+")";
    //递归调用(函数体内用setTimeout)
    movement = setTimeout(repeat,interval);
}

//初始化动画对象的起点位置
function positionMsg() {
    if (!document.getElementById) return false;
    if (!document.getElementById('msg')) return false;
    //初始化动画对象1
    let msg = document.getElementById('msg');
    msg.style.position = 'absolute';
    msg.style.left = "50px";
    msg.style.top = "100px";
    //10毫秒后执行移动动画
    moveMsg("msg",200,100,10);

    //初始化动画对象2
    if (!document.getElementById('msg2')) return false;
    let msg2 = document.getElementById('msg2');
    msg2.style.position = 'absolute';
    msg2.style.left = "50px";
    msg2.style.top = "50px";
    //10毫秒后执行移动动画
    moveMsg("msg2",125,125,20);
}
addLoadEvent(positionMsg);
//封装window.onload方法:将方法挂载到window.onload上,DOM文档加载完毕后立即执行其他脚本
function addLoadEvent(func) {
    let oldonload = window.onload;
    if (window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
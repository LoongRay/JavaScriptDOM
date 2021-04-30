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
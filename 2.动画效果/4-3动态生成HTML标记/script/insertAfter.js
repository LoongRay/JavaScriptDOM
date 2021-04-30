//封装一个在目标元素后插入新的元素节点的方法
function insertAfter(newElem,targetElem){
    var parent = targetElem.parentNode;
    if(parent.lastChild == targetElem){
        parent.appendChild(newElem);
    }else{
        parent.insertBefore(newElem,targetElem.nextSibling);
    }
}
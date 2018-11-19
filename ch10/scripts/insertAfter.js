function insertAfter(newElement,targetElememt){
    var parent=targetElememt.parentNode;
 
    if(parent.lastChild==targetElememt){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElememt.nextSibling);
    }

}
function moveElement(elementID,final_x,final_y,interval){
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem=document.getElementById(elementID);
    var x_pos=parseInt(elem.style.left);
    var y_pos=parseInt(elem.style.top);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left="0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var dist=0;
    if(x_pos==final_x&&y_pos==final_y){
        return true;
    }
    if(x_pos<final_x){
        dist = Math.ceil((final_x-x_pos )/10);
        x_pos+=dist;
    }
    if(x_pos>final_x){
        dist = Math.ceil(( x_pos - final_x) / 10);
        x_pos-=dist;
    }
    if (y_pos < final_y) {
        dist = Math.ceil((final_y - y_pos) / 10);
        y_pos+=dist;
    }
    if (y_pos > final_y) {
        dist = Math.ceil((y_pos - final_y) / 10);
        y_pos-=dist;
    }
    elem.style.left=x_pos+"px";
    elem.style.top=y_pos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}

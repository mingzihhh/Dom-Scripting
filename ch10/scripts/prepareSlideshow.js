function prepareSlideshow(){
    
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("linklist")) return false;
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var preview=document.createElement("img");
    preview.setAttribute("id","preview");
    preview.setAttribute("src", "image/3.jpeg");
    preview.setAttribute("alt", "image");
    slideshow.appendChild(preview);
    var list=document.getElementById("linklist");
    insertAfter(slideshow,list);
    var links=list.getElementsByTagName("a");
    links[0].onmouseover=function(){
        moveElement("preview",0,0,10);
    }
    links[1].onmouseover = function () {
        moveElement("preview", -425, 0, 10);
    }
    links[2].onmouseover = function () {
        moveElement("preview", -850, 0, 10);
    }
}
addLoadEvent(prepareSlideshow);
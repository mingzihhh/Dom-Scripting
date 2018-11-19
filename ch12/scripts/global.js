function addLoadEvent(func){
    
    var oldonload=window.onload;
    if(typeof window.onload!="function"){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }       
    }
}
function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
function addClass(element,value){
    if(element.className){
        element.className=value;
    }else{
        newClassName=element.className;
        newClassName+=" ";
        newClassName+=value;
        element.className=newClassName;
    }
}
function highlightPage(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var headers=document.getElementsByTagName("header");
    if(headers.length==0) return false;
 
    var navs=headers[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var links=navs[0].getElementsByTagName("a");
    if(links.length==0) return false;
    var linkurl;
    for(var i=0;i<links.length;i++){ 
        linkurl=links[i].getAttribute("href");  
        if(window.location.href.indexOf(linkurl)!=-1){
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
function moveElement(elementID,final_x,final_y,interval){
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem=document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left="0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    if(xpos==final_x&&ypos==final_y){
        return true;
    }
    if(xpos>final_x){
        var dist=Math.ceil((xpos-final_x)/10);
        xpos-=dist;
    }
    if(xpos<final_x){
        var dist=Math.ceil((final_x-xpos)/10);
        xpos+=dist;
    }
    if (ypos > final_y) {
        var dist =Math.ceil((ypos - final_y) / 10);
        ypos-= dist;
    }
    if (ypos < final_y) {
        var dist =Math.ceil((final_y - ypos) / 10);
        ypos += dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}
function prepareSildeshow(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("intro")) return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview=document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("id","preview");
    preview.setAttribute("alt","a glimpse of what awaits you");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links=document.getElementsByTagName("a");
    var destination;
    for(var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            destination=this.getAttribute("href");
            if(destination.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if(destination.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,5);
            }
            if(destination.indexOf("photos.html")!=-1){
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,5);
            }
            if(destination.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,5);
            }
        }
    }
    var frame=document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("id","frame");
    frame.setAttribute("alt","");
    slideshow.appendChild(frame);
}
//about.html:修改每个section的display样式
function showSection(id){
    var sections=document.getElementsByTagName("section");
    for(var i=0;i<sections.length;i++){

        if(sections[i].getAttribute("id")!=id){
            sections[i].style.display="none";
        }else{
            sections[i].style.display="block";
        }
    }
}
//about.html:点击链接时跳转到对应section
function prepareInternalnav(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var articles=document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var links=navs[0].getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;
        links[i].destination=sectionId;
        links[i].onclick=function(){
            showSection(this.destination);
            return false;
        }
    }
}
//photos.html:制作图片库
function showPic(whichpic){
    if(!document.getElementById("placeholder")) return false;
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if(!document.getElementById("description")) return false;
    if(whichpic.getAttribute("title")){
        var text=whichpic.getAttribute("title");
    }else{
        var text="";
    }
    var description=document.getElementById("description");
    if(description.firstChild.nodeType==3){
        description.firstChild.nodeValue=text;
    }
}
function preparePlaceholder(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imageGallery")) return false;
    var placeholder=document.createElement("img");
    placeholder.setAttribute("src","images/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    placeholder.setAttribute("id","placeholder");
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var desctext=document.createTextNode("Choose an image");
    description.appendChild(desctext);
    var gallery=document.getElementById("imageGallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}
function prepareGallery(){
    if(!document.getElementById) return false;
    if(!document.getElementById("imageGallery")) return false;
    if(!document.getElementsByTagName) return false;
    var gallery=document.getElementById("imageGallery");
    var links=gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function () {
            showPic(this);
            return false;

        }
    }
}
//live.html:标奇偶行
function stripeTables(){
    if(!document.getElementsByTagName) return false;
    var tables=document.getElementsByTagName("table");
    if(tables.length==0) return false;
    for(var i=0;i<tables.length;i++){
        var odd=false;
        var rows=tables[i].getElementsByTagName("tr");
        for(var j=0;j<rows.length;j++){
            if(odd==true){
               addClass(rows[j],"odd");
               odd=false;
            }else{
                odd=true;
            }
        }
    }
}
//live.html:鼠标高亮
function highlightRows(){
    if(!document.getElementsByTagName) return  false;
    var rows=document.getElementsByTagName("tr");
    for(var j=0;j<rows.length;j++){
        rows[j].oldClassName=rows[j].className;
        rows[j].onmouseover=function(){
            addClass(this,"highlight");
        }
        rows[j].onmouseout=function () {
            this.className=this.oldClassName;
        }
    }
}
//live.html:省略语表单
function displayAbbreviations(){
    var abbreviations=document.getElementsByTagName("abbr");
    if(abbreviations.length==0) return false;
    var defs=new Array();
    for(var i=0;i<abbreviations.length;i++){
        var current_abbr=abbreviations[i];
        if(current_abbr.childNodes.length<1) return false;
        var def=current_abbr.getAttribute("title");
        var key=current_abbr.firstChild.nodeValue;
        defs[key]=def;
    }
    var dlist=document.createElement("dl");
    for (key in defs){
        var def=defs[key];
        var dtitle=document.createElement("dt");
        var dtitle_text=document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        dlist.appendChild(dtitle);
        var ddesc=document.createElement("dd");
        var ddesc_text=document.createTextNode(def);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(ddesc);
    }
    if(dlist.childNodes.length<1) return false;
    var header=document.createElement("h3");
    var header_text=document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles=document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var container=articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}
//contact.html:为label增加焦点
/*
function focusLabels(){
    var labels=document.getElementsByTagName("lebel");
    if(labels.length==0) return false;
    for(var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute["for"]) return false;
        labels[i].onclick=function () {
            var id=this.getAttribute("for");
            if(!document.getElementById(id)) return false;
            var element=document.getElementById(id);
            element.focus();
        }
    }
}*/
//contact.html:恢复占位符
function resetFields(whichform){
    for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.type=="submit") continue;
        var check=element.placeholder;
        if(!check) continue;
        element.onfocus=function () {
            var text=this.placeholder;
            if(this.value==text){
                this.className="";
                this.value="";
            }
        }
        element.onblur=function () {
            if(this.value==""){
                this.className="placeholder";
                this.value=this.placeholder;
            }

        }
        element.onblur();
    }
}
//contact.html:验证表单
function isFilled(field){
    if(field.value.replace(' ','').length==0) return false;
    return (field.value!=field.placeholder);
}
function isEmail(field){
    return (field.value.indexOf('@')!=-1&&field.value.indexOf('.')!=-1);

}
function  validateForm(whichform){
    for(var i=1;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.required==true){
            if(!isFilled(element)){
                alert("Please fill in the "+element.name+" field");
            }
        }
        if(element.id=="email"){
            if(!isEmail(element)){
                alert("The "+element.name+" field must be a valid email address");
            }
        }
    }
    return true;
}
function prepareForm(){
    var forms=document.getElementsByTagName("form");
    if(forms.length==0) return false;
    for(var i=0;i<forms.length;i++){
        resetFields(forms[i]);
        forms[i].onsubmit=function () {
            if(!validateForm(this)) return false;
            var article=document.getElementsByTagName("article")[0];
            if(submitFormWithAjax(this,article)) return false;
            return true;
        }
    }
}
//Ajax
function submitFormWithAjax(whichform,thetarget){
    var request=getHTTPObject();
    if(!request) return false;
    displayAjaxLoading(thetarget);
    var dataParts=[];
    var element;
    for(var i=0;i<whichform.elements.length;i++){
        element=whichform.elements[i];
        dataParts[i]=element.name+'='+encodeURIComponent(element.value);
        console.log(dataParts[i]);
    }
    var data=dataParts.join('&');
    request.open('POST',whichform.getAttribute("action"),true);
    request.setRequestHeader("Content-Type", 'application / x - www - form - urlencoded' );
    request.onreadystatechange=function(){
        if(request.readyState==4&&this.status==200){
            var matches=request.responseText.match(/<artical>([/s/S]+)<\/artical>/);
            if(matches.length>0){
                thetarget.innerHTML=matches[1];
            }else{
                thetarget.innerHTML='<p>'+request.statusText+'</p>';
            }
        }
    };
    request.send(data);
    return true;

}
//创建XHR对象
function getHTTPObject(){
    if(typeof XMLHttpRequest=="undefined"){
        XMLHttpRequest=function(){
           if(window.XMLHttpRequest){
               return new XMLHttpRequest;
           }
           else if(window.ActiveXObject){
               return new ActiveXObject("Microsoft.XMLHTTP");
           }
        }
    }
    return new XMLHttpRequest();
}
//创建加载图像
function displayAjaxLoading(element){
    while(element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","images/loading.gif");
    content.setAttribute("alt","Loading...");
    element.appendChild(content);
}
addLoadEvent(highlightPage);
addLoadEvent(prepareSildeshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(prepareForm);
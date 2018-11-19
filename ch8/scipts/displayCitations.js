function displayCitations(){
    if(!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
    var quotes=document.getElementsByTagName("blockquote");
    if(quotes.length<1) return false;
    for(var i=0;i<quotes.length;i++){
        if(!quotes[i].getAttribute("cite")){
            continue;
        }
        var url=quotes[i].getAttribute("cite");
        var quoteChildren = quotes[i].getElementsByTagName("*");
        if (quoteChildren.length < 1) return false;
        var elem = quoteChildren[quoteChildren.length - 1];
        var link = document.createElement("a");
        var link_text = document.createTextNode("source");
        link.appendChild(link_text);
        link.setAttribute("href", url);
        var superscipt=document.createElement("sup");
        superscipt.appendChild(link);
        elem.appendChild(superscipt);
    }
}
addLoadEvents(displayCitations);
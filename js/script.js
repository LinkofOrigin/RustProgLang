//var views = ["index.html", "history.html", "features.html", "features/object-ownership.html", "features/conditional-compilation.html", "examples.html"];
var views;
var viewLookup;
var currentTabIndex = 0;

function createLookup(){
    views = parseSidebar();
    //debugger;
    var lookup = [];
    var head = [];
    var tail = [];
    var size = views.length;
    var headName = views[0];
    var tailName = views[size-1];
    head["previous"] = views[size-1];
    head["next"] = views[1];
    tail["previous"] = views[size-2];
    tail["next"] = views[0];
    lookup[headName] = head;
    lookup[tailName] = tail;
    for(var index = 1; index < size-1; index++){
        var previous = views[getPreviousIndex(index)];
        var next = views[getNextIndex(index)];
        var item = [];
        var name = views[index];
        item["previous"] = previous;
        item["next"] = next;
        lookup[name] = item;
    }
    return lookup;
}

function getNextIndex(index){
    var nextIndex = index + 1;
    return nextIndex < views.length ? nextIndex : 0;
}

function getPreviousIndex(index){
    var previousIndex = index - 1;
    return previousIndex > 0 ? previousIndex : views.length-1;
}

function parseSidebar(){
    return $('#sidebar a').map(function(){
        return $(this).attr('href').replace("../", "");
    });
}

$(function(){
    viewLookup = createLookup();
    $(".displayStyle_none[tabindex]").hide();
    $("[tabindex]").css("visibility", "hidden");
    $(document).unbind('keypress');
    $(document).keydown(function(e){
        var appearGroup = "[tabindex='" + currentTabIndex + "']";
        var addGroup = ".displayStyle_none" + appearGroup;
        var disappearGroup = ".hideOn_" + currentTabIndex;
        var removeGroup = disappearGroup + ".displayStyle_none ";
        var right = 39;
        var left = 37;
        var urlComponents = window.location.pathname.split('/');
        var res = new RegExp("\/[A-Za-z0-9-]+.html", "i");
        var arr = res.exec(window.location.href);
        var home = window.location.href;
        if(arr) {
            home = window.location.href.substring(0,arr["index"]+1);
        }
        var current = urlComponents[2] + (urlComponents.length == 4 ? "/" + urlComponents[3] : "");
	    if(current === "") {
		    current = "index.html";
	    }
        if(e.which == right){
            if($(appearGroup).length){
                $(appearGroup).css("visibility", "visible");
                $(addGroup).show();
                $(disappearGroup).css("visibility", "hidden");
                $(removeGroup).hide();
                debugger;
                currentTabIndex++;
            } else {
                window.location.href = home + viewLookup[current]["next"];
            }
        } else if(e.which == left){
            if($(appearGroup).length){
                $(appearGroup).css("visibility", "hidden");
                currentTabIndex--;
            } else {
                window.location.href = home + viewLookup[current]["previous"];
            }
        }
    })
});

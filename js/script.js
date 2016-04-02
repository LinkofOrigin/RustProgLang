var views = ["index.html", "examples.html", "features.html", "history.html", "versions.html"];
var viewLookup;
var currentTabIndex = 0;

function createLookup(){
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

$(function(){
    viewLookup = createLookup();
    $("[tabindex]").css("visibility", "hidden");
    $(document).unbind('keypress');
    $(document).keydown(function(e){
        var appearGroup =  "[tabindex='" + currentTabIndex + "']";
        var right = 39;
        var left = 37;
        var current = window.location.pathname.split('/')[2];
        if(e.which == right){
            if($(appearGroup).length){
                $(appearGroup).css("visibility", "visible");
                currentTabIndex++;
            } else {
                window.location.href = "/RustProgLang/" + viewLookup[current]["next"];
            }
        } else if(e.which == left){
            if($(appearGroup).length){
                $(appearGroup).css("visibility", "hidden");
                currentTabIndex--;
            } else {
                window.location.href = "/RustProgLang/" + viewLookup[current]["previous"];
            }
        }
    })
});
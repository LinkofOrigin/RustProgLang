var views;

function createLookup(viewList){
    var lookup = [];
    var head = [];
    var tail = [];
    var size = viewList.length;
    viewList.unshift("index.html");
    var headName = viewList[0];
    var tailName = viewList[size-1];
    head["previous"] = viewList[size-1];
    head["next"] = viewList[1];
    tail["previous"] = viewList[size-2];
    tail["next"] = viewList[0];
    lookup[headName] = head;
    lookup[tailName] = tail;
    for(var index = 1; index < size-1; index++){
        var previous = viewList[getPreviousIndex(index, size)];
        var next = viewList[getNextIndex(index, size)];
        var item = [];
        var name = viewList[index];
        item["previous"] = previous;
        item["next"] = next;
        lookup[name] = item;
    }
    return lookup;
}

function getNextIndex(index, arraySize){
    var nextIndex = index + 1;
    return nextIndex < arraySize ? nextIndex : 0;
}

function getPreviousIndex(index, arraySize){
    var previousIndex = index - 1;
    return previousIndex > 0 ? previousIndex : arraySize-1;
}

$(function(){
    views = createLookup(["index.html", "examples.html", "features.html", "history.html", "versions.html"]);
    $(document).unbind('keypress');
    $(document).keydown(function(e){
        var right = 39;
        var left = 37;
        var current = window.location.pathname.split('/')[2];
        if(e.which == right){
            window.location.href = "/RustProgLang/" + views[current]["next"];
        } else if(e.which == left){
            window.location.href = "/RustProgLang/" + views[current]["previous"];
        }
    })
});
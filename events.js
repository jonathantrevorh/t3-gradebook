chrome.webRequest.onCompleted.addListener(function (details) {
    //console.log(details);
    //alert("hi ya!");
}, {
    urls: ["*://t-square.gatech.edu/portal/tool/*/studentView.jsf"], 
    types: ["main_frame", "sub_frame"]
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({
        "url": chrome.extension.getURL("index.html")
    }, function(tab) {

    });
});

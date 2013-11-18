chrome.webRequest.onCompleted.addListener(function (details) {
    //console.log(details);
    //alert("hi ya!");
}, {
    urls: ["*://t-square.gatech.edu/portal/tool/*/studentView.jsf"], 
    types: ["main_frame", "sub_frame"]
});

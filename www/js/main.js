var pagesHistory = [];
var currentPage = {};
var path = "";

function init(){

    $("body").load(path + "pages/ListPage.html", function(){
        $.getScript(path + "js/ListPage.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });

}
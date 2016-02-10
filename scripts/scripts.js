"use strict";

(function() {
    var source = $.get('/templates/portfolio.html').then(function(source) {
        var template = Handlebars.compile(source);
        var content = getContent();
        $('.portfolio').append(template(content));
    });

    function getContent() {
        var content = $.ajax({
            url: "content.json",
            method: "get",
            async: false
        });
        return JSON.parse(content.responseText);
    }
})();
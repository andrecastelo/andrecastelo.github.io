"use strict";

/**
    Visão Rio 500              : http://visaorio500.rio
    CookingMyBooks             : http://www.cookingmybooks.com:7070/#/
    LookingForGroup            : http://lookingforgroup.gg
    Deuses de Dois Mundods     : http://deusesdedoismundos.com.br
    Organomix Receitas         : http://organomix.estrategiamktdigital.com
    #AVidaPede Caixa Econômica : -
*/
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
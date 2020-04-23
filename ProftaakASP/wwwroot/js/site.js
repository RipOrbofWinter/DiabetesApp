﻿var gun = Gun("https://diabetesappfontysgroep3.herokuapp.com/gun");


var items1 = gun.get('items1');
var items2 = gun.get('items2');

$('#form1').on('submit', function (e) {
    e.preventDefault();           // stop browser refresh
    items1.set($('#input1').val()); // add to set/table
    $('#input1').val("");           // empties form input
})

// copied and edited with difrent id
$('#form2').on('submit', function (e) {
    e.preventDefault();
    items2.set($('#input2').val());
    $('#input2').val("");
})

///getting each items
//map has no transform func so returns data "as is:"
items1.map().on(function (item, id) {
    //either get the existing id  or  create it; ideally replace this with vue:
    var li1 = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul#ul1');
    if (item) {
        $(li1).text(item);           //put the record text inside the list
    } else {
        $(li1).hide();                //create an empty li with display: hidden;
    }
})

// copied and edited with difrent id, note that both items an li have been changed here
items2.map().on(function (item, id) {
    var li2 = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul#ul2');
    if (item) {
        $(li2).text(item);
    } else {
        $(li2).hide();
    }
})


//remove items
$('body').on('dblclick', 'li', function (e) {
    items1.get(this.id).put(null);
})

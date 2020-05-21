
var gun = Gun("https://diabetesappfontysgroep3.herokuapp.com/gun");
var user = gun.user();

//
//ToDo Login System
//



//
//ToDo Version 2.0
//

var items1 = gun.get('items1');
var items2 = gun.get('items2');
var dt = new Date();

$('#form1').on('submit', function (e) {
    e.preventDefault();
    var input = $('#input1').val();
    if (input == null || input == "") {
        return;
    }
    items1.set(input + " " + AddTimeStamp());     // add to set/table + TimeStamp
    $('#input1').val(""); // empties form input

})

//
// return 0 for id type1, and 1 for id type2(for input1 and input2)
//

// copied and edited with difrent id
$('#form2').on('submit', function (e) {
    e.preventDefault();
    var input = $('#input2').val();

    if (input == null || input == "") {
        return;
    }

    items2.set(input + " " + AddTimeStamp());
    $('#input2').val("");
})

function AddTimeStamp() {
    var time = (dt.getHours() + ":" +
        (dt.getMinutes() < 10 ? '0' : '') +
        dt.getMinutes() + " " +

        (dt.getDate() < 10 ? '0' : '') +
        dt.getDate() + "-" +

        ((dt.getMonth() + 1) < 10 ? '0' : '') +
        (dt.getMonth() + 1) + "-" +

        dt.getFullYear());

    return time;
}


///getting each items
//map has no transform func so returns data "as is":
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
    var li2 = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul#ul1');
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
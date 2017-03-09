$(document).ready(function () {
    /*Calls function once page loaded to display tweets to page*/
    getData();
    //disable button on page load
    $('button').prop('disabled', true);
    //when input field has text in it, enable the button
    $("#createChirp").keypress(function () {
        $('button').prop('disabled', false);
    });
    //on  button click, empty the input field and disable the button
    $("#btn").click(function() {
        postData();
        $('#createChirp').val('');
        $('button').prop('disabled', true);
    })

function postData() {
    var newChirp = {
        message: $('#createChirp').val(),
        user: "myName",
        timestamp: new Date().toISOString()
    }

    // console.log('hello');

    $.ajax({
        method: "POST",
        url: 'http://localhost:3000/api/chirps',
        contentType: 'application/json',
        data: JSON.stringify(newChirp)
    })
    .then(function(success){
        createDiv(chirpArray[i]);

    })
    .fail(function(xhr, status, error) {
        console.log('failing');
        console.log(xhr);
        console.log(status);
        console.log(error);
    });
}
var array = ['success', 'info', 'warning', 'danger'];
var counter = 0;

function createDiv(chirp) {
    counter = counter + 1 > array.length ? 0 : counter + 1;
    var className = "list-group-item list-group-item-" + array[counter];
    var newDiv = $("<li class='" + className + "'></li>");
    newDiv.text(chirp.user + ": " + chirp.message);
    $(".list-group").append(newDiv);
}

function getData() {
    console.log("GETTING");
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/chirps',
        contentType: 'application/json'
    }).then(function (success) {
        console.log(success);
        $('#posts').empty();
        for (i = 0; i < success.length; i++) {
            createDiv(success[i]);
        }
    })
}



});



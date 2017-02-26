$(function() {

  $("#createAccount").click(function createAcount(event){
    var json={
    "username": $("#username").val(),
    "password": $("#password").val()
    };

    console.log(json);
    return json;
  });


});

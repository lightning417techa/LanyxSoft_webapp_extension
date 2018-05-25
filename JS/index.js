function start() {
      var roomid = prompt("Room ID", "");
      localStorage.setItem('roomid', roomid);
      
      var person = prompt("Please enter your name", "");
      localStorage.setItem('person', person);
      
      if (roomid == "") {
        localStorage.setItem('roomid', "null");
      }
    }
    start();
    
      $(function() {
   
  var messagesRef = new Firebase("https://fitbit-flex2-integration.firebaseio.com/" + localStorage.getItem("roomid"));
  $("#messageInput").keypress(function (e) {
    if (e.keyCode == 13) {
          var name = localStorage.getItem("person");
        var text = $("#messageInput").val();
          if (text == "//random pass" ) {
                function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789가ᅣᅥᅧᅩᅭᅮᅲᅳ내ᅤᅦᅨᅪᅫᅬᅯᅰᅱᅴᄃᄅᄆᄇᄉᄋᄌᄎᄏᄐᄑᄒᄁᄄᄈᄊᄍ";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
                      messagesRef.push({name:name, text:text});
        $("#messageInput").val("");
}          
                alert(makeid());
          } else {        
        messagesRef.push({name:name, text:text});
        $("#messageInput").val("");
          }
      }
  });
  
  messagesRef.limitToLast(50).on("child_added", function (snapshot) {
    var message = snapshot.val();
    $("<li/>").text(message.name + ": " + message.text).prepend($("<div/>")
    .text()).appendTo($("#messagesDiv"));
    $("#messagesDiv")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;
  });
});

 {   


  dynamicallyLoadScript('https://cdn.jsdelivr.net/npm/gun/gun.js');
  dynamicallyLoadScript('https://cdn.jsdelivr.net/npm/gun/lib/cryptomodules.js');
  dynamicallyLoadScript('https://cdn.jsdelivr.net/npm/gun/sea.js');
  dynamicallyLoadScript('https://code.jquery.com/jquery-1.12.4.min.js');
    
    
 //Gun connection
 var gun = Gun("https://diabetesappfontysgroep3.herokuapp.com/gun");
 var user = gun.user();
 var dt = new Date();
 var role = "";

 //Remove value with ID
 $('#remove-item').on('submit', function(e)
 {
     e.preventDefault(); //Prevent default submit behaviour (refresh).
     user.auth($('#alias').val(), $('#pass').val()); //Check if #alias and #pass fields are correct and logs in.''
     items1.get(this.id).put(null);
 });

 //Create account from #alias and #pass fields.
 $('#up').on('click', function(e)
 {
     user.create($('#alias').val(), $('#pass').val()); //Create account
 });

 //Sign in account from #alias and #pass fields.
 $('#login').on('submit', function(e)
 {
     e.preventDefault(); //Prevent default submit behaviour (refresh).
     user.auth($('#alias').val(), $('#pass').val()); //Check if #alias and #pass fields are correct and logs in.''
     role = $('#owner').val();
     console.log(role);
 });

 //When authorized
 gun.on('auth', function()
 {
     $('#login').hide();  //Hide sign-in/up form.
     user.get('said').map().val(UI); //Loop through 'said' values and execute UI function.
 });

 //On #said form submit
 $('#said').on('submit', function(e)
 {
     e.preventDefault();     //Prevent default submit behaviour (refresh).
     if(!user.is)
     {
       return;//Stop runing submit if user is not authorized/logged in
     }
      
     
     if( $('#say').val()  == null || $('#say').val()  == ""){
       return;
     }
     var messageJSON = CreateJSON(); //Create MessageJSON and call the function to fill the variable.
     
     //console.log(messageJSON); //Debug - logs the JSON to console

     user.get('said').set(messageJSON);
     $('#say').val("");      //Clear #say value for next message
 });

 //UI Function, responsible for appending to HTML (echo)
 function UI(say, id)
 {
   // var chatMessage = '<div class="message-block' + say.owner + '"><p class="item message-item">' + say.message + '</p><div class="item message-timestamp">' + say.timestamp + '</div></div>'; //HTML Variable with all the JSON values and classes.
   if (say.owner == role){
     var chatMessage = '<div id="' + id + '"><p class="item message-content">' + say.message + '</p><div class="item message-timestamp">' + " "+ say.timestamp + '</div><div hidden>' + say.owner + '</div>'; //HTML Variable with all the JSON values and classes.
   $('#chatbox-right').append(chatMessage); // Appends the message to the div #chatbox
   } else if(say.owner != role){
   // left/receiving messages
   var chatMessage = '<div ><p class="item message-content">' + say.message + '</p><div class="item message-timestamp">' + " "+ say.timestamp + '</div><div hidden>' + say.owner + '</div>';
   $('#chatbox-left').append(chatMessage); // Appends the message to the div #chatbox
   }
 }

 //Gets and returns Timestamp
  function AddTimeStamp() {
   var time = (dt.getHours() + ":" + 
   (dt.getMinutes() < 10 ? '0' : '') + 
   dt.getMinutes() + " " + 

   (dt.getDate() < 10 ? '0' : '') +
   dt.getDate() +"-" + 

   ((dt.getMonth()+ 1) < 10 ? '0' : '') +
   (dt.getMonth() + 1) + "-" +

   dt.getFullYear());

   return time;
 }

 //Creates JSON file
 function CreateJSON()
 {
   return {"message":$('#say').val(), "timestamp":AddTimeStamp(), "owner": role} ;
 }

 function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
}
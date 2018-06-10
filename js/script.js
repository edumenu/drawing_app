$(function(){
    
 //Declare variables
 var paint = false;  //meaning not painting or erasing 
 var paint_erase = "paint";  //paint= color input, erase = white
 var canvas = document.getElementById("paint");   //Obtaining the canvas id
 var ctx = canvas.getContext("2d");  //Obtaining the context
 var container = $(".container");  //Obtaining the container in which the canvas is
 var mouse = {x: 0, y: 0};   //Coordinate of the mouse in the container
 if(localStorage.getItem("imageCanvas") != null){
     //Creating an image constructor
    var img = new Image();
     //Checking to see if image has been loaded
     img.onload = function(){
         ctx.drawImage(img, 0 , 0);
     }
     //Setting the source of our image
     img.src = localStorage.getItem("imageCanvas");
     
 }     
 ctx.lineWidth = 10;    //Setting the drawing parameters (lineWidth, lineJoin, lineCap)
 ctx.lineJoin = "round";  //Defines the point between two lines
 ctx.lineCap = "round";    //Defines the points at the begining and the end of each line
 
 //Clicking inside the container    
 container.mousedown(function(e){
     paint = true;   //Setting the paint to true whenever we click inside the container
     ctx.beginPath();   //Starting a path
     mouse.x = e.pageX - this.offsetLeft;  //Distance between the mouse and the container on the x coordinate
     mouse.y = e.pageY - this.offsetTop;  //Distance between the mouse and the container on the x coordinate
     ctx.moveTo(mouse.x,mouse.y);
     
 });
    
 //Move the mouse while holding the mouse key 
  container.mousemove(function(e){
    mouse.x = e.pageX - this.offsetLeft;  //Distance between the mouse and the container on the x coordinate
    mouse.y = e.pageY - this.offsetTop;  //Distance between the mouse and the container on the x coordinate 
      
    //Checking if we are either painting or erasing 
    if(paint == true){
        if(paint_erase == "paint"){
            //Choose color
            ctx.strokeStyle = $("#paintColor").val();
           }else{
            //Select white color for erasing 
             ctx.strokeStyle = "white";  
           }
         //Access the coordinate of the line
         ctx.lineTo(mouse.x,mouse.y);  
      
        //Draw the defined path  
        ctx.stroke(); 
    }    
 });   
    
    
  //Stop drawing (set paint to false) when mouse is taken off the container
  container.mouseup(function(){
     paint = false; 
  });
  
  //Stop drawing (set paint to false) when mouse leaves the container    
  container.mouseleave(function(){
     paint = false; 
  });   
    
    
  //Clciking on the erase button
  $("#erase").click(function(){
      //Toggle between adding an active class
      $(this).toggleClass('active');
      //Checking to see if we are in paint or erase mode
      if(paint_erase == "paint"){
         paint_erase = "erase";
      }else{
         paint_erase = "paint"; 
      }
  }); 
    
  //Clicking on the reset button to clear canvas
  $("#reset").click(function(){
 
      //Display modal
      $('#myModal').modal('show');
      
      //Remove drawing when yes is clicked
      $("#yes").click(function(){
               //Clear a rectangle within the canvas 
      //first two parameters: coordinate top left points
      //second two paramters: coordinate of the bottom right points
      ctx.clearRect(0,0,canvas.width, canvas.height);
      //Going back to pain mode
      paint_erase = "paint";
      //Removing the active class on the erase button
      $("#erase").removeClass("active"); 
      });
  }); 
    
  //Saving drawn image    
  $("#save").click(function(){
      //Accessing localstorage
      //Checking the type of localstorage
      if(typeof(localStorage != null)){
          //Storing the encoded data into localstorage
          localStorage.setItem("imageCanvas",canvas.toDataURL());
          
        }else{
          window.alert("Your device does not support local storage!");        
        }
    }); 
    
    //Accessing and changing the color input
    $("#paintColor").change(function(){
       $("#circle").css("background-color",$(this).val()); 
    });
      
    //Setting the slider size
   $("#slider").slider({
     //Setting the min and max values
     min: 3, 
     max: 30,
     slide: function(event, ui){
         //accessin the value of the slider and changing th esize of the slider
         $("#circle").height(ui.value);
         $("#circle").width(ui.value);
         ctx.lineWidth = ui.value;
     }   
   });    
    
});
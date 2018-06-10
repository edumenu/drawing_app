$(function(){
    //Slider 
   $("#slider").slider({
     //Setting the min and max values
     min: 3, 
     max: 30,
     slide: function(event, ui){
         //accessin the value of the slider and changing th esize of the slider
         $("#circle").height(ui.value);
         $("#circle").width(ui.value);
     }   
   });
    
 //Declare variables
 var paint = false;  //meaning not painting or erasing 
 var paint_erase = "paint";  //paint= color input, erase = white
 var canvas = document.getElementById("paint");   //Obtaining the canvas id
 var ctx = canvas.getContext("2d");  //Obtaining the context
 var container = $(".container");  //Obtaining the container in which the canvas is
 var mouse = {x: 0, y: 0};   //Coordinate of the mouse in the container
 ctx.lineWidth = 3;    //Setting the drawing parameters (lineWidth, lineJoin, lineCap)
 ctx.lineJoin = "round";  //Defines the point between two lines
 ctx.lineCap = "round";    //Defines the points at the begining and the end of each line
 
 //Clicking inside the container    
 container.mousedown(function(){
     paint = true;   //Setting the paint to true whenever we click inside the container
     window.alert("Click worked!");
 })
    
    
});
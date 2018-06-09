$(function(){
    //Slider 
   $("#slider").slider({
     //Setting the min and max values
     min: 3, 
     max: 30,
     slide: function(event, ui){
         //accessin the value of the slider
         $("#circle").height(ui.value);
         $("#circle").width(ui.value);
         
     }   
   }); 
    
});

var black = 216877;
var blue = 356835;
document.bgColor = blue;


change_bg_black = function(){
   if(document.bgColor == black){
       document.bgColor = blue;
       document.getElementById("bt_bg_color").innerText = "Green";
   }else{
       document.bgColor = black;
       document.getElementById("bt_bg_color").innerText = "Black";
       
   }
};

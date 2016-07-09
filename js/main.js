
document.bgColor = 0xe007ee;
function change_color(){
  var value = document.getElementById("color_changer").value;
  var color = 0xe007ee;
  if(value=="Green"){
    color=0xe007ee;
  }else if(value=="Blue"){
    color = 0x0713ff;
  }else if(value=="White"){
    color = 0xffffff;
  }
  document.bgColor = color;
};


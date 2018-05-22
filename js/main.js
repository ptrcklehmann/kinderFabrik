function el(id) {
return document.getElementById(id);
}
var birthControl = true;
var cloneColector = [];
var proto = {
            html:0,
            x:0,
            y:0,
            rx:0,
            ry:0,
            speedx:3,
            speedy:2,
            w:30,
            h:30,
            make:function(){
              // produce html
              this.html = document.createElement('div');
              document.body.appendChild(this.html);
              // save clone in collector
              cloneColector.push(this);
              // set properties
              this.x = Math.ceil(Math.random()* 600) + 70;
              this.y = Math.ceil(Math.random()* 300) + 70;

              this.speedx = Math.ceil(Math.random()*6);
              this.speedy = Math.ceil(Math.random()*6);
            },
            move:function(){
              //motion algorithm
              if (this.x > 750){this.rx = 1;}; // right x axis
              if (this.x < 50){this.rx = 0;}; // left x axis

              if (this.y > 450){this.ry = 1;}; // botton y axis
              if (this.y < 50){this.ry = 0;}; // top y axis

              if (this.rx == 0){this.x += this.speedx;};
              if (this.rx == 1){this.x -= this.speedx;};

              if (this.ry == 0){this.y += this.speedy;};
              if (this.ry == 1){this.y -= this.speedy;};

              this.html.style.left = this.x + 'px';
              this.html.style.top = this.y + 'px';
            }

}
function kollision(a,b){
  if(a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.h + a.y > b.y) {
    return true;

  }else{
    return false;
}

};
function cloneFabrik(){
  var clone;
  for (var j = 0; j < 2; j++){
  var clone = Object.create(proto); // create clone
  clone.make(); // run clone method
  }
}
function kinderFabrik (){
  var clone = Object.create(proto);
  clone.make();
  clone.html.style.background = "#ba183a";
}

function render (){
  for (var i = 0; i < cloneColector.length; i++){
    cloneColector[i].move();
  }
  if (kollision(cloneColector[0],cloneColector[1])){
      if (birthControl){
        kinderFabrik();
        birthControl = false;
        setTimeout(function(){birthControl=true},1000);
      }
  } else {

  }
  requestAnimationFrame(render);
}

cloneFabrik();
render();

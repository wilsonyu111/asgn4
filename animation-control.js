function rotateByMouse(ev)
{
  if (lastPos < ev.clientX)
  {
    panRight();
    renderScene();
  }
  else if (lastPos > ev.clientX)
  {
    panLeft();
    renderScene();
  }
  lastPos = ev.clientX;
}


function clearCanvas()
{
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function animation()
{
  if (animationOn)
  {
    animationOn = false
  }
  else
  {
    animationOn = true
  }
}

function normalOnOff(value)
{
  showNormal = value;
}

function lightOnOff(value)
{
  lightOn = value;
}

function movingLightOn()
{
  if (movingLight)
  {
    movingLight = false;
  }
  else
  {
    movingLight = true;
  }
  gl.uniform1i(u_movingLightMode, movingLight);
}

function spotlightOn()
{
  if (spotlight)
  {
    spotlight = false;
  }
  else
  {
    spotlight = true;
  }
  gl.uniform1i(u_spotLightMode, spotlight);
}

function getSliderValue()
{
  // document.getElementById('leg').addEventListener('mousemove', function() {legAngle= this.value; renderScene(); });
  // document.getElementById('arm').addEventListener('mousemove', function() {armAngle= this.value; renderScene(); });
  // document.getElementById('Lfeet').addEventListener('mousemove', function() {leftFeetAngle= this.value; renderScene(); });
  // document.getElementById('Rfeet').addEventListener('mousemove', function() {rightFeetAngle= this.value; renderScene(); });
  // document.getElementById('camera_angle').addEventListener('mousemove', function() {angle= -this.value; renderScene(); });
  document.getElementById('light_x').addEventListener('mousemove', function() {lightCoord[0]= this.value; renderScene(); });
  document.getElementById('light_y').addEventListener('mousemove', function() {lightCoord[1]= this.value; renderScene(); });
  document.getElementById('light_z').addEventListener('mousemove', function() {lightCoord[2]= this.value; renderScene(); });

  document.getElementById('spotlight_limit').addEventListener('mousemove', function() {lightLimit= this.value; renderScene(); });

  document.getElementById('ambient_red').addEventListener('mousemove', function() {ambientColor[0]= this.value/100; renderScene(); });
  document.getElementById('ambient_green').addEventListener('mousemove', function() {ambientColor[1]= this.value/100; renderScene(); });
  document.getElementById('ambient_blue').addEventListener('mousemove', function() {ambientColor[2]= this.value/100; renderScene(); });

  document.getElementById('diffuse_red').addEventListener('mousemove', function() {diffuseColor[0]= this.value/100; renderScene(); });
  document.getElementById('diffuse_green').addEventListener('mousemove', function() {diffuseColor[1]= this.value/100; renderScene(); });
  document.getElementById('diffuse_blue').addEventListener('mousemove', function() {diffuseColor[2]= this.value/100; renderScene(); });

  canvas.onmousemove = function(ev) { if (ev.buttons == 1) {rotateByMouse(ev)}};
  canvas.onclick = function(ev) { if (window.event.shiftKey && !alt) 
    {
      alt = true; 
      tick();
    }
    else if (window.event.shiftKey && alt)
    {
      alt = false;
    }
  };
  // different camera controls
  // and deleting blocks using key c
  document.addEventListener('keydown', function(e){ 
    if (eye && at && up)
    {
      if(e.key == 'w')
      {
        moveForward();
        renderScene();
      }
      else if (e.key == 's')
      {
        moveBackward();
        renderScene();
      }else if (e.key == "a")
      {
        moveLeft();
        renderScene();
      }else if (e.key == "d")
      {
        moveRight();
        renderScene();
      }
      else if (e.key =="q")
      {
        panLeft();
        renderScene();
      }
      else if (e.key =="e")
      {
        panRight();
        renderScene();
      }
      else if (e.key == "c")
      {
        deleteBlock();
      }
    }
 })

}

function getColorValue()
{
  colors.push([document.getElementById('leg_red').value/100, document.getElementById('leg_green').value/100, document.getElementById('leg_blue').value/100,1]);
  colors.push([document.getElementById('body_red').value/100, document.getElementById('body_green').value/100, document.getElementById('body_blue').value/100,1]);
  colors.push([document.getElementById('arm_red').value/100, document.getElementById('arm_green').value/100, document.getElementById('arm_blue').value/100,1]);
  colors.push([document.getElementById('feet_red').value/100, document.getElementById('feet_green').value/100, document.getElementById('feet_blue').value/100,1]);
}

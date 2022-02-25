function renderAnimal()
{
    var colors = [];// leg = 0, body = 1, arm =2, feet =3
    // getColorValue(colors);
    var head = new Cube();
    var body = new Cube();

    if (showNormal)
    {
        head.textureNum = -3;
        body.textureNum = -3;
    }
    else
    {
        head.textureNum = -2;
        body.textureNum = -2;
    }
    
    head.color = [0.3,0.1,0.3];
    head.matrix.translate(-0.14+x_offset, 0.5+y_offset, 0.0+z_offset);
    head.matrix.scale(0.3,0.3,0.2);
    //head.render();

    //body.color = colors[1];
    body.matrix.setTranslate(-0.25+x_offset, -0.2+y_offset, -0.1+z_offset);
    body.matrix.scale(0.5,0.7,0.4);
    body.render();

    // arm(colors[2]);
    // leg(colors[0], colors[3], body.matrix);
}

function makeSphere(textureNum, extraOffset)
{
  var sphere = new Sphere();
  if (showNormal)
  {
    sphere.textureNum = -3;
  }
  else
  {
    sphere.textureNum = 3;
  }
  sphere.matrix.translate(x_offset + extraOffset, 0.5+y_offset, 0.0+z_offset);
  sphere.matrix.rotate(90, 1,0,0);
  sphere.normalMatrix.setInverseOf(sphere.matrix).transpose(); 
  sphere.render();
}

function leg(thighColor, feetColor, body)
{
  var leftThigh = new Cube();
  leftThigh.color = thighColor;
  leftThigh.matrix = new Matrix4(body);
  leftThigh.matrix.translate(0.4, 0, 0.3);
  if (animationOn && !alt)
  {
    leftThigh.matrix.rotate(30*Math.sin(g_seconds),1,0,0);
  }
  else if (animationOn && alt)// suprise animation
  {
    leftThigh.matrix.rotate(-30*Math.sin(g_seconds),1,0,0);
  }
  else
  {
    leftThigh.matrix.rotate(legAngle,1,0,0);
  }  
  leftThigh.matrix.rotate(180,0,0,1);
  var attachLeftFeet = new Matrix4(leftThigh.matrix);
  leftThigh.matrix.scale(0.30,0.6,0.25);

  var rightThigh = new Cube();
  rightThigh.color = thighColor;
  rightThigh.matrix = new Matrix4(body);
  rightThigh.matrix.translate(0.9, 0, 0.3);
  if (animationOn && !alt)
  {
    rightThigh.matrix.rotate(-30*Math.sin(g_seconds),1,0,0);
  }
  else if (animationOn && alt)// suprise animation
  {
    rightThigh.matrix.rotate(30*Math.sin(g_seconds),1,0,0);
  }
  else
  {
    rightThigh.matrix.rotate(-legAngle,1,0,0);
  }
  rightThigh.matrix.rotate(180,0,0,1);
  var attacRightFeet = new Matrix4(rightThigh.matrix);
  rightThigh.matrix.scale(0.30,0.6,0.25);

  var leftFeet = new Cube();
  leftFeet.color = feetColor;
  leftFeet.matrix = attachLeftFeet;
  leftFeet.matrix.translate(0.3, 0.6, 0.25);
  leftFeet.matrix.rotate(leftFeetAngle,1,0,0);
  leftFeet.matrix.rotate(180,0,1,0);
  leftFeet.matrix.scale(0.3,0.1,0.4);

  var rightFeet = new Cube();
  rightFeet.color = feetColor;
  rightFeet.matrix = attacRightFeet;
  rightFeet.matrix.translate(0.3, 0.6, 0.25);
  rightFeet.matrix.rotate(rightFeetAngle,1,0,0);
  rightFeet.matrix.rotate(180,0,1,0);
  rightFeet.matrix.scale(0.3,0.1,0.4);

  if (showNormal)
  {
    leftThigh.textureNum = -3;
    rightThigh.textureNum = -3;
    leftFeet.textureNum = -3;
    rightFeet.textureNum = -3;
  }
  leftThigh.render();
  rightThigh.render();
  leftFeet.render();
  rightFeet.render();
}

function arm(armColor)
{
  var leftArm = new Cube();
  var rightArm = new Cube();
  var leftArm2nd = new Cube();
  var rightArm2nd = new Cube();
  var leftHand = new Cube();
  var rightHand = new Cube();

  if (showNormal)
  {
    leftHand.textureNum = -3;
    rightHand.textureNum = -3;
    leftArm2nd.textureNum = -3;
    rightArm2nd.textureNum = -3;
    leftArm.textureNum = -3;
    rightArm.textureNum = -3;

  }
  else
  {
    leftHand.textureNum = -2
    rightHand.textureNum = -2
    leftArm2nd.textureNum = -2;
    rightArm2nd.textureNum = -2;
    leftArm.textureNum = -2;
    rightArm.textureNum = -2;
  }


  leftArm.color = armColor;
  leftArm.matrix.translate(0.25+x_offset, 0.5+y_offset, 0.27+z_offset);
  if (animationOn && !alt)
  {
    leftArm.matrix.rotate(50*Math.sin(g_seconds),1,0,0);
  }
  else if (animationOn && alt)
  {
    leftArm.matrix.rotate(40*Math.sin(g_seconds),0,0,1);
    leftArm.matrix.rotate(40, 0,0,1);
  }
  else
  {
    leftArm.matrix.rotate(armAngle,1,0,0);
  }
  leftArm.matrix.rotate(180,1,0,0);
  var attachLeftArm = new Matrix4(leftArm.matrix);
  leftArm.matrix.scale(0.1,0.4,0.1);
  leftArm.render();

  rightArm.color = armColor;
  rightArm.matrix.translate(-0.25+x_offset, 0.5+y_offset, 0.10+z_offset);
  if (animationOn&& !alt)
  {
    rightArm.matrix.rotate(-20*Math.sin(g_seconds),1,0,0);

  }
  else if (animationOn && alt)
  {
    rightArm.matrix.rotate(-40*Math.sin(g_seconds),0,0,1);
    rightArm.matrix.rotate(-40, 0,0,1);
  }
  else
  {
    rightArm.matrix.rotate(-armAngle,1,0,0);
  }
  rightArm.matrix.rotate(180,0,0,1);
  var attachRightArm = new Matrix4(rightArm.matrix);
  rightArm.matrix.scale(0.1,0.4,0.1);
  rightArm.render();

  leftArm2nd.color = [0.6,0.1,0.3];
  leftArm2nd.matrix = attachLeftArm;
  var attachLeftHand = leftArm2nd.matrix;
  leftArm2nd.matrix.translate(0, 0.4, 0);
  leftArm2nd.matrix.rotate(20,1,0,0);
  leftArm2nd.matrix.scale(0.1,0.4,0.1);
  leftArm2nd.render();

  rightArm2nd.color = [0.6,0.1,0.3];
  rightArm2nd.matrix = attachRightArm;
  var attachRightHand = rightArm2nd.matrix;
  rightArm2nd.matrix.translate(0.1, 0.4, 0.1);
  rightArm2nd.matrix.rotate(-20,1,0,0);
  rightArm2nd.matrix.rotate(180,0,1,0);
  rightArm2nd.matrix.scale(0.1,0.4,0.1);
  rightArm2nd.render();

  leftHand.color = armColor;
  leftHand.matrix = attachLeftHand;
  leftHand.matrix.translate(0, 1, -0.5);
  leftHand.matrix.scale(1,0.5,2);
  leftHand.render();

  rightHand.color = armColor;
  rightHand.matrix = attachRightHand;
  rightHand.matrix.translate(0, 1, -0.5);
  rightHand.matrix.scale(1,0.5,2);
  rightHand.render();

}
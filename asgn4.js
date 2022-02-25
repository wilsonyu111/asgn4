var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  attribute vec3 a_Normal;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_NormalMatrix;
  varying vec4 v_VertPos;
  void main() {
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
      v_UV = a_UV;
      v_Normal = normalize(vec3(u_NormalMatrix * vec4(a_Normal,1)));
      v_VertPos = u_ModelMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  uniform vec4 u_FragColor;
  uniform vec3 u_diffuseColor;
  uniform vec4 u_ambientColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_grass1;
  uniform sampler2D u_wall1;
  uniform sampler2D u_earth;
  uniform sampler2D u_sun;
  uniform sampler2D u_mercury;
  uniform sampler2D u_venus;
  uniform sampler2D u_mars;
  uniform sampler2D u_jupiter;
  uniform sampler2D u_saturn;
  uniform sampler2D u_uranus;
  uniform sampler2D u_neptune;
  uniform sampler2D u_;
  uniform vec3 u_lightPos;
  uniform vec3 u_spotlightPos;
  uniform vec3 u_cameraPos;
  varying vec4 v_VertPos;
  uniform int u_whichTexture;
  uniform int u_specularOn;
  uniform int u_lightOn;
  uniform float u_limit;
  uniform bool u_spotLightMode;
  uniform bool u_movingLightMode;

  void main() {

    if (u_whichTexture == -3)
    {
      gl_FragColor = vec4((v_Normal+1.0)/2.0,1.0);
    }
    else if (u_whichTexture == -2)
    {
      gl_FragColor = u_FragColor;
    }
    else if (u_whichTexture == -1)
    {
      gl_FragColor = vec4(v_UV, 1.0,1.0);
    }
    else if (u_whichTexture == 0)
    {
      gl_FragColor = texture2D(u_Sampler0, v_UV);
    }
    else if (u_whichTexture == 1)
    {
      gl_FragColor = texture2D(u_grass1, v_UV);
    }
    else if (u_whichTexture == 2)
    {
      gl_FragColor = texture2D(u_wall1, v_UV);
    }
    else if (u_whichTexture == 3)
    {
      gl_FragColor = texture2D(u_earth, v_UV);
    }
    else if (u_whichTexture == 4)
    {
      gl_FragColor = texture2D(u_sun, v_UV);
    }
    else if (u_whichTexture == 5)
    {
      gl_FragColor = texture2D(u_mercury, v_UV);
    }
    else if (u_whichTexture == 6)
    {
      gl_FragColor = texture2D(u_venus, v_UV);
    }
    else if (u_whichTexture == 7)
    {
      gl_FragColor = texture2D(u_mars, v_UV);
    }
    else if (u_whichTexture == 8)
    {
      gl_FragColor = texture2D(u_jupiter, v_UV);
    }
    else if (u_whichTexture == 9)
    {
      gl_FragColor = texture2D(u_saturn, v_UV);
    }
    else if (u_whichTexture == 10)
    {
      gl_FragColor = texture2D(u_uranus, v_UV);
    }
    else if (u_whichTexture == 11)
    {
      gl_FragColor = texture2D(u_neptune, v_UV);
    }
    else // red error color
    {
      gl_FragColor = vec4(1,0.2,0.2,1);
    }

    if (u_lightOn == 1)
    {
      // moving light calculation
      vec3 lightVector = u_lightPos - vec3(v_VertPos);
      vec3 L = normalize(lightVector);
      vec3 N = normalize(v_Normal);
      vec3 R = reflect(-L,N);
      vec3 E = normalize(u_cameraPos-vec3(v_VertPos));
      float nDotL = max(dot(N,L),0.0);
      vec3 diffuse = vec3(u_diffuseColor) * vec3(gl_FragColor) * nDotL *0.7;
      vec3 ambient = vec3(u_ambientColor) * 0.2;
      float specular = 0.0;

      // spotlight calculation
      vec3 spotlightVector = vec3(21,20,20) - vec3(v_VertPos);
      vec3 spotL = normalize(spotlightVector);
      vec3 spotN = normalize(v_Normal);
      vec3 spotR = reflect(-spotL,spotN);
      vec3 spotE = normalize(u_cameraPos-vec3(v_VertPos));
      float spotNDotL = max(dot(spotN,spotL),0.0);
      vec3 spotDiffuse = vec3(u_diffuseColor) * vec3(gl_FragColor) * spotNDotL *0.7;
      vec3 spotAmbient = vec3(u_ambientColor) * 0.2;
      float spotSpecular = 0.0;

      if (u_specularOn == 1)
      {
        specular = pow(max(dot(E,R), 0.0), 64.0) * 1.0;
        spotSpecular = pow(max(dot(spotE, spotR), 0.0), 64.0) * 1.0;
      }
      
      vec3 spotLightResult;
      vec3 movingLightResult;

      if (u_spotLightMode){
        float result = dot(spotL, normalize(vec3(21,20,20)));
        if (result < u_limit){
          spotLightResult = spotSpecular + spotDiffuse + spotAmbient;
        }
        else{
          spotAmbient = vec3(gl_FragColor) * 0.0;
          spotLightResult = spotAmbient;
        }
      }
      
      if (u_movingLightMode){ // if moving light mode is on
        movingLightResult = diffuse + ambient + specular;
      }
      // gl_FragColor = vec4(specular + diffuse + ambient + spotSpecular + spotDiffuse + spotAmbient, 1.0);
      gl_FragColor = vec4(movingLightResult + spotLightResult, 1.0);
    }

  }`

let a_Normal;
let a_UV;
let a_Position;
let u_FragColor;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_NormalMatrix;
let u_whichTexture;
let u_grass1;
let u_lightPos;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_cameraPos;
let u_Sampler0;
let u_specularOn;
let u_wall1;
let u_lightOn;
let u_earth;
let u_sun;
let u_mercury;
let u_venus;
let u_mars;
let u_jupiter;
let u_saturn;
let u_uranus;
let u_neptune;
let u_spotLightMode;
let u_movingLightMode;
let angle = 0;
let legAngle = 0;
let armAngle = 0;
let leftFeetAngle = 0;
let rightFeetAngle = 0;
let animationOn = false;
let alt = false;
let canvas;
let gl;
let eye;
let at;
let up;
let lightCoord = [21,20,20];
let showNormal = false;
let lightOn = 1;
let x_offset = 20;
let z_offset = 20;
let y_offset = 0.1;
let lastPos = 200;
let u_ambientColor;
let u_diffuseColor;
let ambientColor = [1.0, 1.0, 1.0, 1.0]
let diffuseColor = [1.0, 1.0, 1.0]
let u_limit;
let lightLimit = 90; // in degree
let movingLight = true;
let spotlight = true;



function main() {

  setupWebGL();
  if (!setupWebGL()) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  connectVariablesToGLSL();

  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
  if (!u_ModelMatrix)
  {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }
  if (!u_GlobalRotateMatrix)
  {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  if (!u_ViewMatrix)
  {
    console.log("view matrix problem");
    return;
  }

  if (!u_ProjectionMatrix)
  {
    console.log("projection matrix problem");
    return;
  }

  if (!u_NormalMatrix)
  {
    console.log("Normal Matrix problem");
    return;
  }

  if (!u_spotLightMode)
  {
    console.log("spot light mode problem");
    return;
  }

  if (!u_movingLightMode)
  {
    console.log("spot light mode problem");
    // return;
  }

  if (!u_whichTexture)
  {
    console.log("whichTexture error");
    return;
  }

  if (!u_specularOn)
  {
    console.log("obj type error");
    return;
  }

  if (!u_lightOn)
  {
    console.log("light on error");
    return;
  }

  if (!u_grass1)
  {
    console.log("grass error");
    return; 
  }

  if (!u_wall1)
  {
    console.log("wall error");
    return;
  }
  if (!u_earth || !u_jupiter || !u_mars || !u_mercury || !u_sun || !u_saturn || !u_neptune || !u_uranus || !u_venus)
  {
    console.log("planet texture error");
    return;
  }
  if (!a_Normal)
  {
    console.log("normal issues");
    return;
  }
  if (!u_lightPos)
  {
    console.log("light pos issue");
    return;
  }

  if (!u_cameraPos)
  {
    console.log("camera pos issue");
    return;
  }

  if (!u_diffuseColor)
  {
    console.log("diffuse color issue");
    return;
  }

  if (!u_ambientColor)
  {
    console.log("ambient color issue");
    return;
  }
  if (!u_limit)
  {
    console.log("limit  issue");
    return;
  }

  getSliderValue();
  drawMap();
  drawHill();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  requestAnimationFrame(tick);
  initTextures(gl,0);
}

function setupWebGL()
{
  canvas = document.getElementById('asgn2');
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl)
  {
    return false;
  }
  gl.enable(gl.DEPTH_TEST);
  return true;
}

function connectVariablesToGLSL ()
{
  a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  u_ModelMatrix= gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, "u_GlobalRotateMatrix");
  u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, "u_ProjectionMatrix");
  u_NormalMatrix = gl.getUniformLocation(gl.program,"u_NormalMatrix" );
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  u_specularOn = gl.getUniformLocation(gl.program, 'u_specularOn');
  u_grass1 = gl.getUniformLocation(gl.program, 'u_grass1');
  u_wall1 = gl.getUniformLocation(gl.program, 'u_wall1');
  u_earth = gl.getUniformLocation(gl.program, 'u_earth');
  u_sun = gl.getUniformLocation(gl.program, 'u_sun');
  u_mercury = gl.getUniformLocation(gl.program, 'u_mercury');
  u_venus= gl.getUniformLocation(gl.program, 'u_venus');
  u_mars = gl.getUniformLocation(gl.program, 'u_mars');
  u_jupiter= gl.getUniformLocation(gl.program, 'u_jupiter');
  u_saturn = gl.getUniformLocation(gl.program, 'u_saturn');
  u_uranus = gl.getUniformLocation(gl.program, 'u_uranus');
  u_neptune = gl.getUniformLocation(gl.program, 'u_neptune');
  u_lightPos = gl.getUniformLocation(gl.program, 'u_lightPos');
  u_cameraPos = gl.getUniformLocation(gl.program, 'u_cameraPos');
  u_lightOn = gl.getUniformLocation(gl.program, 'u_lightOn');
  u_diffuseColor = gl.getUniformLocation(gl.program, 'u_diffuseColor');
  u_ambientColor = gl.getUniformLocation(gl.program, 'u_ambientColor');
  u_limit = gl.getUniformLocation(gl.program, 'u_limit');
  u_spotLightMode = gl.getUniformLocation(gl.program, 'u_spotLightMode');
  u_movingLightMode = gl.getUniformLocation(gl.program, 'u_movingLightMode');
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
  eye = new vec3(new Float32Array([20, 0, 19]));
  at = new vec3(new Float32Array([20, 0, 20]));
  up = new vec3(new Float32Array([0, 1, 0]));
}

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0-g_startTime;

function tick()
{
  g_seconds = performance.now()/1000-g_startTime;
  renderScene();
  requestAnimationFrame(tick);
}

function renderScene()
{
  gl.uniform1i(u_movingLightMode, movingLight);
  gl.uniform1i(u_spotLightMode, spotlight);
  gl.uniform1i(u_lightOn, lightOn);
  gl.uniform1f(u_limit, Math.cos(Math.PI*lightLimit/180));
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var globalRotMat = new Matrix4().rotate(angle,0,1,0);
  var projMat = new Matrix4();
  var viewMat = new Matrix4();
  projMat.setPerspective (120, canvas.width/canvas.height, 0.1,200); // aspect ratio
  viewMat.setLookAt(eye.elements[0], eye.elements[1], eye.elements[2], at.elements[0],at.elements[1],at.elements[2], up.elements[0],up.elements[1],up.elements[2]);// (eye, at, up)
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  groundBox();
  skyBox();
  renderMap();
  if (movingLight)
  {
    lightBox();
  }else {
    spotLightBox();
  }
  makeSphere(3, 0)
}





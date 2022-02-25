class Tri
{
  constructor()
  {
    this.shape = 'triangle';
    this.position = [0.0, 0.0,0.0];
    this.color = [1.0,1.0,1.0,1.0];
    this.size = 10;
    this.segments = 4;
  }
}

function draw3DTriangle(vertices) 
{
  var n = 3; // The number of vertices

  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawTriangle3DUV(vertices, uv)
{
  var n = 3; // The number of vertices

  // vertex buffer and setup
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // un buffer and setup
  var uvBuffer = gl.createBuffer();
  if (!uvBuffer)
  {
    console.log("can't create uvbuffer");
    return -1
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0,0);
  gl.enableVertexAttribArray(a_UV);
}

function drawTriangle3DUVNormal(vertices, uv, normals)
{
  var n = vertices.length/3; // The number of vertices

  // vertex buffer and setup
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // un buffer and setup
  var uvBuffer = gl.createBuffer();
  if (!uvBuffer)
  {
    console.log("can't create uvbuffer");
    return -1
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0,0);
  gl.enableVertexAttribArray(a_UV);

  // normal buffer and setups
  var normalBuffer = gl.createBuffer();
  if (!normalBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Normal);
  gl.drawArrays(gl.TRIANGLES, 0, n);
  g_vertexBuffer = null;
}
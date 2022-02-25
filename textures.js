function initTextures(gl, n) {

    // Create the image object
    var image_sky = new Image();
    var image_grass = new Image();
    var image_wall = new Image();
    var image_earth = new Image();
   
    if (!image_sky || !image_grass || !image_wall) {
      console.log('Failed to create the image object');
      return false;
    }
    image_sky.src = 'night_sky.jpg';
    image_sky.onload = function(){ skyToTexture0(n, u_Sampler0, image_sky); };
    image_grass.src = "grass.jpg";
    image_grass.onload = function(){ grassToTexture1(image_grass); };
    image_wall.src = "wall.jpg";
    image_wall.onload = function(){ wallToTexture2(image_wall); };
    image_earth.src = "earth.jpg";
    image_earth.onload = function(){ planetToTexture(image_earth); };
    

    return true;
  }
  
  function skyToTexture0(n, u_Sampler, image) {
    var texture = gl.createTexture(); 
    if (!texture) {
      console.log('Failed to create the texture object');
      return false;
    }
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);   
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 0);
  }
  
  function grassToTexture1(image) {
    var texture = gl.createTexture(); 
    if (!texture) {
      console.log('Failed to create the texture object');
      return false;
    }
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  
    gl.activeTexture(gl.TEXTURE1);  
    gl.bindTexture(gl.TEXTURE_2D, texture);     
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);    
    gl.uniform1i(u_grass1, 1);
  }
  
  function wallToTexture2(image) {
    var texture = gl.createTexture(); 
    if (!texture) {
      console.log('Failed to create the texture object');
      return false;
    }
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture);   
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);    
    gl.uniform1i(u_wall1, 2);
  }

  function planetToTexture(image)
  {
    var texture = gl.createTexture(); 
    if (!texture) {
      console.log('Failed to create the texture object');
      return false;
    }
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, texture);   
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);    
    gl.uniform1i(u_earth, 3);
  }
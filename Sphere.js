class Sphere
{
    constructor()
    {
        this.type="sphere";
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
        this.normalMatrix = new Matrix4();
        this.diffuseMatrix = new Matrix4();
        this.textureNum = 3;
        this.specularOn = 1;
        this.vertes32 = new Float32Array([]);
    }
    render()
    {
        var rgba = this.color;
        gl.uniform1i(u_whichTexture, this.textureNum); // select texture type
        gl.uniform1i(u_specularOn, this.specularOn); // turn specular on or off
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniform3f(u_diffuseColor, diffuseColor[0], diffuseColor[1], diffuseColor[2]);
        gl.uniform4f(u_ambientColor, ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

        var d=Math.PI/10;
        var dd=Math.PI/10;
        var p1, p2, p3, p4, uv1, uv2, uv3, uv4, sinResult, cosResult;

        for (let t =0; t<Math.PI; t+=d)
        {
            for (let r =0; r < (2*Math.PI); r+= d)
            {
                sinResult = Math.sin(t);
                cosResult = Math.cos(t);
                // p1 = [Math.sin(t)*Math.cos(r), Math.sin(t)*Math.sin(r), Math.cos(t)];
                // p2 = [Math.sin(t+dd)*Math.cos(r), Math.sin(t+dd)*Math.sin(r), Math.cos(t+dd)];
                // p3 = [Math.sin(t)*Math.cos(r+dd), Math.sin(t)*Math.sin(r+dd), Math.cos(t)];
                // p4 = [Math.sin(t+dd)*Math.cos(r+dd), Math.sin(t+dd)*Math.sin(r+dd), Math.cos(t+dd)];

                p1 = [sinResult*Math.cos(r), sinResult*Math.sin(r), cosResult];
                p2 = [Math.sin(t+dd)*Math.cos(r), Math.sin(t+dd)*Math.sin(r), Math.cos(t+dd)];
                p3 = [sinResult*Math.cos(r+dd), sinResult*Math.sin(r+dd), cosResult];
                p4 = [Math.sin(t+dd)*Math.cos(r+dd), Math.sin(t+dd)*Math.sin(r+dd), Math.cos(t+dd)];

                uv1 = [t/Math.PI, r/(2*Math.PI)];
                uv2 = [(t+dd)/Math.PI, r/(2*Math.PI)];
                uv3 = [t/Math.PI, (r+dd)/(2*Math.PI)];
                uv4 = [(t+dd)/Math.PI, (r+dd)/(2*Math.PI)];

                var v = [];
                var uv = [];
                v = v.concat(p1); uv = uv.concat(uv1);
                v = v.concat(p2); uv = uv.concat(uv2);
                v = v.concat(p4); uv = uv.concat(uv4);

                gl.uniform4f(u_FragColor, 1,1,1,1);
                drawTriangle3DUVNormal(v,uv,v);

                v = [];
                uv = [];
                v = v.concat(p1); uv = uv.concat(uv1);
                v = v.concat(p4); uv = uv.concat(uv4);
                v = v.concat(p3); uv = uv.concat(uv3);
                gl.uniform4f(u_FragColor, 1,0,0,1);
                drawTriangle3DUVNormal(v,uv,v);

            }
        }
    }
}
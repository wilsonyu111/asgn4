function moveForward()
{
    var vector = new vec3(at.elements);
    vector.sub(eye);
    vector.normalize();
    eye.add(vector);
    at.add(vector);
}

function moveBackward()
{
    var vector = new vec3(at.elements);
    vector.sub(eye);
    vector.normalize();
    eye.sub(vector);
    at.sub(vector);
}

function moveLeft()
{
    var vector = new vec3(at.elements); // at - eye
    vector.sub(eye);
    var left = vec3.cross(vector, up);
    left.normalize();
    left.mul(-1);
    eye.add(left);
    at.add(left);
}

function moveRight()
{
    var vector = new vec3(at.elements); // at - eye
    vector.sub(eye);
    var right = vec3.cross(vector, up);
    right.normalize();
    eye.add(right);
    at.add(right);
}

function panLeft()
{
    // rotate around y first
    var vector = new vec3(at.elements); // at - eye
    vector.sub(eye);
    vector.rotateMatrix(3); // rotate by y axis
    at.set(eye);
    at.add(vector);
    return
}

function panRight()
{
    // rotate around y first
    var vector = new vec3(at.elements); // at - eye
    vector.sub(eye);
    vector.rotateMatrix(-3); // rotate by y axis
    at.set(eye);
    at.add(vector);
    return
}
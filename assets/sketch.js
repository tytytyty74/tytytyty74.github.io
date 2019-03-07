var corners = [100, -100, -100, 100];

function setup() {
  var content = document.getElementById("p5");
  var canv = createCanvas(500, 500)
  canv.parent(content);
}
function setmovement(x, y)
    {
        //Sets the motor values for directional movement.
        var motors = [0, 0, 0, 0, 0];
        if (x >= 0 && y >= 0)
        {
            motors[0] = y - x;
            motors[1] = Math.min(-x, -y);
            motors[2] = x - y;
            motors[3] = Math.max(x, y);
        }
        else if (x >= 0)
        {
            motors[0] = Math.min(-x, y);
            motors[1] = abs(y) - x;
            motors[2] = Math.max(x, -y);
            motors[3] = x - abs(y);
        }
        else if (x < 0 && y >= 0)
        {
            motors[0] = Math.max(-x, y);
            motors[1] = abs(x) - y;
            motors[2] = Math.min(x, -y);
            motors[3] = y - abs(x);
        }
        else
        {
            motors[0] = abs(x) - abs(y);
            motors[1] = Math.max(-x, -y);
            motors[2] = abs(y) - abs(x);
            motors[3] = Math.min(x, y);
        }
        motors[4] = motors[0] + motors[1] + motors[2] + motors[3];
        return motors;
    }
function addAll(vectors)
{
    var retval = createVector(0, 0);
    retval.add(vectors[0]);
    retval.add(vectors[1]);
    retval.add(vectors[2]);
    retval.add(vectors[3]);
    return retval;
}
var toggle = false;
var cornersVectors;
function draw() {
  toggle = !toggle;
  height = (windowWidth/5);
  width = height;
  if (toggle)
  {
    resizeCanvas(width, width);
  }
  background(51);
  stroke(255)
  noFill();
  var x = -(mouseX-(width/2));
  var y = -(mouseY-(height/2));
  x = map(x, -width/2, width/2, -width/5, width/5)
  y = map(y, -width/2, width/2, -width/5, width/5)
  corners = setmovement(x, y);
  cornersVectors = [createVector(corners[0], -corners[0]),
  createVector(corners[1], corners[1]),
  createVector(-corners[2], corners[2]),
  createVector(-corners[3], -corners[3])];
  rect(width/10, height/10, width-((width/10)*2), height-((height/10)*2));

  line((width/10)*2, (height/10)*2, ((width/10)*2)+corners[0], ((width/10)*2)-corners[0]);
  
  line(width-((width/10)*2), (height/10)*2, (width-((width/10)*2))+corners[1], ((height/10)*2)+corners[1]);
  
  line(width-((width/10)*2), height-((height/10)*2), (width-((width/10)*2))-corners[2], (height-((height/10)*2))+corners[2]);

  line((width/10)*2, width-((height/10)*2), ((width/10)*2)-corners[3], (width-((height/10)*2))-corners[3]);

  var finalVector = addAll(cornersVectors);
  line(width/2, height/2, (width/2)+finalVector.x, (height/2)+finalVector.y);

  

  
  // put drawing code here
}
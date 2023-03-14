/**
 * Program: Sketch.js
 *
 * Definition: This is a visual representation of the drive code on the FTC 
 *             2019 robot. it is used to demonstrate that the robot moves in 
 *             the correct direction.
 *
 * Author: Katie Silva
 *
 * Date: 3/6/2019
 *
 * History: 3/8/2019 added better comments
 */

//****************************    VARIABLES   *********************************
var corners = [100, -100, -100, 100];
var toggle = false;
var cornersVectors;

/**
 * function: Setup
 *
 * Definition: creates the canvas and puts it in the right place
 *
 * Author: Katie Silva
 *
 * Date: 3/7/2019
 *
 * History: 3/8/2019 added better comments
 */
function setup() {
  var content = document.getElementById("p5");
  var canv = createCanvas(500, 500)
  canv.parent(content);
}

/**
 * function: setmovement
 *
 * Definition: copy pasted from the FTC Aztechs 12566 2019 robot. x and y are controller inputs.
 *
 * Author: Katie Silva
 *
 * Date: 12/6/2018
 *
 * History: 3/7/2019 changed to javascript
 *          3/8/2019 added better comments
 */
function setmovement(x, y)
{
  //Sets the motor values for directional movement.
  //this code is just copied from the actual robot.
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
/**
 * function: addAll
 *
 * Definition: adds all 4 vectors from each corner.
 *
 * Author: Tyler Silva
 *
 * Date: 3/7/2019
 *
 * History: 3/8/2019 added better comments
 */
function addAll(vectors)
{
    var retval = createVector(0, 0);
    retval.add(vectors[0]);
    retval.add(vectors[1]);
    retval.add(vectors[2]);
    retval.add(vectors[3]);
    return retval;
}
/**
 * function: draw
 *
 * Definition: the code that is run every frame. use inline comments to follow 
 *             the logic.
 *
 * Author: Tyler Silva
 *
 * Date: 3/7/2019
 *
 * History: 3/8/2019 added better comments
 */
function draw() {
  //sets the correct width and height for the sceen, 20%, or 1/5 of the total window
  height = (windowWidth/5);
  width = height;

  //only resizes the window every other frame, otherwise it is set into an infinite loop
  toggle = !toggle;

  if (toggle)
  {
    resizeCanvas(width, width);
  }

  //paint the background, and make the color of shapes white, without fill
  background(51);
  stroke(255)
  noFill();

  //set the variables x and y to a mapped mouse position, to make (0, 0) the 
  //center and the numbers not ridiculously large
  var x = -(mouseX-(width/2));
  var y = -(mouseY-(height/2));
  x = map(x, -width/2, width/2, -width/5, width/5)
  y = map(y, -width/2, width/2, -width/5, width/5)

  //get the result from the robot code
  corners = setmovement(x, y);

  //create an array of vectors representing each individual wheel's movement
  cornersVectors = [createVector(corners[0], -corners[0]),
  createVector(corners[1], corners[1]),
  createVector(-corners[2], corners[2]),
  createVector(-corners[3], -corners[3])];

  // create the robot and wheels on screen
  rect(width/10, height/10, width-((width/10)*2), height-((height/10)*2));
  line((width/10)*2, (height/10)*2, ((width/10)*2)+corners[0], ((width/10)*2)-corners[0]);
  line(width-((width/10)*2), (height/10)*2, (width-((width/10)*2))+corners[1], ((height/10)*2)+corners[1]);
  line(width-((width/10)*2), height-((height/10)*2), (width-((width/10)*2))-corners[2], (height-((height/10)*2))+corners[2]);
  line((width/10)*2, width-((height/10)*2), ((width/10)*2)-corners[3], (width-((height/10)*2))-corners[3]);

  //add all wheel forces together to get the force on the whole robot, and paint it onto the screen
  var finalVector = addAll(cornersVectors);
  line(width/2, height/2, (width/2)+finalVector.x, (height/2)+finalVector.y);
}

// Mid Term Assignment for workshops in creative coding 
// By Hossein Askari
// Instructions: just start and move your mouse!
//Inspirations and ideas are written in my document.



let angleX = 0;
let angleY = 0;
let scaleAmount = 1;
let translateX = 0;
let translateY = 0;

function setup() {
 
  createCanvas(400, 400, WEBGL);
}

function draw() {
 // commenting out the background also results in some cool visuals
  background(255);

  // updating angles for rotation based on mouse movement
  angleX = map(mouseX, 0, width, -PI, PI);
  angleY = map(mouseY, 0, height, -PI, PI);

  // Update scale and translation over time 
  scaleAmount = 1 + 0.1 * sin(millis() / 1000);
  translateX = 50 * sin(millis() / 2000);
  translateY = 50 * cos(millis() / 2000);

  drawParabolicCube(translateX, translateY, 100, angleX, angleY, scaleAmount);
}

function drawParabolicCube(translateX, translateY, size, angleX, angleY, scaleAmount) {
  push();
  translate(translateX, translateY);
  rotateX(angleX);
  rotateY(angleY);
  scale(scaleAmount);

  // calculating the parabolic cube's vertices
  let offset = size / 2;
  let vertices = [
    createVector(-offset, -offset, -offset),
    createVector(offset, -offset, -offset),
    createVector(offset, offset, -offset),
    createVector(-offset, offset, -offset),
    createVector(-offset, -offset, offset),
    createVector(offset, -offset, offset),
    createVector(offset, offset, offset),
    createVector(-offset, offset, offset)
  ];

  // draw the parabolic curves for each side of the cube
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      if (vertices[i].dist(vertices[j]) === size) {
        drawParabolicArc(vertices[i], vertices[j], size);
      }
    }
  }
  pop();
}

function drawParabolicArc(start, end, size) {
  let controlPoint = p5.Vector.lerp(start, end, 0.5);
  controlPoint.add(p5.Vector.random2D().mult(random(-size / 4, size / 4)));

  let col = color(random(255), random(255), random(255) );
  stroke(col);
  strokeWeight(random(1, 3));

  noFill();
  beginShape();
  vertex(start.x, start.y, start.z);
  quadraticVertex(controlPoint.x, controlPoint.y, controlPoint.z, end.x, end.y, end.z);
  endShape();
}


//_______________Ball__________
var mode =1; //to End the game when score equal 0
function Ball() {
  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.4;
  this.lift = -10;
  this.velocity = 0;

  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  };

  this.up = function() {
    this.velocity += this.lift;
  };

  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}

//_______________________________________

//___________________PIPE________________

function Pipe() {
  this.spacing = 175;
  this.top = random(height / 6, (3 / 4) * height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 80;
  this.speed = 6;
  this.highlight = false;

  this.hits = function(ball) {
    if (ball.y < this.top || ball.y > height - this.bottom) {
      if (ball.x > this.x && ball.x < this.x + this.w) {

        this.highlight = true;

        return true;
      }
    }

    if(this.highlight == true){
lives--;
    }
    this.highlight = false;
    return false;
  };

  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  };

  this.update = function() {
    this.x -= this.speed;
  };
  this.offscreen = function() {
    if (this.x < -this.w) {

      return true;
    } else {
      return false;
    }
  };
}
//________________________________________


var lives=6;
var score=0;
var ball;
var pipes = [];
var pipe;
function setup() {
  createCanvas(windowWidth, windowHeight);

  ball = new Ball();
  pipe= new Pipe();
  pipes.push(new Pipe());

}

function draw() {

  background(0,0,50);
  if (mode===1){
  fill(255);
  noStroke();
  textSize(20);
  text(`your Lives : ${floor(lives)}`, 50, 50);
text(`score : ${floor(score)}`, 50, 80);
  if(lives<=0){
    lives=0;
    mode=0;
  }


  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();

    pipes[i].update();


    if (pipes[i].hits(ball)) {

      console.log('HIT');


    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  ball.update();
  ball.show();

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
    score++;

  }
}
else if(mode===0){
  background(0);
  fill(255,0,0);
  noStroke();
  textSize(80);
  text(`Game Over `, windowWidth/3, windowHeight/3);
  fill(255);
  noStroke();
  textSize(20);
  text(`   Press Enter to Start a new game `, windowWidth/2.7, windowHeight/2);
  fill(255);
  noStroke();
  textSize(20);
  text(`Your HighScore is ${score}  `, windowWidth/2.4, windowHeight/1.7);
}
}

function keyPressed() {
  if (key == ' ') {
    ball.up();
  }
  if (key === 'Enter') {
    mode=1;
    lives=6;
    score=0;
  }
}

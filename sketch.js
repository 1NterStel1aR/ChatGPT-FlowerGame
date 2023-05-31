let petals = [];
let basket;
let score = 0;
let grade = "";
let startTime;
let elapsedTime;
let isLeftPressed = false;
let isRightPressed = false;
let stopElapsedTime = false;

function setup() {
  createCanvas(600, 400);
  
  for (let i = 0; i < 100; i++) {
    let petal = {
      x: random(width),
      y: random(-100, -10),
      size: random(10, 20),
      speedY: random(1, 5),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.05, 0.05),
      color: [random(255), random(255), random(255, 200, 255)],
    };
    
    petals.push(petal);
  }
  
  basket = {
    x: width / 2,
    y: height - 20,
    width: 80,
    height: 20
  };
  
  startTime = millis();
}

function draw() {
  background(220);
  fullscreen();
  for (let i = 0; i < petals.length; i++) {
    let petal = petals[i];
    
    petal.y += petal.speedY;
    petal.rotation += petal.rotationSpeed;
    
    if (petal.y > height + petal.size) {
      petal.y = random(-100, -10);
    }
    
    push();
    translate(petal.x, petal.y);
    rotate(petal.rotation);
    fill(petal.color);
    noStroke();
    
    // 꽃잎 그리기
    beginShape();
    vertex(0, 0);
    bezierVertex(petal.size / 2, -petal.size / 2, petal.size / 2, petal.size / 2, 0, petal.size);
    bezierVertex(-petal.size / 2, petal.size / 2, -petal.size / 2, -petal.size / 2, 0, 0);
    endShape(CLOSE);
    
    pop();
    
    // 꽃잎과 바구니의 충돌 감지
    if (collides(petal, basket)) {
      petals.splice(i, 1);
      score++;
      updateGrade();
    }
  }
  
  // 바구니 이동
  if (isLeftPressed && !isRightPressed) {
    basket.x = constrain(basket.x - 5, basket.width / 2, width - basket.width / 2);
  } else if (isRightPressed && !isLeftPressed) {
    basket.x = constrain(basket.x + 5, basket.width / 2, width - basket.width / 2);
  }
  
  // 바구니 그리기
  fill(0);
  rectMode(CENTER);
  rect(basket.x, basket.y, basket.width, basket.height);
  
  // 점수와 등급 표시
  textSize(24);
  fill(0);
  text("Score: " + score, 10, 30);
  
  if (score === 100) {
    if (!stopElapsedTime) {
      elapsedTime = millis() - startTime;
      stopElapsedTime = true;
    }
    
    let seconds = Math.floor(elapsedTime / 1000);
    text("Elapsed Time: " + seconds + " seconds", 10, 60);
    text("Grade: " + grade, 10, 90);
  }
}

function collides(petal, basket) {
  if (petal.y + petal.size / 2 > basket.y - basket.height / 2 &&
      petal.x + petal.size / 2 > basket.x - basket.width / 2 &&
      petal.x - petal.size / 2 < basket.x + basket.width / 2) {
    return true;
  }
  return false;
}

function updateGrade() {
  let seconds = elapsedTime / 1000
  
  if (seconds < 15) {
    grade = "Master";
  } else if (seconds < 20) {
    grade = "Advanced";
  } else if (seconds < 25) {
    grade = "Intermediate";
  } else if (seconds < 30) {
    grade = "Beginner";
  } else {
    grade = "Novice";
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    isLeftPressed = true;
  } else if (keyCode === RIGHT_ARROW) {
    isRightPressed = true;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    isLeftPressed = false;
  } else if (keyCode === RIGHT_ARROW) {
    isRightPressed = false;
  }
}

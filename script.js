/* Global Constants and variables*/
var scene;
var camera;
var renderer;
var skyTexture;
var background;
var groundTexture;
var grass;
var launcherTexture;
var launcher;
var missileArray =[];
var missileSphere;
var antiMissileSphere;
var antiMissileArray=[];
var antimissile;
var buildingTexture;
var buildingTexture1, buildingTexture2, buildingTexture3;
var building, building1, building2, building3, building4, building5;
var buildingArray =[];
var antiMissileDirection = [];
var speed;
var level = 1;
var count = 0;
var numberOfMissiles = 1;
var score = 0;
var scoreDisplay;
var x = 0;
var y = 0;
var temp;
var index = -1;

// This function will create the scene and add all the objects in the scene
function createScene(width,height) {
  //Background Texture
  skyTexture = new THREE.TextureLoader().load('images/sky.jpg');
  background = new THREE.Mesh(new THREE.PlaneGeometry(width,height), new THREE.MeshLambertMaterial({map: skyTexture}));
  scene.add(background);

  //Ground Texture which is grass
  groundTexture = new THREE.TextureLoader().load('images/grass.jpg');
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  grass = new THREE.Mesh(new THREE.PlaneGeometry(400,45), new THREE.MeshPhongMaterial({map: groundTexture}));
  grass.position.y = -110;
  scene.add(grass);

  //Creating building with different textures
  buildingTexture = new THREE.TextureLoader().load('images/building2.jpg');
  buildingTexture.wrapS = THREE.RepeatWrapping;
  buildingTexture.wrapT = THREE.RepeatWrapping;
  building = new THREE.Mesh(new THREE.BoxGeometry(30,40,10), new THREE.MeshPhongMaterial({map: buildingTexture}));
  building.position.x = -65;
  building.position.y = -80;
  building.rotation.y = 180;
  scene.add(building);
  buildingArray.push(building);

  building1 = new THREE.Mesh(new THREE.BoxGeometry(30,40,10), new THREE.MeshPhongMaterial({map: buildingTexture}));
  building1.position.x = 100;
  building1.position.y = -80;
  building1.rotation.y = 65;
  scene.add(building1);
  buildingArray.push(building1);

  buildingTexture1 = new THREE.TextureLoader().load('images/building3.jpg');
  buildingTexture1.wrapS = THREE.RepeatWrapping;
  buildingTexture1.wrapT = THREE.RepeatWrapping;
  building2 = new THREE.Mesh(new THREE.BoxGeometry(30,40,10), new THREE.MeshPhongMaterial({map: buildingTexture1}));
  building2.position.x = -140;
  building2.position.y = -80;
  building2.rotation.y = 45;
  scene.add(building2);
  buildingArray.push(building2);


  buildingTexture2 = new THREE.TextureLoader().load('images/glassbuilding.jpg');
  buildingTexture2.wrapS = THREE.RepeatWrapping;
  buildingTexture2.wrapT = THREE.RepeatWrapping;
  building3 = new THREE.Mesh(new THREE.BoxGeometry(30,40,10), new THREE.MeshPhongMaterial({map: buildingTexture2}));
  building3.position.x = -100;
  building3.position.y = -80;
  building3.rotation.y = 45;
  scene.add(building3);
  buildingArray.push(building3);

  buildingTexture3 = new THREE.TextureLoader().load('images/building4.jpg');
  buildingTexture3.wrapS = THREE.RepeatWrapping;
  buildingTexture3.wrapT = THREE.RepeatWrapping;
  building4 = new THREE.Mesh(new THREE.BoxGeometry(30,40,10), new THREE.MeshPhongMaterial({map: buildingTexture3}));
  building4.position.x = 140;
  building4.position.y = -80;
  building4.rotation.y = 65;
  scene.add(building4);
  buildingArray.push(building4);

  building5 = new THREE.Mesh(new THREE.BoxGeometry(30,40,15), new THREE.MeshPhongMaterial({map: buildingTexture1}));
  building5.position.x = 65;
  building5.position.y = -80;
  building5.rotation.y = 40;
  scene.add(building5);
  buildingArray.push(building5);

  // Creating the launcher from where the antimissiles will be launched
  launcherTexture = new THREE.TextureLoader().load('images/launcher1.jpg');
  launcherTexture.wrapS = THREE.RepeatWrapping;
  launcherTexture.wrapT = THREE.RepeatWrapping;
  launcher= new THREE.Mesh(new THREE.TetrahedronGeometry(30, 1), new THREE.MeshBasicMaterial({map: launcherTexture}));
  launcher.position.x = 0;
  launcher.position.y = -80;
  launcher.rotation.x = 180;
  launcher.rotation.y = 48;
  scene.add(launcher);

  //Creating light to give 3-d effect
  var pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.x = 10;
  pointLight.position.y = 120;
  pointLight.position.z = 130;
  scene.add(pointLight);
}

// This function will initialize the scene, camera and also handle mouse on click event
function init() {
  var imageCanvas = document.getElementById("myImageCanvas");
  var scoreCanvas = document.getElementById("score");
  var width = imageCanvas.width;
  var height = imageCanvas.height;
  var offsetLeft = imageCanvas.offsetLeft;
  var offsetTop = imageCanvas.offsetTop;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45,width/height,0.1,1000);
  renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
  scene.add(camera);
  camera.position.z = 300;
  renderer.setSize(width,height);
  document.body.appendChild(renderer.domElement);
  createScene(width,height);

  //Create Sound
  var listener = new THREE.AudioListener();
  camera.add(listener);
  var backgroundSound = new THREE.Audio(listener);
  var audioLoader = new THREE.AudioLoader().load('sounds/background.mp3',function (buffer) {
    backgroundSound.setBuffer( buffer );
	  backgroundSound.setLoop( true );
	  backgroundSound.setVolume( 0.5 );
	  backgroundSound.play();
  });

  // Event Listener when we press the mouse to lauch antimissiles
  imageCanvas.addEventListener("mousedown",function (event) {
    x = Math.floor((event.pageX * 320) / 800 - 160);
    temp = Math.floor((event.pageY * 240) / 600 - 120);
    y = -temp;
    index++;

    // Create AntiMissiles with sound
    antiMissileSphere = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshPhongMaterial({color: 0x00FF00}));
    antiMissileSphere.position.x = 0;
    antiMissileSphere.position.y = -80;
    scene.add(antiMissileSphere);
    antiMissileArray.push({antiMissileSphere: antiMissileSphere});
    var missileReleased = new THREE.Audio(listener);
    var audioLoader1 = new THREE.AudioLoader().load('sounds/missileReleased.wav',function (buffer) {
      missileReleased.setBuffer( buffer );
  	  missileReleased.setVolume( 0.3 );
  	  missileReleased.play();
    });
    antiMissileDirection[index] = new THREE.Vector2(x, y);
    var newDirection = { x:antiMissileDirection[index].x, y: antiMissileDirection[index].y };

    // We have used TWEEN JS for animation from source to target
    var tween = new TWEEN.Tween( antiMissileArray[index].antiMissileSphere.position).to( newDirection, 500 );
    tween.start();
    tween.onComplete(function () {
      for (var i = 0; i < missileArray.length; i++) {
          if (Math.sqrt(Math.pow(missileArray[i].missileSphere.position.x - newDirection.x, 2),
            Math.pow(missileArray[i].missileSphere.position.y - newDirection.y, 2)) < 10) {
              scene.remove(missileArray[i].missileSphere);
              scene.remove(antiMissileArray[index].antiMissileSphere);
              score += 100;
              scoreDisplay = "Score: "+ score;
              scoreCanvas.innerHTML = scoreDisplay;
              missileArray.splice(i, 1);
              break;
          }
          else {
              scene.remove(antiMissileArray[index].antiMissileSphere);
          }
      }
      scene.remove(antiMissileArray[index].antiMissileSphere);
      });
  });

}

// Creating the missiles which will come from the top of the screen
function createMissile() {
    missileSphere = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshPhongMaterial({color: 0xFFFF00}));
    missileSphere.position.x = Math.floor(Math.random() * (160 - (-160) + 1)) + (-160);
    missileSphere.position.y = 120;
    scene.add(missileSphere);
    missileArray.push({missileSphere : missileSphere});
    numberOfMissiles++;
    count++;
}

// Moving the missiles from top to bottom and checking if the missiles collide with the buildings
// if they do we will remove both else we will remove missile as it touches the ground.
function moveMissile() {
      for (var i = 0; i < missileArray.length; i++) {
        if (missileArray[i].missileSphere.position.y == -80) {
          if (missileArray[i].missileSphere.position.x < -50 && missileArray[i].missileSphere.position.x > -80) {
            scene.remove(building);
            buildingArray.splice(i,1);
            if (missileArray.length==1) {
              gameOver();
            }
          }
          else if (missileArray[i].missileSphere.position.x > 85 && missileArray[i].missileSphere.position.x < 115) {
            scene.remove(building1);
            buildingArray.splice(i,1);
            if (missileArray.length==1) {
              gameOver();
            }
          }
          else if (missileArray[i].missileSphere.position.x < -125 && missileArray[i].missileSphere.position.x > -155) {
            scene.remove(building2);
            buildingArray.splice(i,1);
            if (missileArray.length==1) {
              gameOver();
            }
          }
          else if (missileArray[i].missileSphere.position.x < -85 && missileArray[i].missileSphere.position.x > -115) {
            scene.remove(building3);
            buildingArray.splice(i,1);
            if (missileArray.length==1) {
              gameOver();
            }
          }
          else if (missileArray[i].missileSphere.position.x > 125 && missileArray[i].missileSphere.position.x < 155) {
            scene.remove(building4);
            buildingArray.splice(i,1);
            if (missileArray.length==1) {
              gameOver();
            }
          }
          else if (missileArray[i].missileSphere.position.x > 50 && missileArray[i].missileSphere.position.x < 80) {
            scene.remove(building5);
            buildingArray.splice(i,1);
            if (missileArray.length==1) {
              gameOver();
            }
          }
          else if (missileArray[i].missileSphere.position.x > -20 && missileArray[i].missileSphere.position.x < 24) {
            scene.remove(launcher);
            gameOver();
          }
          scene.remove(missileArray[i].missileSphere);
          missileArray.splice(i, 1);

        }
        else {
          missileArray[i].missileSphere.position.y -= 0.5;
        }
      }

}

// Checks the number of missiles and based on then will generate missiles in different speeds
// For level 1 it will be very slow and then it will increase gradually as levels increase.
function missileGeneration() {
  speed = Math.random()*10;
  var levelCanvas = document.getElementById("level");
  var levelDisplay;
  if (numberOfMissiles>0 && numberOfMissiles<10) {
    if (speed>1 && speed<1.1) {
        createMissile();
        level = 1;
        levelDisplay = "Level: "+level;
        levelCanvas.innerHTML = levelDisplay;
    }
  }
  else if (numberOfMissiles>9 && numberOfMissiles<20) {
    if (speed>1 && speed<1.15) {
         createMissile();
         level = 2;
         levelDisplay = "Level: "+level;
         levelCanvas.innerHTML = levelDisplay;
     }
  }
  else if (numberOfMissiles>19 && numberOfMissiles<30) {
    if (speed>1 && speed<1.2) {
        createMissile();
        level = 3;
        levelDisplay = "Level: "+level;
        levelCanvas.innerHTML = levelDisplay;
    }
  }
  else if (numberOfMissiles>29 && numberOfMissiles<40){
    if (speed>1 && speed<1.3) {
        createMissile();
        level = 4;
        levelDisplay = "Level: "+level;
        levelCanvas.innerHTML = levelDisplay;
    }
  }
  // else if (numberOfMissiles>39 && numberOfMissiles<50){
  //   if (speed>1 && speed<1.5) {
  //       createMissile();
  //   }
  // }
  else if (numberOfMissiles == 40) {
    victory();
  }
}

// Victory function which indicates that the there are no more missiles left and you have saved your city
function victory() {
  var gameOverCanvas = document.getElementById("gameOver");
  var gameOverDisplay = "You won the Game! Your Score is: "+score;
  gameOverCanvas.innerHTML = gameOverDisplay;
  numberOfMissiles = 50;
  scene.remove(building);
  scene.remove(building1);
  scene.remove(building2);
  scene.remove(building3);
  scene.remove(building4);
  scene.remove(building5);
  scene.remove(launcher);

}

// IF you are unable to protect the launcher or all the buildings game will be over and it will display the score
function gameOver() {
  var gameOverCanvas = document.getElementById("gameOver");
  var gameOverDisplay = "GAME OVER! Your Score is: "+score;
  gameOverCanvas.innerHTML = gameOverDisplay;
  numberOfMissiles = 50;
  scene.remove(building);
  scene.remove(building1);
  scene.remove(building2);
  scene.remove(building3);
  scene.remove(building4);
  scene.remove(building5);
  scene.remove(launcher);

}

// This function does the animation and generates the image at 60 FPS to provide animation
function draw() {
  requestAnimationFrame(draw);
  if (numberOfMissiles < 50) {
    missileGeneration();
  }
  moveMissile();
  TWEEN.update();
  renderer.render(scene,camera);
}

// Main function from where the program execution starts
function main() {
  init();
  draw();
}

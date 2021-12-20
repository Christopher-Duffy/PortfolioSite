const canvas = document.getElementById("babylonCanvas");
const engine = new BABYLON.Engine(canvas,true);
var player;
const createScene = function () {
    
    const scene = new BABYLON.Scene(engine);  

    
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // This creates and initially positions a follow camera 	
    var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), scene);
	
	//The goal distance of camera from target
	camera.radius = 30;
	
	// The goal height of camera above local origin (centre) of target
	camera.heightOffset = 20;
	
	// The goal rotation of camera around local origin (centre) of target in x y plane
	camera.rotationOffset = 0;
	
	//Acceleration of camera in moving from current to goal position
	camera.cameraAcceleration = 0.05
	
	//The speed at which acceleration is halted 
	camera.maxCameraSpeed = 10

    BABYLON.SceneLoader.ImportMesh(null, "meshes/", "car.babylon", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        player = newMeshes[0];
        player.scaling.x=.5;
        player.scaling.y=.5;
        player.scaling.z=.5;
        player.position.y=1;
        camera.lockedTarget = player;
    });

    return scene;
};

const scene = createScene();

for (var i=0;i<15;i++){
    var box = BABYLON.MeshBuilder.CreateBox("box", {})
    box.position.y = 0.5;
    box.position.x = Math.floor(Math.random()*10)-5;
    box.position.z = Math.floor(Math.random()*10)-5; 
}







engine.runRenderLoop(function (){
    
    scene.render();
});

window.addEventListener("resize",function(){
    engine.resize();
});

function handleKeyDown(event){
    if (event.key=='w'){
        player.position.z--;
    }
    if (event.key=='s'){
        player.position.z++;
    }
    if (event.key=='a'){
        player.rotation.y--;
    }
    if (event.key=='d'){
        player.rotation.y++;
    }
}

document.addEventListener('keydown',handleKeyDown);

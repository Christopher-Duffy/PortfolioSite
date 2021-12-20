const canvas = document.getElementById("babylonCanvas");
const engine = new BABYLON.Engine(canvas,true);

const createScene = function () {
    
    const scene = new BABYLON.Scene(engine);  

    
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    return scene;
};

const scene = createScene();

for (var i=0;i<15;i++){
    var box = BABYLON.MeshBuilder.CreateBox("box", {})
    box.position.y = 0.5;
    box.position.x = Math.floor(Math.random()*10)-5;
    box.position.z = Math.floor(Math.random()*10)-5; 
}
var player;
BABYLON.SceneLoader.ImportMesh(null, "meshes/", "car.babylon", scene, function (newMeshes) {
    // Set the target of the camera to the first imported mesh
    player = newMeshes[0];
    player.scaling.x=.5;
    player.scaling.y=.5;
    player.scaling.z=.5;
    player.position.y=1;
});

const camera = new BABYLON.FollowCamera("camera", new BABYLON.Vector3(5, 5, 0), scene, player);
camera.lockedTarget = player;
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

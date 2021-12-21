
const canvas = document.getElementById("babylonCanvas");
const engine = new BABYLON.Engine(canvas,true);
var player;
var camera;
var shadowGenerator;
const createScene = function () {
    
    const scene = new BABYLON.Scene(engine);

    var gravityVector = new BABYLON.Vector3(0,-20, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    //const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:1000, height:1000});

    var grassMat = new BABYLON.StandardMaterial("grass");

	grassMat.diffuseTexture = new BABYLON.Texture("grassTile.png");
    grassMat.bumpTexture = new BABYLON.Texture("grassNormalMap.png");
    grassMat.diffuseTexture.uScale = 50.0;
    grassMat.diffuseTexture.vScale = 50.0;
    grassMat.bumpTexture.uScale = 50.0;
    grassMat.bumpTexture.vScale = 50.0;
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "HeightMap.png", 1000, 1000, 500, 0, 1, scene, false, function () {
		ground.imposter = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, { mass: 0 });
        ground.material = grassMat;    
    });
    
    //ground.impostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);
	light.intensity = 0.5;
    
    shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    ground.receiveShadows = true;
    
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);



    // This creates and initially positions a follow camera 	
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(5, 50, -50), scene);

// Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    
    player = BABYLON.MeshBuilder.CreateSphere("player", {})
    player.position.y=20;
    player.imposter = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 10, restitution: 0.9 }, scene);
    shadowGenerator.addShadowCaster(player);
    var myMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);

    myMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
    myMaterial.specularColor = new BABYLON.Color3(0, 0.2, 0.2);
    myMaterial.ambientColor = new BABYLON.Color3(0,0,1);

    player.material = myMaterial;

    camera.lockedTarget = player;
    
     scene.registerBeforeRender(function(){
         camera.position.x=player.position.x+5;
         camera.position.y=player.position.y+50;
         camera.position.z=player.position.z-50;

    });

    return scene;
};
const scene = createScene();



for (var i=0;i<100;i++){
    BABYLON.SceneLoader.ImportMesh("", "./", "tree.babylon", scene, function (meshes) {
    var box = meshes[0]
    box.position.y = 2;
    box.position.x = Math.random()*100-50;
    box.position.z = Math.random()*100-50;
    new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    });

}

BABYLON.SceneLoader.ImportMesh("", "./", "kicker.babylon", scene, function (meshes) {
    var kicker = meshes[0]
    kicker.scaling.x = 5;
    kicker.scaling.y = 5;
    kicker.scaling.z = 5;
    kicker.position.y = 5;
    kicker.position.x = -10;
    kicker.position.z = -10;
    new BABYLON.PhysicsImpostor(kicker, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0 }, scene);
    });

    BABYLON.SceneLoader.ImportMesh("", "./", "portal.babylon", scene, function (meshes) {
        var kicker = meshes[0]
        kicker.scaling.x = 5;
        kicker.scaling.y = 5;
        kicker.scaling.z = 5;
        kicker.position.y = 4;
        kicker.position.x = 100;
        kicker.position.z = 100;
        new BABYLON.PhysicsImpostor(kicker, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0 }, scene);
        });



engine.runRenderLoop(function (){
    scene.render();
});

window.addEventListener("resize",function(){
    engine.resize();
});

function handleKeyDown(event){
    if (event.key=='w'){
        player.imposter.setLinearVelocity(new BABYLON.Vector3(0,0,20));
    }
    if (event.key=='s'){
        player.imposter.setLinearVelocity(new BABYLON.Vector3(0,0,-20));
    }
    if (event.key=='a'){
        player.imposter.setLinearVelocity(new BABYLON.Vector3(-20,0,0));
    }
    if (event.key=='d'){
        player.imposter.setLinearVelocity(new BABYLON.Vector3(20,0,0));
    }
}
function handleMouse(event){
var xPercent = (event.clientX/document.body.clientWidth*200)-100;
var zPercent = (event.clientY/document.body.clientHeight*200)-100;
console.log("click is x: "+xPercent +"% and y: "+zPercent+"%.");
player.imposter.setLinearVelocity(new BABYLON.Vector3(xPercent/10,0,-zPercent/10));
}

document.addEventListener('click' , handleMouse);
document.addEventListener('mousemove' , handleMouse);
document.addEventListener('keydown',handleKeyDown);

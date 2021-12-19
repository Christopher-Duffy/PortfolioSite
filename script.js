const canvas = document.getElementById("babylonCanvas");
const engine = new BABYLON.Engine(canvas,true);

const createScene = function () {
    
    const scene = new BABYLON.Scene(engine);  

    BABYLON.MeshBuilder.CreateBox("box", {})

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function (){
    scene.render();
});

window.addEventListener("resize",function(){
    engine.resize();
});


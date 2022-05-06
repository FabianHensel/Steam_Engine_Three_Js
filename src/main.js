// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// main.js

// External libraries**
document.write('<script type="text/javascript" src="../lib/three.js-r103/build/three.js"></script>');
document.write('<script type="text/javascript" src="../lib/ThreeCSG-1/three-csg.js"></script>');
document.write('<script type="text/javascript" src="../lib/dat.gui-0.7.6/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-r103/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-r103/examples/js/libs/tween.min.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-r103/examples/js/libs/inflate.min.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-r103/examples/js/libs/stats.min.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-r103/examples/js/loaders/FBXLoader_r90.js"></script>');
document.write('<script type="text/javascript" src="../lib/cannon.js-0.6.2/build/cannon.js"></script>');
document.write('<script type="text/javascript" src="../lib/cannon.js-0.6.2/tools/threejs/CannonDebugRenderer.js"></script>');

// Own modules
document.write('<script type="text/javascript" src="src/objects/SteamEngine.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Lights.js"></script>');
document.write('<script type="text/javascript" src="src/objects/SteamEngineFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Animation.js"></script>');
document.write('<script type="text/javascript" src="src/objects/TableFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/physics/Physics.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Floor.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Walls.js"></script>');
document.write('<script type="text/javascript" src="src/sound/Sound.js"></script>');

// Event functions
document.write('<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeKeyAction.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    // Szene
    scene = new THREE.Scene();

    // Physics Einstellungen
    physics = new Physics();
    // Gravitation(x, y, z), Zeitschrittweite, Boden erzeugen
    physics.initialize(0, -200, 0, 1/60, true);
    //                                            Three.js-Szene;  Cannon.js-Welt
    // physicsVisualDebugger = new THREE.CannonDebugRenderer(scene, physics.getWorld());

    // Hinzufügen von Sound
    sound = new Sound();

    // Hinzufügen von Koordinatenachsen; size gibt die Länge der Achsen an
    /*var axes = new THREE.AxesHelper(20);
    scene.add(axes);*/

    // Einbinden der Klasse SteamEngine()
    var steamEngine = new SteamEngine();
    steamEngine.position.set(-20, 74, 10)
    steamEngine.rotation.y = 20 * DEG_TO_RAD;
    physics.addBox(steamEngine, 1, 10, 19, 36.8, 0, 8.6, -13);
    // refDistance: Entfernung, ab der die Lautstärke abnimmt; cone: Schallkegel
    sound.addSound(steamEngine, "src/sound/files/airRelease_Primitive.mp3",5, true);
    scene.add(steamEngine);

    // Einbinden der Klasse SteamEngineFromFile()
    var steamEngineFromFile = new SteamEngineFromFile();
    steamEngineFromFile.position.set(20, 72, 10);
    steamEngineFromFile.rotation.y = -20 * DEG_TO_RAD;
    physics.addBox(steamEngineFromFile, 1, 10, 19, 36.8, 0, 10.6, -10.4);
    sound.addSound(steamEngineFromFile, "src/sound/files/airRelease.mp3",5, true);
    scene.add(steamEngineFromFile);

    // Einbinden der Klasse TableFromFile
    var tableFromFile = new TableFromFile();
    physics.addBox(tableFromFile, 0, 130, 3, 70, 0, 71.5, 0);
    scene.add(tableFromFile);

    // Hinzufügen eines Bodens
    scene.add(new Floor(500, 500, 8));

    // Hinzufügen der Wände
    scene.add(new Walls(6));

    // Einbinden der Klasse Lights()
    var lights = new Lights();
    scene.add(lights.createAmbientLight());
    var directionalLight = lights.createDirectionalLight(-70, 100, 65);
    scene.add(directionalLight);

    // Kamera Einstellungen: Öffnungswinkel alpha, Seitenverhältnis, Abstand der near-Plane, Abstand der far-Plane
    camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
    camera.position.set(0, 150, 150);
    camera.lookAt(0, 0, 0);
    // Der Audio-Listener des Soundsystems wird der Kamera hinzugefügt, d.h. Sounds werden relativ zur Kamera wiedergegeben
    camera.add(sound.getAudioListener());

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0, 83, 0);
    orbitControls.update();

    // dat.GUI Einstellungen
    var gui = new dat.GUI();
    gui.add(directionalLight.position, "x", -200, 200);
    gui.add(directionalLight.position, "y", -200, 200);
    gui.add(directionalLight.position, "z", -200, 200);
    // Deaktivierung der Orbit Controls bei Verwendung des dat.GUI
    gui.domElement.onmouseenter = function () {
        orbitControls.enabled = false;
    };
    gui.domElement.onmouseleave = function () {
        orbitControls.enabled = true;
    };

    // FPS-Anzeige
    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // Renderer Einstellungen
    renderer = new THREE.WebGLRenderer({antialias: true});
    // Größe des Framebuffers
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Hintergrundfarbe des Framebuffers
    renderer.setClearColor(new THREE.Color(0xffffff));
    // Schatten aktivieren
    renderer.shadowMap.enabled = true;

    // Integration des Renderer-Outputs in die HTML-Struktur
    document.getElementById("3d_content").appendChild(renderer.domElement);

    // Objekt zum ermitteln der Zeit zwischen zwei Schleifendurchläufen
    var clock = new THREE.Clock();

    // Definition der Hauptschleife
    function mainLoop() {

        stats.begin();

        // Animation: Vergangene Zeit (in Sekunden) seit dem letzten Durchlauf
        var delta = clock.getDelta();

        // Physics: Vergangene Zeit (in Sekunden) seit dem letzten Durchlauf
        physics.update(delta);
        // physicsVisualDebugger.update();

        // Aufruf der update()-Methode des globalen Animations-Objekts
        schwungradAnimation.update(delta);
        gewichtAnimation.update(delta);

        // Update aller laufender Tweens
        TWEEN.update();

        // Update des steamEngineAnimationMixer
        if (steamEngineAnimationMixer != null) {
            steamEngineAnimationMixer.update(delta);
        }

        stats.end();

        // Rendern der Szene
        renderer.render(scene, camera);
        // Anfrage zur nächstmöglichen Ausführung von mainLoop()
        requestAnimationFrame(mainLoop);
    }

    // Erstmalige Ausführung
    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;
}

window.onload = main;
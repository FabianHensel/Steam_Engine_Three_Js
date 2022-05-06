// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// SteamEngineFromFile.js

// Laden der Datei SteamEngine6.fbx

SteamEngineFromFile = function () {

    var steamEngine = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    // Globale AnimationMixer Variable
    steamEngineAnimationMixer = null;

    // Funktion: Callback-Funktion zur Verarbeitung des geladenen Modells
    fbxloader.load("src/models/SteamEngine/SteamEngine6.fbx", function (object) {

        steamEngine.add(object);

        // Auslesen der Mesh-Namen
        object.traverse(function (child) {

            if (child.isMesh) {
                child.castShadow = true;
                console.log(child.name);
            }
        });

        steamEngineAnimationMixer = new THREE.AnimationMixer(object);

        // Auslesen der Animationen
        for (var i = 0; i < object.animations.length; i++) {
            console.log(object.animations[i].name);
            var action = steamEngineAnimationMixer.clipAction(object.animations[i]);
            // Am Ende zurücksetzen
            action.clampWhenFinished = false;
            // Vor- und zurückspielen der Animation (einmalig)
            action.setLoop(THREE.LoopPingPong,2);
        }
    });

    return steamEngine;
}
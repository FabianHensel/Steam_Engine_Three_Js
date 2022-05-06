// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// executeRaycast.js

// Ausführen eines Raycasts bei Auftreten des window-Events "click"

raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        var firstHit = intersects[0].object;
        // console.log(firstHit.name);

        // Trefferabfrage für steamEngine
        if (firstHit.name === "Schwungrad" || firstHit.name === "Gewicht") {
            firstHit.userData.toggleAnimationEndPosition();
        }
        else if (firstHit.name === "Pleuelstange" || firstHit.name === "Pleuel" || firstHit.name === "Pleuelstück" || firstHit.name === "Pleuelhalter" || firstHit.name === "Kesselgestell") {
            firstHit.userData.forward = !firstHit.userData.forward;
            if(firstHit.userData.forward) {
                firstHit.userData.backwardTween.stop();
                firstHit.userData.forwardTween.start();
            } else {
                firstHit.userData.forwardTween.stop();
                firstHit.userData.backwardTween.start();
            }
        }
        else if (firstHit.name === "Ventil" || firstHit.name === "Verschlussschraube1" || firstHit.name === "Verschlussschraube2") {
            firstHit.userData.forward = !firstHit.userData.forward;
            if(firstHit.userData.forward) {
                firstHit.userData.backwardTween.stop();
                firstHit.userData.forwardTween.start();
                sound.getSounds()["src/sound/files/airRelease_Primitive.mp3"].setVolume(1.0);
                sound.getSounds()["src/sound/files/airRelease_Primitive.mp3"].play();
            } else {
                firstHit.userData.forwardTween.stop();
                firstHit.userData.backwardTween.start();
            }
        }

        // Trefferabfrage für steamEngine_FBX
        if (firstHit.name === "Schwungrad_FBX") {
            // Prüfen ob die Schwungrad-Animation aktiv ist, wenn nicht wird die Schwungrad-Animation, die Pleuel-Animation und die Zylinder-Animation aktiviert und zurückgesetzt
            if (!steamEngineAnimationMixer.existingAction("Schwungrad_FBX|Schwungrad_Action").enabled) {
                steamEngineAnimationMixer.existingAction("Schwungrad_FBX|Schwungrad_Action").enabled = true;
                steamEngineAnimationMixer.existingAction("Schwungrad_FBX|Schwungrad_Action").reset();
                steamEngineAnimationMixer.existingAction("Pleuel_FBX|Pleuel_Action").enabled = true;
                steamEngineAnimationMixer.existingAction("Pleuel_FBX|Pleuel_Action").reset();
                steamEngineAnimationMixer.existingAction("Zylinder_FBX|Zylinder_Action").enabled = true;
                steamEngineAnimationMixer.existingAction("Zylinder_FBX|Zylinder_Action").reset();
            }
            steamEngineAnimationMixer.existingAction("Schwungrad_FBX|Schwungrad_Action").play();
            steamEngineAnimationMixer.existingAction("Pleuel_FBX|Pleuel_Action").play();
            steamEngineAnimationMixer.existingAction("Zylinder_FBX|Zylinder_Action").play();
        }
        if (firstHit.name === "Verschluss_Gestell_FBX") {
            // Prüfen ob die Verschluss_Gestell-Animation aktiv ist, wenn nicht wird sie aktiviert und zurückgesetzt
            if (!steamEngineAnimationMixer.existingAction("Verschluss_Gestell_FBX|Verschluss_Gestell_Action").enabled) {
                steamEngineAnimationMixer.existingAction("Verschluss_Gestell_FBX|Verschluss_Gestell_Action").enabled = true;
                steamEngineAnimationMixer.existingAction("Verschluss_Gestell_FBX|Verschluss_Gestell_Action").reset();
            }
            steamEngineAnimationMixer.existingAction("Verschluss_Gestell_FBX|Verschluss_Gestell_Action").play();
            sound.getSounds()["src/sound/files/airRelease.mp3"].setVolume(1.0);
            sound.getSounds()["src/sound/files/airRelease.mp3"].play();
        }
        if (firstHit.name === "Verschluss_Kessel_FBX") {
            // Prüfen ob die Verschluss_Kessel-Animation aktiv ist, wenn nicht wird sie aktiviert und zurückgesetzt
            if (!steamEngineAnimationMixer.existingAction("Verschluss_Kessel_FBX|Verschluss_Kessel_Action").enabled) {
                steamEngineAnimationMixer.existingAction("Verschluss_Kessel_FBX|Verschluss_Kessel_Action").enabled = true;
                steamEngineAnimationMixer.existingAction("Verschluss_Kessel_FBX|Verschluss_Kessel_Action").reset();
            }
            steamEngineAnimationMixer.existingAction("Verschluss_Kessel_FBX|Verschluss_Kessel_Action").play();
            sound.getSounds()["src/sound/files/airRelease.mp3"].setVolume(1.0);
            sound.getSounds()["src/sound/files/airRelease.mp3"].play();
        }
        if (firstHit.name === "Ventil_FBX") {
            // Prüfen ob die Ventil-Animation aktiv ist, wenn nicht wird sie aktiviert und zurückgesetzt
            if (!steamEngineAnimationMixer.existingAction("Ventil_FBX|Ventil_Action").enabled) {
                steamEngineAnimationMixer.existingAction("Ventil_FBX|Ventil_Action").enabled = true;
                steamEngineAnimationMixer.existingAction("Ventil_FBX|Ventil_Action").reset();
            }
            steamEngineAnimationMixer.existingAction("Ventil_FBX|Ventil_Action").play();
            sound.getSounds()["src/sound/files/airRelease.mp3"].setVolume(1.0);
            sound.getSounds()["src/sound/files/airRelease.mp3"].play();
        }
    }
}
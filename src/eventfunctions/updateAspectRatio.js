// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// updateAspectRatio.js

// Aktualisierung des Fensterformats bei Auftreten des Window-Events "resize"

function updateAspectRatio(event) {

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
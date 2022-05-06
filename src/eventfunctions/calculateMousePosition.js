// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// calculateMousePosition.js

// Berechnen der Position des Cursors von Fensterkoordinaten in Gerätekoordinaten bei Auftreten des window-Events "mousemove"

mousePosition = new THREE.Vector2();

function calculateMousePosition(event) {
    mousePosition.x = 2 * (event.clientX / window.innerWidth) - 1;
    mousePosition.y = -2 * (event.clientY / window.innerHeight) + 1;
}
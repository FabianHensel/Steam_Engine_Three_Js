// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// executeKeyAction.js

// Auswertung von Tastatureingaben (Events: keydown, keyup)

var spaceDown = false;

function keyDownAction(event) {
    switch (event.keyCode) {
        case 32:
            if (!spaceDown) {
                spaceDown = true;

                // Throw a ball
                var ballRadius = 2;
                var ballGeometry = new THREE.SphereGeometry(ballRadius, 6, 6);
                var ball = new THREE.Mesh(ballGeometry, new THREE.MeshLambertMaterial({
                    color: 0x262626
                }));
                ball.position.set(camera.position.x, camera.position.y, camera.position.z);
                ball.castShadow = true;
                scene.add(ball);

                // Richtungsvektor in Gerätekoordinaten definieren
                var directionalVectorDC = new THREE.Vector3(0, 0, 1);
                // Umrechnen nach Weltkoordinaten
                var velocityVectorWC = directionalVectorDC.unproject(camera);
                // Normalisieren auf Einheitslänge
                velocityVectorWC.normalize();
                // Entsprechend der Geschwindigkeit mit einem Skalar multiplizieren
                velocityVectorWC.multiplyScalar(600);
                physics.addSphereWithVelocity(ball, 1, ballRadius, velocityVectorWC);
            }
            break;
    }
}

function keyUpAction(event) {
    switch (event.keyCode) {
        case 32:
            spaceDown = false;
            break;
    }
}

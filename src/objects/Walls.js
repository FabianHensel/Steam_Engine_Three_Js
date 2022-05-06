// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// Walls.js

Walls = function(segments) {

    var walls = new THREE.Group();

    var wallGeometry = new THREE.PlaneGeometry(500, 300);
    var wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.8,
        metalness: 0
    });
    var wallTexture = new THREE.TextureLoader().load('src/images/wall2.jpg');
    wallTexture.repeat.set(segments / 2, segments / 2);
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallMaterial.map = wallTexture;

    var wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.z = -250;
    wall1.position.y = 150;
    wall1.receiveShadow = true;
    walls.add(wall1);

    var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall2.position.z = 250;
    wall2.position.y = 150;
    wall2.rotation.y = 180 * DEG_TO_RAD;
    wall2.receiveShadow = true;
    walls.add(wall2);

    var wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall3.position.x = 250;
    wall3.position.y = 150;
    wall3.rotation.y = -90 * DEG_TO_RAD;
    wall3.receiveShadow = true;
    walls.add(wall3);

    var wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall4.position.x = -250;
    wall4.position.y = 150;
    wall4.rotation.y = 90 * DEG_TO_RAD;
    wall4.receiveShadow = true;
    walls.add(wall4);

    return walls;

}
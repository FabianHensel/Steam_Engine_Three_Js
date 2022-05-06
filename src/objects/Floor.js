// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// Floor.js


Floor = function(width, height, segments) {

    var planeGeometry = new THREE.PlaneGeometry(width, height);
    var planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.4,
        metalness: 0
    });
    var planeTexture = new THREE.TextureLoader().load('src/images/floor.jpg');
    planeTexture.repeat.set(segments / 2, segments / 2);
    planeTexture.wrapS = THREE.RepeatWrapping;
    planeTexture.wrapT = THREE.RepeatWrapping;
    planeMaterial.map = planeTexture;
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -90 * DEG_TO_RAD;
    plane.receiveShadow = true;

    return plane;

}
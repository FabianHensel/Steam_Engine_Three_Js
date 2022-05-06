// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// TableFromFile.js

TableFromFile = function () {

    var table = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();
    // Callback-Funktion zur Verarbeitung des geladenen Modells
    fbxloader.load('src/models/Table/Old_Table.fbx', function (object) {

        table.add(object);

        object.traverse(function (child) {
            if (child.isMesh) {
                child.material.map.anisotropy = 8;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    });

    return table;
}
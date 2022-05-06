// Copyright © 2022, Fabian Hensel. All rights reserved.
// Hamburg, Germany
// 06.05.2022
// SteamEngine.js

SteamEngine = function () {

    var steamEngine = new THREE.Group();

    // ================================================================================================================
    // ============================================= Materialien ======================================================
    // ================================================================================================================

    // Aluminium
    var aluminium = new THREE.MeshStandardMaterial({
        color: 0xCECECE,
        roughness: 0.2,
        metalness: 0
    });

    // Dunkleres Eisen
    var eisenDunkel = new THREE.MeshStandardMaterial({
        color: 0x434B4D,
        roughness: 0.25,
        metalness: 0
    });

    // Helleres Eisen
    var eisenHell = new THREE.MeshStandardMaterial({
        color: 0xA5A5A5,
        roughness: 0.255,
        metalness: 0
    });

    // Messing
    var messing = new THREE.MeshStandardMaterial({
        color: 0x918535,
        roughness: 0.3,
        metalness: 0
    });

    // Kupfer
    var kupfer = new THREE.MeshStandardMaterial({
        color: 0xAD6F69,
        roughness: 0.35,
        metalness: 0
    });

    // ================================================================================================================
    // =============================================== GESTELL ========================================================
    // ================================================================================================================

    var gestell = new THREE.Group();

    // Fußgestell
    var fussGestellGeometry = new THREE.BoxGeometry(10, 10.2, 1.85);
    var fussGestell = new THREE.Mesh(fussGestellGeometry, aluminium);
    fussGestell.position.z = 0.1;
    fussGestell.rotation.x = 90 * DEG_TO_RAD;
    fussGestell.castShadow = true;
    gestell.add(fussGestell);

    // Kolbenhalter
    var kolbenHalterGeometry = new THREE.BoxGeometry(3.7, 14.1, 1);
    var kolbenHalter = new THREE.Mesh(kolbenHalterGeometry);
    kolbenHalter.position.y = 7;
    kolbenHalter.position.z = -2.8;

    var schlotGeometry = new THREE.CylinderGeometry(0.3, 0.3, 5, 16, 1, false);
    var schlot = new THREE.Mesh(schlotGeometry);
    schlot.position.y = 11.8;
    schlot.position.z = -2.8;
    schlot.position.x = 0.7;

    var subtractKolbenHalterSchlot = new threecsg.subtract(kolbenHalter, schlot, eisenDunkel);
    subtractKolbenHalterSchlot.castShadow = true;
    gestell.add(subtractKolbenHalterSchlot);

    // Verbindungsteil Hinten
    var verbindungsteilHintenGeometry = new THREE.CylinderGeometry(0.6, 0.6, 2, 16, 1, false);
    var verbindungsteilHinten = new THREE.Mesh(verbindungsteilHintenGeometry, messing);
    verbindungsteilHinten.position.y = 4.69;
    verbindungsteilHinten.position.z = -4;
    verbindungsteilHinten.rotation.x = DEG_TO_RAD * 90;
    verbindungsteilHinten.castShadow = true;
    gestell.add(verbindungsteilHinten);

    // Verbindungsteil Vorne
    var verbingungsteilVorneGeometry = new THREE.CylinderGeometry(0.75, 0.75, 1, 16, 1, false);
    var verbindungsteilVorne = new THREE.Mesh(verbingungsteilVorneGeometry, messing);
    verbindungsteilVorne.position.y = 4.69;
    verbindungsteilVorne.position.z = -1.95;
    verbindungsteilVorne.rotation.x = DEG_TO_RAD * 90;
    verbindungsteilVorne.castShadow = true;
    gestell.add(verbindungsteilVorne);

    // Dampfaufnahme
    var dampfaufnahmeGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 16, 1, false);
    var dampfaufnahme = new THREE.Mesh(dampfaufnahmeGeometry, eisenHell);
    dampfaufnahme.position.z = -2.8;
    dampfaufnahme.position.y = 14.5;
    dampfaufnahme.position.x = -0.7;
    dampfaufnahme.castShadow = true;
    gestell.add(dampfaufnahme);

    steamEngine.add(gestell);

    // ================================================================================================================
    // =========================================== SCHWUNGRADTEILE ====================================================
    // ================================================================================================================

    var schwungradteile = new THREE.Group();

    // ---------------------------------------------- Schwungrad ------------------------------------------------------
    // Schwungrad äußerer Teil
    var schwungradAussenGeometry = new THREE.CylinderGeometry(3.75, 3.75, 2, 64, 1, false);
    var schwungradAussen = new THREE.Mesh(schwungradAussenGeometry);
    schwungradAussen.position.y = 4.69;
    schwungradAussen.position.z = -6;
    schwungradAussen.rotation.x = DEG_TO_RAD * 90;

    // Schwungrad innerer Teil 1
    var schwungradInnenGeometry = new THREE.CylinderGeometry(3.25, 3.25, 2, 64, 1, false);
    var schwungradInnen1 = new THREE.Mesh(schwungradInnenGeometry);
    schwungradInnen1.position.y = 4.69;
    schwungradInnen1.position.z = -7.5;
    schwungradInnen1.rotation.x = DEG_TO_RAD * 90;

    // Schwungrad innerer Teil 2
    var schwungradInnen2 = new THREE.Mesh(schwungradInnenGeometry, eisenDunkel);
    schwungradInnen2.position.y = 4.69;
    schwungradInnen2.position.z = -4.5;
    schwungradInnen2.rotation.x = DEG_TO_RAD * 90;

    // Schwungrad Ausfräßung
    var ausfraesungGeometry = new THREE.CylinderGeometry(0.95, 0.95, 2, 32, 1, false);
    var ausfraesung = new THREE.Mesh(ausfraesungGeometry, eisenDunkel);
    ausfraesung.position.y = 4.69;
    ausfraesung.position.z = -6;
    ausfraesung.rotation.x = DEG_TO_RAD * 90;
    schwungradteile.add(ausfraesung);

    // Abziehen des Schwungrad innerer Teil 1 von Schwungrad äußerer Teil
    var subtractSI1SA = new threecsg.subtract(schwungradAussen, schwungradInnen1, eisenDunkel);
    subtractSI1SA.name = "Schwungrad";
    subtractSI1SA.castShadow = true;
    schwungradteile.add(subtractSI1SA);

    // Abziehen des Schwungrad innerer Teil 2 von vorherig abgezogenen
    /* var schwungrad = new threecsg.subtract(subtractSI1SA, schwungradInnen2, eisenDunkel);
    schwungrad.name = "Schwungrad";
    schwungrad.castShadow = true;
    schwungradteile.add(schwungrad);
     */

    // Animation des Schwungrad's
    schwungradAnimation = new Animation(subtractSI1SA, AnimationType.ROTATION, AnimationAxis.Z);
    schwungradAnimation.setAmount(-360 * DEG_TO_RAD);
    schwungradAnimation.setSpeed(30 * DEG_TO_RAD);
    // Verknüpfung der Animation mit dem animierten Objekt für Zugriff in der Funktion executeRaycast()
    subtractSI1SA.userData = schwungradAnimation;

    // ---------------------------------- Verbindungsstange Schwungrad u. Gewicht -------------------------------------
    var verbindungsstangeGeometry = new THREE.CylinderGeometry(0.32,0.32,6.85,16, 1, false);
    var verbindungsstange = new THREE.Mesh(verbindungsstangeGeometry, eisenDunkel);
    verbindungsstange.position.y = 4.69;
    verbindungsstange.position.z = -3.6;
    verbindungsstange.rotation.x = DEG_TO_RAD * 90;
    schwungradteile.add(verbindungsstange);

    // -------------------------------------------------- Gewicht -----------------------------------------------------
    var gewichtGeometry = new THREE.CylinderGeometry(1.85, 1.85, 1.25, 32, 1, false);
    var texturMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, roughness: 0.2, metalness: 0});
    texturMaterial.map = new THREE.TextureLoader().load('src/images/GewichtInitialien.png');
    var materialArray = [aluminium, texturMaterial, aluminium];
    var gewicht = new THREE.Mesh(gewichtGeometry, materialArray);
    gewicht.position.y = 4.69;
    gewicht.position.z = -0.85;
    gewicht.rotation.x = DEG_TO_RAD * 90;
    gewicht.name = "Gewicht";
    gewicht.castShadow = true;
    schwungradteile.add(gewicht);

    // Animation des Gewicht's
    gewichtAnimation = new Animation(gewicht, AnimationType.ROTATION, AnimationAxis.Y);
    gewichtAnimation.setAmount(-360 * DEG_TO_RAD);
    gewichtAnimation.setSpeed(30 * DEG_TO_RAD);
    gewicht.userData = gewichtAnimation;

    // ----------------------------------------------- Pleuelhalter ---------------------------------------------------
    var pleuelhalterGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1.75, 16, 1, false);
    var pleuelhalter = new THREE.Mesh(pleuelhalterGeometry, eisenDunkel);
    pleuelhalter.position.y = 3.44;
    pleuelhalter.position.z = 0.6;
    pleuelhalter.rotation.x = DEG_TO_RAD * 90;
    pleuelhalter.name = "Pleuelhalter";
    pleuelhalter.castShadow = true;
    schwungradteile.add(pleuelhalter);

    // Animation des Pleuelhalter's
    var pleuelhalterTweens = {
        forward: false,
        forwardTween: new TWEEN.Tween(pleuelhalter.position).to(new THREE.Vector3(pleuelhalter.position.x, pleuelhalter.position.y, pleuelhalter.position.z + 1), 500).easing(TWEEN.Easing.Quadratic.Out),
        backwardTween: new TWEEN.Tween(pleuelhalter.position).to(new THREE.Vector3(pleuelhalter.position.x, pleuelhalter.position.y, pleuelhalter.position.z), 500).easing(TWEEN.Easing.Quadratic.Out)
    }
    pleuelhalter.userData = pleuelhalterTweens;

    steamEngine.add(schwungradteile);

    // ================================================================================================================
    // ============================================ Zylinderteile =====================================================
    // ================================================================================================================

    var zylinderteile = new THREE.Group();

    // Zylinder Halter
    var zylinderHalterGeometry = new THREE.BoxGeometry(2.5, 4.375, 1.5);
    var zylinderHalter = new THREE.Mesh(zylinderHalterGeometry, messing);
    zylinderHalter.position.y = 11.255;
    zylinderHalter.position.z = -1.65;
    zylinderHalter.castShadow = true;
    zylinderteile.add(zylinderHalter);

    // Zylinder
    var zylinderGeometry = new THREE.CylinderGeometry(1.75, 1.75, 4.375, 64, 1, false);
    var zylinder = new THREE.Mesh(zylinderGeometry, eisenDunkel);
    zylinder.position.y = 11.255;
    zylinder.position.z = 0.23;
    zylinder.castShadow = true;
    zylinderteile.add(zylinder);

    // Zylinder Deckel oben
    var deckelObenGeometry = new THREE.CylinderGeometry(2.45, 2.45, 0.3, 64, 1, false);
    var deckelOben = new THREE.Mesh(deckelObenGeometry, eisenDunkel);
    deckelOben.position.y = 13.5925;
    deckelOben.position.z = 0.23;
    deckelOben.castShadow = true;
    zylinderteile.add(deckelOben);

    // Zylinder Deckel unten
    var deckelUnten = new THREE.Mesh(deckelObenGeometry, eisenDunkel);
    deckelUnten.position.y = 8.9175;
    deckelUnten.position.z = 0.23;
    deckelUnten.castShadow = true;
    zylinderteile.add(deckelUnten);

    // Zylinder Stangen
    var zylinderStangeGeometry = new THREE.CylinderGeometry(0.18, 0.18, 6, 16, 1, false);
    var zylinderStange1 = new THREE.Mesh(zylinderStangeGeometry, eisenDunkel);
    zylinderStange1.position.y = 11.255;
    zylinderStange1.position.z = -0.85;
    zylinderStange1.position.x = -1.7;
    zylinderteile.add(zylinderStange1);

    var zylinderStange2 = new THREE.Mesh(zylinderStangeGeometry, eisenDunkel);
    zylinderStange2.position.y = 11.255;
    zylinderStange2.position.z = -0.85;
    zylinderStange2.position.x = 1.7;
    zylinderteile.add(zylinderStange2);

    var zylinderStange3 = new THREE.Mesh(zylinderStangeGeometry, eisenDunkel);
    zylinderStange3.position.y = 11.255;
    zylinderStange3.position.z = 2.23;
    zylinderteile.add(zylinderStange3);

    // Zylinder Muttern
    var zylinderMutterGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 6, 1, false);
    // Zylinder Muttern für oberen Deckel
    var zylinderMutter1 = new THREE.Mesh(zylinderMutterGeometry, eisenHell);
    zylinderMutter1.position.y = 13.8925;
    zylinderMutter1.position.z = -0.85;
    zylinderMutter1.position.x = -1.7;
    zylinderteile.add(zylinderMutter1);

    var zylinderMutter2 = new THREE.Mesh(zylinderMutterGeometry, eisenHell);
    zylinderMutter2.position.y = 13.8925;
    zylinderMutter2.position.z = -0.85;
    zylinderMutter2.position.x = 1.7;
    zylinderteile.add(zylinderMutter2);

    var zylinderMutter3 = new THREE.Mesh(zylinderMutterGeometry, eisenHell);
    zylinderMutter3.position.y = 13.8925;
    zylinderMutter3.position.z = 2.23;
    zylinderteile.add(zylinderMutter3);

    // Zylinder Muttern für unteren Deckel
    var zylinderMutter4 = new THREE.Mesh(zylinderMutterGeometry, eisenHell);
    zylinderMutter4.position.y = 8.6175;
    zylinderMutter4.position.z = -0.85;
    zylinderMutter4.position.x = -1.7;
    zylinderteile.add(zylinderMutter4);

    var zylinderMutter5 = new THREE.Mesh(zylinderMutterGeometry, eisenHell);
    zylinderMutter5.position.y = 8.6175;
    zylinderMutter5.position.z = -0.85;
    zylinderMutter5.position.x = 1.7;
    zylinderteile.add(zylinderMutter5);

    var zylinderMutter6 = new THREE.Mesh(zylinderMutterGeometry, eisenHell);
    zylinderMutter6.position.y = 8.6175;
    zylinderMutter6.position.z = 2.23;
    zylinderteile.add(zylinderMutter6);

    // Zylinder Loch
    var zylinderLochGeometry = new THREE.CylinderGeometry(0.37, 0.37, 1.35, 16, 1, false);
    var zylinderLoch = new THREE.Mesh(zylinderLochGeometry, messing);
    zylinderLoch.position.y = 8.2;
    zylinderLoch.position.z = 0.23;
    zylinderLoch.castShadow = true;
    zylinderteile.add(zylinderLoch);

    // Verbindung Zylinder u. Kolbenhalter
    var ZyKoGeometry = new THREE.CylinderGeometry(0.25, 0.25, 2.6, 16, 1, false);
    var ZyKo = new THREE.Mesh(ZyKoGeometry, eisenDunkel);
    ZyKo.position.y = 11.255;
    ZyKo.position.z = -3.05;
    ZyKo.rotation.x = DEG_TO_RAD * 90;
    ZyKo.castShadow = true;
    zylinderteile.add(ZyKo);

    // Mutter für Verbindung Zylinder u. Kolbenhalter
    var mutterZyKoGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.35, 6, 1, false);
    var mutterZyKo = new THREE.Mesh(mutterZyKoGeometry, eisenHell);
    mutterZyKo.position.y = 11.255;
    mutterZyKo.position.z = -4.15;
    mutterZyKo.rotation.x = DEG_TO_RAD * 90;
    mutterZyKo.castShadow = true;
    zylinderteile.add(mutterZyKo);

    steamEngine.add(zylinderteile);

    // ================================================================================================================
    // ============================================== Kolbenteile =====================================================
    // ================================================================================================================

    var kolbenteile = new THREE.Group();

    // Pleuel
    var pleuelGeometry = new THREE.SphereGeometry(0.62, 16, 16);
    var pleuel = new THREE.Mesh(pleuelGeometry);
    pleuel.position.y = 3.44;
    pleuel.position.z = 4;

    // Zum begradigen der Seiten
    var pleuelFormer1Geometry = new THREE.BoxGeometry(2,2,1);
    var pleuelFormer1 = new THREE.Mesh(pleuelFormer1Geometry);
    pleuelFormer1.position.y = 3.44;
    pleuelFormer1.position.z = 3.15;

    var pleuelFormer2 = new THREE.Mesh(pleuelFormer1Geometry);
    pleuelFormer2.position.y = 3.44;
    pleuelFormer2.position.z = 4.85;

    // Abziehen des PleuelFormer1 von Pleuel
    var subtractPleuelFormer1 = new threecsg.subtract(pleuel, pleuelFormer1);

    // Abziehen des PleuelFormer2 von vorherig abgezogenen
    var subtractPleuelFormer2 = new threecsg.subtract(subtractPleuelFormer1, pleuelFormer2, messing);
    subtractPleuelFormer2.position.z = 0.23;
    subtractPleuelFormer2.rotation.y = DEG_TO_RAD * 180;
    subtractPleuelFormer2.castShadow = true;
    subtractPleuelFormer2.name = "Pleuel";
    kolbenteile.add(subtractPleuelFormer2);

    // Pleuelstück
    var pleuelstueckGeometry = new THREE.CylinderGeometry(0.31, 0.31, 0.8, 16, 1, false);
    var pleuelstueck = new THREE.Mesh(pleuelstueckGeometry, messing);
    pleuelstueck.position.y = 4.23;
    pleuelstueck.position.z = 0.23;
    pleuelstueck.castShadow = true;
    pleuelstueck.name = "Pleuelstück";
    kolbenteile.add(pleuelstueck);

    // Pleuelstange
    var pleuelstangeGeometry = new THREE.CylinderGeometry(0.19, 0.19, 5.5, 16, 1, false);
    var pleuelstange = new THREE.Mesh(pleuelstangeGeometry, eisenDunkel);
    pleuelstange.position.y = 6.8;
    pleuelstange.position.z = 0.23;
    pleuelstange.castShadow = true;
    pleuelstange.name = "Pleuelstange";
    kolbenteile.add(pleuelstange);

    // Animation des Pleuel's
    var pleuelTweens = {
        forward: false,
        forwardTween: new TWEEN.Tween(kolbenteile.position).to(new THREE.Vector3(kolbenteile.position.x, kolbenteile.position.y + 2.4, kolbenteile.position.z), 1500).easing(TWEEN.Easing.Quadratic.Out),
        backwardTween: new TWEEN.Tween(kolbenteile.position).to(new THREE.Vector3(kolbenteile.position.x, kolbenteile.position.y, kolbenteile.position.z), 1500).easing(TWEEN.Easing.Quadratic.Out)
    }
    pleuelstange.userData = pleuelTweens;
    subtractPleuelFormer2.userDate = pleuelTweens;
    pleuelstueck.userData = pleuelTweens;

    steamEngine.add(kolbenteile);

    // ================================================================================================================
    // =============================================== Kesselteile ====================================================
    // ================================================================================================================

    var kesselteile = new THREE.Group();

    // ------------------------------------------------ Kessel --------------------------------------------------------

    // Kessel
    var kesselGeometry = new THREE.CylinderGeometry(3.07, 3.07, 17, 64, 1, false);
    var kessel = new THREE.Mesh(kesselGeometry, kupfer);
    kessel.position.z = -22.4;
    kessel.position.y = 4.69;
    kessel.rotation.x = 90 * DEG_TO_RAD;
    kessel.castShadow = true;
    kesselteile.add(kessel);

    // Kesseldeckel
    var teil1Geometry = new THREE.CylinderGeometry(3.13, 3.13, 0.35, 64, 1, false);
    var teil1 = new THREE.Mesh(teil1Geometry);
    teil1.position.z = -30.73;
    teil1.position.y = 4.69;
    teil1.rotation.x = 90 * DEG_TO_RAD;

    var teil2Geometry = new THREE.CylinderGeometry(3.13, 2.52, 0.34, 64, 1, false);
    var teil2 = new THREE.Mesh(teil2Geometry);
    teil2.position.z = -31.075;
    teil2.position.y = 4.69;
    teil2.rotation.x = 90 * DEG_TO_RAD;

    // Deckel hinten
    var deckelHinten = threecsg.union(teil1, teil2, kupfer);
    kesselteile.add(deckelHinten);

    // Deckel vorne
    var deckelVorne = threecsg.union(teil1, teil2, kupfer);
    deckelVorne.position.z = -13.9;
    deckelVorne.rotation.x = 180 * DEG_TO_RAD;
    kesselteile.add(deckelVorne);

    // ------------------------------------------------ Ventil --------------------------------------------------------

    var ventilAnimation = new THREE.Group();

    // Ventilaufsatz
    var ventilaufsatzGeometry = new THREE.CylinderGeometry(0.82, 0.82, 0.82, 6, 1, false);
    var ventilaufsatz = new THREE.Mesh(ventilaufsatzGeometry, messing);
    ventilaufsatz.position.z = -22.4;
    ventilaufsatz.position.y = 8;
    ventilaufsatz.rotation.y = 30 * DEG_TO_RAD;
    ventilaufsatz.castShadow = true;
    kesselteile.add(ventilaufsatz);

    // Zwischenstück
    var zwischenstueckGeometry = new THREE.CylinderGeometry(0.65, 0.65, 0.3, 16, 1, false);
    var zwischenstueck = new THREE.Mesh(zwischenstueckGeometry, messing);
    zwischenstueck.position.z = -22.4;
    zwischenstueck.position.y = 8.55;
    ventilAnimation.add(zwischenstueck);

    // Ventilverschluss
    var ventilverschlussGeometry = new THREE.CylinderGeometry(0.82, 0.82, 0.4, 6, 1, false);
    var ventilverschluss = new THREE.Mesh(ventilverschlussGeometry, messing);
    ventilverschluss.position.z = -22.4;
    ventilverschluss.position.y = 8.75;
    ventilverschluss.rotation.y = 30 * DEG_TO_RAD;
    ventilverschluss.castShadow = true;
    ventilAnimation.add(ventilverschluss);

    // Ventil
    var ventilGeometry = new THREE.CylinderGeometry(0.41, 0.41, 3, 16, 1, false);
    var ventil = new THREE.Mesh(ventilGeometry, messing);
    ventil.position.z = -22.4;
    ventil.position.y = 10;
    ventil.castShadow = true;
    ventil.name = "Ventil";
    ventilAnimation.add(ventil);

    // Ventil Stellmutter
    var stellmutterGeometry = new THREE.CylinderGeometry(0.41, 0.41, 0.32, 6, 1, false);
    var stellmutter = new THREE.Mesh(stellmutterGeometry, eisenHell);
    stellmutter.position.z = -22.4;
    stellmutter.position.y = 11.66;
    stellmutter.rotation.y = 30 * DEG_TO_RAD;
    stellmutter.castShadow = true;
    ventilAnimation.add(stellmutter);

    // Ventil Stellschraube
    var stellschraubeGeometry = new THREE.CylinderGeometry(0.22, 0.22, 1, 16, 1, false);
    var stellschraube = new THREE.Mesh(stellschraubeGeometry, eisenDunkel);
    stellschraube.position.z = -22.4;
    stellschraube.position.y = 12.2;
    stellschraube.castShadow = true;
    ventilAnimation.add(stellschraube);

    // Animation des Ventil's
    var ventilTweens = {
        forward: false,
        forwardTween: new TWEEN.Tween(ventilAnimation.position).to(new THREE.Vector3(ventilAnimation.position.x, ventilAnimation.position.y + 3, ventilAnimation.position.z), 2000).easing(TWEEN.Easing.Quadratic.Out),
        backwardTween: new TWEEN.Tween(ventilAnimation.position).to(new THREE.Vector3(ventilAnimation.position.x, ventilAnimation.position.y, ventilAnimation.position.z), 2000).easing(TWEEN.Easing.Quadratic.Out)
    };
    ventil.userData = ventilTweens;

    kesselteile.add(ventilAnimation);

    // ---------------------------------------------- Dampfübergang ---------------------------------------------------

    // Dampfabgabe
    var dampfabgabeGeometry = new THREE.CylinderGeometry(0.48, 0.48, 1.5, 16, 1, false);
    var dampfabgabe = new THREE.Mesh(dampfabgabeGeometry, messing);
    dampfabgabe.position.y = 8;
    dampfabgabe.position.z = -15.83;
    kesselteile.add(dampfabgabe);

    // Dampfaufnahme u. Dampfabgabe Verschlussschrauben
    var verschlussschraubeGeometry = new THREE.CylinderGeometry(0.62, 0.62, 1.4, 6, 1, false);
    var verschlussschraube1 = new THREE.Mesh(verschlussschraubeGeometry, messing);
    verschlussschraube1.position.y = 9.05;
    verschlussschraube1.position.z = -15.83;
    verschlussschraube1.name = "Verschlussschraube1";
    kesselteile.add(verschlussschraube1);

    // Animation Verschlussschraube1
    var verschlussschraube1Tweens = {
        forward: false,
        forwardTween: new TWEEN.Tween(verschlussschraube1.position).to(new THREE.Vector3(verschlussschraube1.position.x, verschlussschraube1.position.y + 1, verschlussschraube1.position.z), 2000).easing(TWEEN.Easing.Quadratic.Out),
        backwardTween: new TWEEN.Tween(verschlussschraube1.position).to(new THREE.Vector3(verschlussschraube1.position.x, verschlussschraube1.position.y, verschlussschraube1.position.z), 2000).easing(TWEEN.Easing.Quadratic.Out)
    };
    verschlussschraube1.userData = verschlussschraube1Tweens;

    var verschlussschraube2 = new THREE.Mesh(verschlussschraubeGeometry, messing);
    verschlussschraube2.position.z = -2.8;
    verschlussschraube2.position.x = -0.7;
    verschlussschraube2.position.y = 15.45;
    verschlussschraube2.name = "Verschlussschraube2";
    kesselteile.add(verschlussschraube2);

    // Animation Verschlussschraube2
    var verschlussschraube2Tweens = {
        forward: false,
        forwardTween: new TWEEN.Tween(verschlussschraube2.position).to(new THREE.Vector3(verschlussschraube2.position.x, verschlussschraube2.position.y + 0.7, verschlussschraube2.position.z), 2000).easing(TWEEN.Easing.Quadratic.Out),
        backwardTween: new TWEEN.Tween(verschlussschraube2.position).to(new THREE.Vector3(verschlussschraube2.position.x, verschlussschraube2.position.y, verschlussschraube2.position.z), 2000).easing(TWEEN.Easing.Quadratic.Out)
    };
    verschlussschraube2.userData = verschlussschraube2Tweens;

    // Dampfübergang
    var start = new THREE.Vector3(0, 8, -15.83);
    var mittelpunkt1 = new THREE.Vector3(0, 15, -17);
    var mittelpunkt2 = new THREE.Vector3(-0.7, 21,-2)
    var ende = new THREE.Vector3(-0.7, 14.45, -2.8);

    var kurve = new THREE.CubicBezierCurve3(start, mittelpunkt1, mittelpunkt2, ende);

    var dampfuebergangGeometry = new THREE.TubeGeometry(kurve, 64, 0.22, 16, false);
    var dampfuebergang = new THREE.Mesh(dampfuebergangGeometry, kupfer);
    dampfuebergang.position.y = 0.5;
    dampfuebergang.castShadow = true;
    kesselteile.add(dampfuebergang);

    // Kesselgestell
    var shape = new THREE.Shape();
    shape.moveTo(-7.4, 0);
    shape.lineTo(-7.4, 3.9);
    shape.lineTo(7.4, 3.9);
    shape.lineTo(7.4, 0);
    shape.lineTo(6.8, 0);
    shape.lineTo(6.8, 3.3);
    shape.lineTo(-6.8, 3.3);
    shape.lineTo(-6.8, 0);
    shape.lineTo(-7.4, 0);

    var extrudeSettings = {
        steps: 1,
        depth: 6.8,
        bevelEnabled: false
    };
    var kesselgestellGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var kesselgestell = new THREE.Mesh(kesselgestellGeometry, eisenDunkel);
    kesselgestell.position.x = -3.4;
    kesselgestell.position.z = -22.4;
    kesselgestell.position.y = 3;
    kesselgestell.rotation.x = 180 * DEG_TO_RAD;
    kesselgestell.rotation.y = 90 * DEG_TO_RAD;
    kesselgestell.castShadow = true;
    kesselgestell.name = "Kesselgestell";
    kesselteile.add(kesselgestell);

    steamEngine.add(kesselteile);

    // Animation der SteamEngine
    var steamEngineTweens = {
        forward: false,
        forwardTween: new TWEEN.Tween(steamEngine.rotation).to(new THREE.Vector3(steamEngine.rotation.x, steamEngine.rotation.y + DEG_TO_RAD * 720, steamEngine.rotation.z), 2000).easing(TWEEN.Easing.Quadratic.Out),
        backwardTween: new TWEEN.Tween(steamEngine.rotation).to(new THREE.Vector3(steamEngine.rotation.x, steamEngine.rotation.y, steamEngine.rotation.z), 2000).easing(TWEEN.Easing.Quadratic.Out)
    };
    kesselgestell.userData = steamEngineTweens;

    return steamEngine;
}
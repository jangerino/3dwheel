//импорт библиотеки three
import * as THREE from 'three'
import { CSG } from 'three-csg-ts';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// import { tri } from 'three/src/nodes/TSL.js';

//создание сцены(полотно на которм ресуем(на него добавляем камеру, объект, свет))
const scene = new THREE.Scene()

//создание камеры(PerspectiveCamera)(75 - на сколько широко будет видеть наша камера)
//window.innerWidth - ширина экрана; window.innerHeight - длина экрана
//0.1 – ближайщая граница видимости
//100 - насколько далеко будето видеть камера
const camera = new THREE.PerspectiveCamera(
    40, 
    window.innerWidth/ window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 20)
const target = new THREE.Vector3(8, 0, 0);
camera.lookAt(target);
camera.position.x -= 2

//отдаляем камеру от базовых значений, а именно z = 0 стало z = 5
camera.position.z = 5

//создание рендера(картинка)  
const renderer = new THREE.WebGLRenderer()
//размер рендера(картинки)
renderer.setSize(window.innerWidth, window.innerHeight)
//добавление рендера в html объект
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled = true


//LIGHT
// const ambientLight = new THREE.AmbientLight('black',0.5)
// scene.add(ambientLight)


// const dirLight = new THREE.DirectionalLight('white',1)
// dirLight.position.set(1,1,2)
// scene.add(dirLight)
// const dirLightHelper = new THREE.DirectionalLightHelper(dirLight,10)
// scene.add(dirLightHelper)


// const pointLight = new THREE.PointLight('#ffaa00',10)
// pointLight.position.set(-0.2,2,1)
// scene.add(pointLight)
// const pointLightHelper = new THREE.PointLightHelper(pointLight,0.5)
// scene.add(pointLightHelper)
const distance = 23;
const angle_spot = Math.PI/5.0;
const penumbra = 0.5;
const decay = 1.5;

const spotLight = new THREE.SpotLight( '#fef9cc', 100,distance,angle_spot,penumbra,decay);
spotLight.position.set(0, 2, 2); // позиция света над колесом
spotLight.target.position.set(0,-1,0)
spotLight.castShadow = true;
scene.add(spotLight)
scene.add(spotLight.target)

// const spotHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotHelper);


//TEXTURES
const texture =new THREE.TextureLoader().load('bamboo-wood-semigloss-albedo.jpg') 
const textureMaterial = new THREE.MeshBasicMaterial({map: texture}) 
const texture_2 =new THREE.TextureLoader().load('bamboo-wood-semigloss-metal.jpg') 
const textureMaterial_2 = new THREE.MeshBasicMaterial({map: texture_2}) 
//====================================================//

const radialSegments = 200; // больше сегментов = более круглая форма

// основной цилиндр
const mainCylinderGeometry = new THREE.CylinderGeometry(1, 1, 0.2, radialSegments);
const mainCylinderMaterial = new THREE.MeshLambertMaterial({ color: '#3b1704' });
const cylinder = new THREE.Mesh(mainCylinderGeometry, mainCylinderMaterial);
cylinder.position.set(0, 0, 0);
var targetPosition1 = new THREE.Vector3(0, 10, 3); 
cylinder.lookAt(targetPosition1);
cylinder.receiveShadow = true;


// цилиндр-дырка (делаем выше, чем основной, чтобы вырезал насквозь)
const holeCylinderGeometry = new THREE.SphereGeometry(0.88, 36, 36, radialSegments);
const holeCylinderMesh = new THREE.Mesh(holeCylinderGeometry);
holeCylinderMesh.position.set(0, 0, 0);
var targetPosition = new THREE.Vector3(0, 10, 3); 
holeCylinderMesh.lookAt(targetPosition);

// --- CSG операция --- //
const mainCSG = CSG.fromMesh(cylinder);
const holeCSG = CSG.fromMesh(holeCylinderMesh);
const resultCSG = mainCSG.subtract(holeCSG);

const finalMesh = CSG.toMesh(resultCSG, new THREE.Matrix4(),mainCylinderMaterial); 
finalMesh.rotation.x = Math.PI / 2;
finalMesh.position.set(0, 0, 0)
finalMesh.receiveShadow = true;
finalMesh.castShadow = true;
scene.add(finalMesh); 


//============2 ЦИЛИНДР==========================
// const cylinderGeometry_2 = new THREE.CylinderGeometry(0.88, 0.88, 0.01,radialSegments);
// const cylinderMaterial_2 = new THREE.MeshStandardMaterial({ color: 'red' });
// const cylinder_2 = new THREE.Mesh(cylinderGeometry_2, cylinderMaterial_2);
// cylinder_2.position.set(0, 0, 0);
// var targetPosition2 = new THREE.Vector3(0, 10, 3); 
// cylinder_2.lookAt(targetPosition2);

// // Создаем отверстие для красного цилиндра
// const holeGeometryRed = new THREE.CylinderGeometry(0.2, 0.2, 0.02,radialSegments);  // Меньше, чтобы была видна рамка
// const holeMeshRed = new THREE.Mesh(holeGeometryRed);
// holeMeshRed.position.set(0, 0, 0);
// var targetPosition2 = new THREE.Vector3(0, 10, 3); 
// holeMeshRed.lookAt(targetPosition2);


// // --- CSG операция для красного цилиндра --- //
// const redCSG = CSG.fromMesh(cylinder_2);
// const holeRedCSG = CSG.fromMesh(holeMeshRed);
// const resultRedCSG = redCSG.subtract(holeRedCSG);

// const finalRedMesh = CSG.toMesh(resultRedCSG, new THREE.Matrix4(), cylinderMaterial_2);
// finalRedMesh.rotation.x = Math.PI / 2;
// finalRedMesh.position.set(0, 0, 0)
// scene.add(finalRedMesh);
//====================================================//

//==============3 ЦИЛИНДР===========================
const cylinderGeometry_3 = new THREE.CylinderGeometry(0.2, 0.2, 0.2,radialSegments);
const cylinderMaterial_3 = new THREE.MeshStandardMaterial({ color: '#a65105' });
const cylinder_3 = new THREE.Mesh(cylinderGeometry_3, cylinderMaterial_3);
cylinder_3.position.set(0, 0, 0);
var targetPosition3 = new THREE.Vector3(0, 10, 3); 
cylinder_3.lookAt(targetPosition3);

// Создаем отверстие для  цилиндра
const holeGeometryRing = new THREE.CylinderGeometry(0.16, 0.15, 0.2,radialSegments);  // Меньше, чтобы была видна рамка
const holeMeshRing = new THREE.Mesh(holeGeometryRing);
holeMeshRing.position.set(0, 0, 0);
var targetPosition3 = new THREE.Vector3(0, 10, 3); 
holeMeshRing.lookAt(targetPosition3);


// --- CSG операция для красного цилиндра --- //
const ringCSG = CSG.fromMesh(cylinder_3);
const holeRingCSG = CSG.fromMesh(holeMeshRing);
const resultRingCSG = ringCSG.subtract(holeRingCSG);

const finalRingMesh = CSG.toMesh(resultRingCSG, new THREE.Matrix4(), cylinderMaterial_3);
finalRingMesh.rotation.x = Math.PI / 2;
finalRingMesh.position.set(0, 0, 0)
finalRingMesh.receiveShadow = true;
finalRingMesh.castShadow = true;
scene.add(finalRingMesh);
//====================================================//

//==============4 ЦИЛИНДР===========================
const cylinderGeometry_4 = new THREE.CylinderGeometry(0.16, 0.16, 0.12,radialSegments);
const cylinderMaterial_4 = new THREE.MeshStandardMaterial({ color: '#c8492c' });
const cylinder_4 = new THREE.Mesh(cylinderGeometry_4, cylinderMaterial_4);
cylinder_4.position.set(0, 0, 0);
var targetPosition4 = new THREE.Vector3(0, 10, 3); 
cylinder_4.lookAt(targetPosition4);

// Создаем отверстие для красного цилиндра
const holeGeometryRingRed = new THREE.CylinderGeometry(0.7, 0.9, 0.02,radialSegments);  // Меньше, чтобы была видна рамка
const holeMeshRingRed = new THREE.Mesh(holeGeometryRingRed);
holeMeshRingRed.position.set(0, 0, 0);
var targetPosition4 = new THREE.Vector3(0, 10, 3); 
holeMeshRingRed.lookAt(targetPosition4);

// --- CSG операция для красного цилиндра --- //
const ringRedCSG = CSG.fromMesh(cylinder_4);
const holeRingRedCSG = CSG.fromMesh(holeMeshRingRed);
const resultRingRedCSG = ringRedCSG.subtract(holeRingRedCSG);

const finalRingRedMesh = CSG.toMesh(resultRingRedCSG, new THREE.Matrix4(), cylinderMaterial_4);
finalRingRedMesh.rotation.x = Math.PI / 2;
finalRingRedMesh.position.set(0, 0, 0)
finalRingRedMesh.receiveShadow = true;
finalRingRedMesh.castShadow = true;
scene.add(finalRingRedMesh);
//====================================================//

//==============5 ЦИЛИНДР===========================
const cylinderGeometry_5 = new THREE.CylinderGeometry(0.05, 0.05, 0.22,radialSegments);
const cylinderMaterial_5 = new THREE.MeshLambertMaterial({ color: '#a65105' });
const cylinder_5 = new THREE.Mesh(cylinderGeometry_5, cylinderMaterial_5);
cylinder_5.position.set(0, 0, 0);
var targetPosition5 = new THREE.Vector3(0, 10, 3); 
cylinder_5.lookAt(targetPosition5);

// Создаем отверстие для красного цилиндра
const holeGeometryRingRedYellow = new THREE.CylinderGeometry(0.7, 0.9, 0.02,radialSegments);  // Меньше, чтобы была видна рамка
const holeMeshRingRedYellow = new THREE.Mesh(holeGeometryRingRedYellow);
holeMeshRingRedYellow.position.set(0, 0, 0);
var targetPosition5 = new THREE.Vector3(0, 10, 3); 
holeMeshRingRedYellow.lookAt(targetPosition5);

// --- CSG операция для красного цилиндра --- //
const ringRedYellowCSG = CSG.fromMesh(cylinder_5);
const holeRingRedYellowCSG = CSG.fromMesh(holeMeshRingRedYellow);
const resultRingRedYellowCSG = ringRedYellowCSG.subtract(holeRingRedYellowCSG);

const finalRingRedYellowMesh = CSG.toMesh(resultRingRedYellowCSG, new THREE.Matrix4(), cylinderMaterial_5);
finalRingRedYellowMesh.rotation.x = Math.PI / 2;
finalRingRedYellowMesh.position.set(0, 0, 0)
finalRingRedYellowMesh.receiveShadow = true;
finalRingRedYellowMesh.castShadow = true;
scene.add(finalRingRedYellowMesh);
//====================================================//



//============ТЭТРАЭДР================================//
const shape = new THREE.Shape();

shape.moveTo(0.1, -1.0); // Перемещаем "карандаш" в первую точку
shape.lineTo(1, -1.0);  // Рисуем линию ко второй точке
shape.lineTo(0.0, 0.2);   // Рисуем линию к третьей точке
shape.lineTo(-0.9, -1.0); // Замыкаем контур, возвращаясь к первой точке (не обязательно, но рекомендуется)

// 2. Настройки экструзии
const extrudeSettings = {
  depth: 0.5,        // Толщина выдавливания (важно!)
  bevelEnabled: false, // Без фасок
  bevelSegments: 1,
  steps: 1,
  bevelSize: 0,
  bevelThickness: 0
};

// 3. Создаем геометрию экструзии
const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

// 4. Создаем материал (MeshStandardMaterial - хорошо подходит для 3D)
const material = new THREE.MeshLambertMaterial( { color: '#3b1704', side: THREE.DoubleSide } );

// 5. Создаем mesh
const triangle = new THREE.Mesh( geometry, material );

// 6. Позиционируем треугольник
triangle.position.set(0, -0.2, -0.5);
triangle.receiveShadow = true;
// 7. Добавляем объект на сцену
triangle.castShadow = true;
scene.add( triangle );

// 8. Добавляем освещение (обязательно для MeshStandardMaterial)
// const light = new THREE.AmbientLight( 0xffffff, 0.5 ); // Мягкий рассеянный свет
// scene.add( light );

// const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// directionalLight.position.set( 0, 0, 0 );
// scene.add( directionalLight );
//=========================================================//

//============ПРЯМОУГОЛЬНИК================================//
// 1. Определяем размеры прямоугольника (ширина, высота, глубина)
const width = 1.90
const height = 0.2;
const depth = 1;

// 2. Создаем геометрию BoxGeometry
const geometryPR = new THREE.BoxGeometry( width, height, depth );

// 3. Создаем материал
const materialPR = new THREE.MeshLambertMaterial( { color: '#3b1704' } ); 

// 4. Создаем mesh
const rectangle = new THREE.Mesh( geometryPR, materialPR );
rectangle.position.set(0.05,-1.3,0)
// 5. Добавляем объект на сцену
rectangle.castShadow = true;
rectangle.receiveShadow=true;
scene.add( rectangle );

// // 6. Добавляем освещение (необходимо для MeshStandardMaterial)
// const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
// scene.add( ambientLight );

// const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// directionalLight.position.set( 0, 1, 1 );
// scene.add( directionalLight );
//=========================================================//

//===========УКАЗАТЕЛЬ======================================//
const indicator = new THREE.Shape();

indicator.moveTo(0, -1.275); // Перемещаем "карандаш" в первую точку
indicator.lineTo(0.1, -1.0);  // Рисуем линию ко второй точке
indicator.lineTo(0.0, -1);   // Рисуем линию к третьей точке
indicator.lineTo(-0.1, -1.0); // Замыкаем контур, возвращаясь к первой точке (не обязательно, но рекомендуется)

// 2. Настройки экструзии
const indicatorSettings = {
  depth: 0.03,        // Толщина выдавливания (важно!)
  bevelEnabled: false, // Без фасок
  bevelSegments: 1,
  steps: 1,
  bevelSize: 0,
  bevelThickness: 0
};

// 3. Создаем геометрию экструзии
const indicatorGeometry = new THREE.ExtrudeGeometry( indicator, indicatorSettings );

// 4. Создаем материал (MeshStandardMaterial - хорошо подходит для 3D)
const indicatorMaterial = new THREE.MeshLambertMaterial( { color: '#a65105', side: THREE.DoubleSide } );

// 5. Создаем mesh
const triangle_indicator = new THREE.Mesh( indicatorGeometry, indicatorMaterial );

// 6. Позиционируем треугольник
triangle_indicator.position.set(0, 2.04, 0.15);
triangle_indicator.receiveShadow = true;
triangle_indicator.castShadow = true;
// 7. Добавляем объект на сцену
scene.add( triangle_indicator );


//============================Продолжение указателя=================================//
const widthDesk = 0.20
const heightDesk = 0.03;
const depthDesk = 0.35;

// 2. Создаем геометрию BoxGeometry
const geometryDesk = new THREE.BoxGeometry( widthDesk, heightDesk, depthDesk );

// 3. Создаем материал
const materialDesk = new THREE.MeshLambertMaterial( { color: '#a65105' } ); 

// 4. Создаем mesh
const desk = new THREE.Mesh( geometryDesk, materialDesk );
desk.position.set(0,1.05,0)
// 5. Добавляем объект на сцену
desk.receiveShadow = true;
desk.castShadow = true;
scene.add( desk );

//===========================================================//
//=====================ОТДЕЛЕНИЯ============================//

const branchesCount = 8; // сколько отделений
const branches = [];  // массив для хранения палок

const offset = THREE.MathUtils.degToRad(28);

for (let i = 0; i < branchesCount; i++) {
    const angle = (i / branchesCount) * Math.PI * 2 + offset;

    const branchGeom = new THREE.CylinderGeometry(0.013, 0.013, 1.95, 32);
    const branchMat = new THREE.MeshLambertMaterial({ color: 'black' });
    const branch = new THREE.Mesh(branchGeom, branchMat);
    branch.rotation.z = angle; 
    scene.add(branch);

    branches.push(branch); // добавляем в массив
}

//=================================//
const lampsCount = 8; // сколько отделений
const lamps = []; // массив для хранения палок
const lampRadius = 0.95;

for (let j = 0; j < lampsCount; j++) {
    const angle1 = (j / lampsCount) * Math.PI * 2;

    const lampGeom = new THREE.SphereGeometry(0.045, 10, 10);
    const lampMat = new THREE.MeshLambertMaterial({
    color: '#ffaa00',
    emissive: '#ffaa00',
    emissiveIntensity: 10
});

    const lamp = new THREE.Mesh(lampGeom, lampMat);

    const light = new THREE.PointLight('#ffaa00', 1.5, 1.6); // (цвет, интенсивность, радиус действия)
    lamp.add(light);

    // размещаем на окружности
    lamp.position.set(
        Math.cos(angle1) * lampRadius,
        Math.sin(angle1) * lampRadius,
        0.085 // чуть вперёд, чтобы не врезалось в колесо
    );

lamp.receiveShadow = true;
lamp.castShadow = true;

    scene.add(lamp);
    lamps.push({ mesh: lamp, angle1 }); // сохраняем угол
}





//==========================================================//
//=======================ТРЕУГОЛЬНИКИ==================================//
//=======================================================================//
// const sectorColors = [
//   '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff',
//   '#00ffff', '#ffa500', '#800080', '#008000', '#ffffff'
// ];
const sectorColors = [
    '#84b3cb',
    '#c8492c',
    '#ea8e35',
    '#903d27',
    '#84b3cb',
    '#c8492c',
    '#ea8e35',
    '#903d27'];
// const sectorColors = [ '#84b3cb', 
//     '#ea8e35', 
//     '#c8492c', 
//     '#903d27', 
//     '#84b3cb', 
//     '#ea8e35', '#c8492c', 
//     '#903d27''];
const sectorsCount = 8;
const radius = 0.9;
const depth1 = 0.001;

const wheelGroup = new THREE.Group(); // группа для всего колеса

for (let i = 0; i < sectorsCount; i++) {
    const angleStart = (i / sectorsCount) * Math.PI * 2;
    const angleEnd = ((i+1) / sectorsCount) * Math.PI * 2;

    const shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.arc(0,0,radius, angleStart, angleEnd, false);
    shape.lineTo(0,0);

    const extrudeSettings = { depth: depth1, bevelEnabled: false };
    const geometry6 = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const material6 = new THREE.MeshLambertMaterial({ color: sectorColors[i % sectorColors.length] });
    const mesh = new THREE.Mesh(geometry6, material6);

    mesh.lookAt(new THREE.Vector3(0, 0, 0));

mesh.receiveShadow = true;
mesh.castShadow = true;

    wheelGroup.add(mesh);
}

scene.add(wheelGroup);

// поворот сразу на определённый угол (например, 18°)
let angleDeg = 18; 
let angleRad = THREE.MathUtils.degToRad(angleDeg);
wheelGroup.rotation.z -= angleRad;


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20,20,20),
    new THREE.MeshLambertMaterial({color:'#2d1a0e'})
)
var targetPosition9 = new THREE.Vector3(0, 10, 0); 
plane.lookAt(targetPosition9);
plane.position.set(3,-1.5,0)
plane.receiveShadow = true;
plane.castShadow = true;
scene.add(plane)


 






function animate() {
    requestAnimationFrame(animate);

    // крутим колесо целиком по часовой стрелке
    wheelGroup.rotation.z -= 0.03;

    // твои другие объекты
    finalMesh.rotation.y -= 0.03;
    // finalRedMesh.rotation.y += 0.01;
    finalRingMesh.rotation.y += 0.03;
    finalRingRedMesh.rotation.y += 0.03;
    finalRingRedYellowMesh.rotation.y += 0.03;

    branches.forEach(branch => {
        branch.rotation.z -= 0.03;
    });

    lamps.forEach(lampObj => {
        lampObj.angle1 -= 0.030;
        lampObj.mesh.position.x = Math.cos(lampObj.angle1) * lampRadius;
        lampObj.mesh.position.y = Math.sin(lampObj.angle1) * lampRadius;
    });

    renderer.render(scene, camera);
}

animate();



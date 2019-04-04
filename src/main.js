// import {Context} from './Renderer/Context';
// import { Ellipsoid } from './Scene/Geometry/Ellipsoid';
// import { vec3 } from 'gl-matrix';
//
//
// // const c = new Context(document.getElementById('glCanvas') as HTMLCanvasElement, null);
// // console.log(c.webgl2);
//
// const e = new Ellipsoid({
//   radii: vec3.fromValues(1.0, 1.0, 1.0)
// });
// console.log(e.createGeometry());
import { PerspectiveCamera, Scene, MeshNormalMaterial, WebGLRenderer, Geometry, Vector3, Face3, LineSegments, WireframeGeometry, } from 'three';
import { vec3 } from 'gl-matrix';
import { Ellipsoid } from './Scene/Geometry/Ellipsoid';
import { Plane } from './Scene/Geometry/Plane';
const p = new Plane({});
// Set camera
const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 1;
// Polygon vertices, indices
const e = new Ellipsoid({
    radii: vec3.fromValues(1.0, 1.0, 1.0)
});
const el = e.createGeometry();
const ellipsoid = new Geometry();
for (let i = 0; i < el.attributes.values.length; i += 3) {
    ellipsoid.vertices.push(new Vector3(el.attributes.values[i] * 0.5, el.attributes.values[i + 1] * 0.5, el.attributes.values[i + 2] * 0.5));
}
for (let i = 0; i < el.indices.length; i += 3) {
    ellipsoid.faces.push(new Face3(el.indices[i], el.indices[i + 1], el.indices[i + 2]));
}
const wireframeGeometry = new WireframeGeometry(ellipsoid);
const material = new MeshNormalMaterial();
const scene = new Scene();
const mesh = new LineSegments(wireframeGeometry, material);
scene.add(mesh);
// Add Renderer
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
animate();
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    renderer.render(scene, camera);
}
// declare interface Window {
//   naver?: any;
// }
//
//
// !window.naver && (window.naver = {});
// !window.naver.Geobook && (window.naver.Geobook = {});
//
//
//
// import { Renderer } from './Renderer/Renderer';
// import { Cube } from './Object/Cube';
// import { Camera } from './Camera/Camera';
// import { GLMouse } from './Camera/GLMouse';
// import { Light } from './Light/Light';
// import { PhongRenderer } from './Renderer/PhongRenderer';
// import { PhongCube } from './Object/PhongCube';
//
//
// const canvas: HTMLCanvasElement = document.getElementById('glCanvas') as HTMLCanvasElement;
// // const renderer: Renderer = new Renderer(canvas);
// const renderer: PhongRenderer = new PhongRenderer(canvas);
// const width: number = renderer.getWidth();
// const height: number = renderer.getHeight();
//
// /**
//  * initialize
//  */
// renderer.init(0.85, 0.85, 0.85, 1.0);
//
// /**
//  * camera
//  */
// const camera = new Camera();
// camera.perspective(45.0, width / height, 1, 1000);
//
// const mouse = new GLMouse(canvas, {
//   eye: [0, 0, 5],
//   wheelSpeed: 0.003
// });
//
// renderer.addCamera(camera);
// renderer.addMouse(mouse);
//
// /**
//  * model
//  */
//
// // const cube = new Cube();
// const cube = new PhongCube();
// renderer.addObject(cube.vertices, cube.colors, cube.vertexNormals, cube.indices, cube.vertexShader, cube.fragmentShader);
//
// /**
//  * rendering
//  */
// renderer.render();
//# sourceMappingURL=main.js.map
import {
  ACESFilmicToneMapping,
  AmbientLight,
  DirectionalLight,
  EquirectangularReflectionMapping,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { HDRI, modelURL } from "./constants";
import loadModel from "./loadModel";

export default class ThreeJar {
  constructor(canvas) {
    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.physicallyCorrectLights = true;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    this.camera = new PerspectiveCamera();
    this.camera.position.z = 2;
    this.scene = new Scene();

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;

    const mainLight = new DirectionalLight(0xffffff, 4);
    mainLight.position.set(1, 1, 1);
    mainLight.castShadow = true;

    const fillLight = new DirectionalLight(0xffffff, 1);
    fillLight.position.set(-1, 0.5, -1);

    const ambientLight = new AmbientLight(0xffffff, 0.5);

    this.scene.add(mainLight);
    this.scene.add(fillLight);
    this.scene.add(ambientLight);

    this.rgbeLoader = new RGBELoader();
    this.rgbeLoader.load(HDRI, function (envMap) {
      envMap.mapping = EquirectangularReflectionMapping;
      this.scene.environment = envMap;
    });

    this.load(modelURL);
  }

  async load(url) {
    const model = await loadModel(url);
    this.camera.position.z = 800;
    this.scene.add(model);
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.controls) {
      this.controls.dispose();
    }

    if (this.scene) {
      this.scene.clear();
    }
  }
}

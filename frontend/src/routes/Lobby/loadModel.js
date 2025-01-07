import { Box3, Vector3 } from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

import { optimizeGeometry } from "./geometryOptimization";

export default function loadModel(url, { glassMaterial, plasticMaterial }) {
  return new Promise((resolve, reject) => {
    const loader = new FBXLoader();

    loader.load(
      url,
      (object) => {
        const box = new Box3().setFromObject(object);
        const center = box.getCenter(new Vector3());
        object.position.sub(center);

        object.traverse((child) => {
          if (child.isMesh) {
            const name = child.name.toLowerCase();
            child.geometry = optimizeGeometry(child.geometry);

            if (name.includes("glass")) {
              child.material = glassMaterial;
              child.castShadow = false;
              child.receiveShadow = true;
            } else if (name.includes("lid")) {
              child.material = plasticMaterial;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          }
        });

        resolve(object);
      },
      undefined,
      reject
    );
  });
}

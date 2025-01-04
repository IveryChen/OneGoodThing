import {
  Color,
  DoubleSide,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
} from "three";

export const createMaterials = () => {
  const glassMaterial = new MeshPhysicalMaterial({
    color: new Color(0xffffff),
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    transparent: true,
    thickness: 0.5,
    envMapIntensity: 2.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    opacity: 0.4,
    reflectivity: 0.5,
    side: DoubleSide,
    attenuationColor: new Color(0xffffff),
    attenuationDistance: 0.5,
  });

  const plasticMaterial = new MeshStandardMaterial({
    color: new Color(0x202020),
    metalness: 0.0,
    roughness: 0.4,
    envMapIntensity: 0.5,
  });

  return { glassMaterial, plasticMaterial };
};

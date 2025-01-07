import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

export const setupComposer = (renderer, scene, camera) => {
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const chromaticAberrationShader = {
    uniforms: {
      tDiffuse: { value: null },
      distortion: { value: 0.02 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float distortion;
      varying vec2 vUv;
      void main() {
        vec2 offset = distortion * (vec2(0.5) - vUv);
        vec4 cr = texture2D(tDiffuse, vUv + offset);
        vec4 cg = texture2D(tDiffuse, vUv);
        vec4 cb = texture2D(tDiffuse, vUv - offset);

        if (cg.a == 0.0) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        } else {
          gl_FragColor = vec4(cr.r, cg.g, cb.b, cg.a);
        }
      }
    `,
  };

  const chromaticAberrationPass = new ShaderPass(chromaticAberrationShader);
  composer.addPass(chromaticAberrationPass);

  return composer;
};

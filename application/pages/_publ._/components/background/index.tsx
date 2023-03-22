import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

import { useThemeStore } from "@/shared/modules/theme/store";

import type {  Engine } from "tsparticles-engine";

// ----
export function Background() {
  const mode = useThemeStore((s) => {
    return s.mode;
  });
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log("🫦 Initializing particles!");

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {
    console.log("🥳 Particles generator has been loaded!");
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        preset: "links",
        fpsLimit: 120,
        interactivity: {
          events: {
            resize: true,
          },
        },
        particles: {
          color: {
            value: mode === "dark" ? "#fff" : "#000",
          },
          links: {
            color: "#ffffff",
            distance: 100,
            enable: true,
            opacity: 0.25,
            width: 0.5,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 200,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.5, max: 2 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// ----
interface State {
  position: {
    x: number;
    y: number;
  };
  visible: boolean;

  set: {
    position: (coordinates: { x?: number; y?: number }) => void;
    visible: (is: boolean) => void;
  };
}

// ----
export const useGlobalCursor = create(
  immer<State>((set) => {
    return {
      position: {
        x: 0,
        y: 0,
      },
      visible: true,

      set: {
        position: (coordinates) => {
          return set((s) => {
            s.position.x = coordinates.x || s.position.x;
            s.position.y = coordinates.y || s.position.y;
          });
        },
        visible: (is) => {
          return set((s) => {
            s.visible = is;
          });
        },
      },
    };
  }),
);

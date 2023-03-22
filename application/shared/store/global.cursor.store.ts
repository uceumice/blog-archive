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
  immer<State>((set, get) => ({
    position: {
      x: 0,
      y: 0,
    },
    visible: true,

    set: {
      position: (coordinates) =>
        set((s) => {
          s.position.x = coordinates.x || s.position.x;
          s.position.y = coordinates.y || s.position.y;
        }),
      visible: (is) =>
        set((s) => {
          s.visible = is;
        }),
    },
  }))
);

import { useEffect } from "react";
import { atom, useAtom } from "jotai";

export type CornerPos = "lt" | "lb" | "rt" | "rb";

type Handlers = Record<CornerPos | string, () => void>;

interface CornerAtom {
  visible: boolean;
  handlers: Handlers;
}

const defaultCornerState = {
  visible: false,
  handlers: {
    lt: () => {},
    lb: () => {},
    rt: () => {},
    rb: () => {},
  },
};

export const cornerAtom = atom<CornerAtom>(defaultCornerState);

const useCorners = () => {
  const [corner, setCorner] = useAtom(cornerAtom);

  const setVisibility = (visible: boolean | "toggle") => {
    if (visible === "toggle") {
      setCorner((prev) => ({ ...prev, visible: !prev.visible }));

      return;
    }

    setCorner((prev) => ({
      ...prev,
      visible,
    }));
  };

  const setHandlers = (handlers: Handlers) => {
    setCorner((prev) => ({
      ...prev,
      handlers,
    }));
  };

  useEffect(() => {
    return () => {
      setCorner(defaultCornerState);
    };
  }, []);

  return {
    visible: corner.visible,
    setVisibility,
    setHandlers,
  };
};

export default useCorners;

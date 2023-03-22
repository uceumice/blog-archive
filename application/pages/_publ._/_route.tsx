import { Link } from "@remix-run/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { CgScrollV } from "react-icons/cg";
import { RiLoginCircleLine } from "react-icons/ri";

import { Background } from "./components/background";

import { ToggleTheme } from "@/shared/components/toggle-theme";
import { useGlobalCursor } from "@/shared/store/global.cursor.store";

// ----
export function $Publ() {
  const scv = useGlobalCursor((s) => {
    return s.set.visible;
  });
  return (
    <div className={clsx(["w-full h-full overflow-hidden"])}>
      <motion.div
        className={clsx(["fixed top-5 left-5"])}
        whileHover={{ scale: 0.9 }}
        onHoverStart={() => {
          return scv(false);
        }}
        onHoverEnd={() => {
          return scv(true);
        }}
      >
        <ToggleTheme className="bg-transparent cursor-none" />
      </motion.div>
      <motion.div
        onHoverStart={() => {
          return scv(false);
        }}
        onHoverEnd={() => {
          return scv(true);
        }}
        className={clsx(["fixed", "top-5 right-5"])}
        whileHover={{ scale: 0.9 }}
      >
        <Link
          to="/manage"
          className={clsx(["btn btn-md btn-circle bg-transparent cursor-none"])}
        >
          <RiLoginCircleLine className="w-5 h-5" />
        </Link>
      </motion.div>

      <motion.div
        onHoverStart={() => {
          scv(false);
        }}
        onHoverEnd={() => {
          scv(true);
        }}
        style={{
          left: "50%",
          top: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{
          scale: 1,
        }}
        whileHover={{
          scale: 0.9,
        }}
        className={clsx(["fixed", "select-none"])}
      >
        <a
          href="https://github.com/uceumice"
          className="cursor-none"
          target="uceumice::github"
        >
          <h1 className="text-4xl font-black">Hello, it's me,</h1>
          <h1 className="text-5xl font-black">UCEUMICE</h1>
        </a>
      </motion.div>
      <div
        className={clsx([
          "fixed bottom-5",
          "left-1/2 -translate-x-1/2",
          "flex flex-row items-center gap-1",
          "select-none",
        ])}
      >
        <p className="text-xs">Scroll for More</p>
        <CgScrollV />
      </div>
      <Background />
    </div>
  );
}

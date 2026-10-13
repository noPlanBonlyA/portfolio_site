"use client";

import { Messages, NowCoding, TaskManager, Trash } from "./Apps";
import { Terminal } from "./Terminal";

/** All desktop app windows (lazy chunk). Each stays mounted and is hidden while closed. */
export default function Windows() {
  return (
    <>
      <Terminal />
      <TaskManager />
      <Messages />
      <NowCoding />
      <Trash />
    </>
  );
}

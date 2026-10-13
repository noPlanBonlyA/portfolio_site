import { describe, expect, it } from "vitest";

import { botCopy } from "@/content/bot";
import { botAnswer } from "./bot-engine";
import { complete, runCommand } from "./terminal-engine";

describe("terminal", () => {
  it("echoes the command and prints help", () => {
    const r = runCommand("help");
    expect(r.lines[0]).toEqual({ text: "andrey@os:~$ help", kind: "cmd" });
    expect(r.lines.length).toBeGreaterThan(3);
  });

  it("cat opens a file in the IDE", () => {
    expect(runCommand("cat work/bitrix-speedup.md").effects).toEqual([{ type: "openFile", file: "p4" }]);
    expect(runCommand("cat about.md").effects).toEqual([{ type: "openFile", file: "about" }]);
    expect(runCommand("cat nope.md").lines[1].kind).toBe("err");
  });

  it("open targets map to effects", () => {
    expect(runCommand("open cv").effects).toEqual([{ type: "resume" }]);
    expect(runCommand("open taskmgr").effects).toEqual([{ type: "win", id: "task" }]);
    expect(runCommand("open tg").effects[0]).toMatchObject({ type: "url" });
  });

  it("secrets and quests", () => {
    expect(runCommand("sudo make coffee").effects).toEqual([{ type: "quest", id: "console" }]);
    expect(runCommand("hire andrey").effects).toEqual([{ type: "quest", id: "hire" }, { type: "hire" }]);
    expect(runCommand("KONAMI").effects).toEqual([{ type: "retro" }]);
    expect(runCommand("theme dracula").effects).toEqual([{ type: "theme", id: "dracula" }]);
  });

  it("clear and exit return no lines", () => {
    expect(runCommand("clear")).toEqual({ lines: [], effects: [{ type: "clear" }] });
    expect(runCommand("exit").effects).toEqual([{ type: "exit" }]);
  });

  it("unknown command", () => {
    expect(runCommand("rm -rf /").lines[1].kind).toBe("err");
  });

  it("contact shows Telegram only (no email)", () => {
    const text = runCommand("contact").lines.map((l) => l.text).join("\n");
    expect(text).toContain("@noPlanBonlyA");
    expect(text).not.toMatch(/@gmail|mailto/);
  });
});

describe("tab completion", () => {
  it("completes a unique prefix", () => {
    expect(complete("neo")).toEqual({ value: "neofetch" });
    expect(complete("theme dr")).toEqual({ value: "theme dracula" });
    expect(complete("cat work/bit")).toEqual({ value: "cat work/bitrix-speedup.md" });
  });

  it("lists ambiguous matches and extends the common prefix", () => {
    expect(complete("sound")).toEqual({ value: "sound o", options: ["sound on", "sound off"] });
    expect(complete("c").options).toContain("clear");
  });

  it("does not leak secrets", () => {
    expect(complete("sudo m")).toEqual({});
  });
});

describe("bot", () => {
  it("answers by intent", () => {
    expect(botAnswer("What is your stack?")).toMatch(/React/);
    expect(botAnswer("Tell me about SENAT AI")).toMatch(/7 developers/);
    expect(botAnswer("ищу разработчика на работу")).toMatch(/open to strong product teams/);
  });

  it("short keywords need whole words", () => {
    expect(botAnswer("hi")).toMatch(/Hey/);
    expect(botAnswer("do you know this?")).toBe(botCopy.fallback);
  });

  it("contacts are Telegram, not email", () => {
    expect(botAnswer("How to contact you?")).toMatch(/Telegram/);
    expect(botAnswer("email?")).not.toMatch(/@gmail/);
  });
});

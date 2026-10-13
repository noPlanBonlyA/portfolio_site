"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { botCopy } from "@/content/bot";
import { botAnswer } from "@/lib/bot-engine";

export interface ChatMsg {
  text: string;
  me: boolean;
}

/** Andrey.bot conversation state, shared by the desktop window and the mobile app. */
export function useBotChat(onSend?: () => void, onReply?: () => void) {
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ text: botCopy.greeting, me: false }]);
  const [typing, setTyping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const busy = useRef(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  const send = useCallback(
    (text: string) => {
      const q = text.trim();
      if (!q || busy.current) return false;
      busy.current = true;
      onSend?.();
      setMsgs((m) => [...m, { text: q, me: true }]);
      setTyping(true);
      timer.current = setTimeout(() => {
        busy.current = false;
        setTyping(false);
        setMsgs((m) => [...m, { text: botAnswer(q), me: false }]);
        onReply?.();
      }, 900);
      return true;
    },
    [onSend, onReply],
  );

  return { msgs, typing, send };
}

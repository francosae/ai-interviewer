"use client";
import { useVapi } from "../hooks/useVapi";
import { AssistantButton } from "./assistantButton";
import { Display } from "./display";
function Assistant() {
  const { toggleCall, callStatus, audioLevel, stop } = useVapi();
  return (
    <>
      <div className="chat-history">
        <Display
          stop={stop}
          audioLevel={audioLevel}
          callStatus={callStatus}
          toggleCall={toggleCall}
        />
      </div>
    </>
  );
}

export { Assistant };

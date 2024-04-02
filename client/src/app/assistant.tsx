"use client";
import { useVapi } from "../hooks/useVapi";
import { AssistantButton } from "./assistantButton";
import { Display } from "./display";
function Assistant() {
  const { toggleCall, callStatus, audioLevel } = useVapi();
  return (
    <>
      <div className="chat-history">
        <Display
          audioLevel={audioLevel}
          callStatus={callStatus}
          toggleCall={toggleCall}
        />
      </div>
    </>
  );
}

export { Assistant };

"use client"
import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { vapi } from "@/lib/vapi.sdk";
import React, { useEffect, useState} from "react";
import Editor from "@monaco-editor/react";

function Display() {
    // const editorRef = useRef(null);
    // function handleEditorDidMount(editor: any, monaco: any) {
    //   editorRef.current = editor;
    // }
    // editorRef.current?.getValue()
    
    const [code, setCode] = useState<string>("");

    function handleEditorChange(value: string | undefined) {
        setCode(value || "");

        vapi.send({
            type: MessageTypeEnum.ADD_MESSAGE,
            message: {
              role: "system",
              content: `Here is the current code written by the user: ${JSON.stringify(code)}`,
            },
          });
        }
    
  useEffect(() => {
    const onMessageUpdate = (message: Message) => {
      if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        message.functionCall.name === "viewCode"
      ) {

        console.log("code", code)
        vapi.send({
          type: MessageTypeEnum.ADD_MESSAGE,
          message: {
            role: "system",
            content: `Here current code written by the user: ${JSON.stringify(code)}`,
          },
        });

        console.log(code, message.functionCall)
      } else if ( message.type === MessageTypeEnum.FUNCTION_CALL ){
        const params = message.functionCall.parameters;
        
        console.log("parameters", params);
      }
    };

    vapi.on("message", onMessageUpdate);
    vapi.on("call-end", () => console.log("call-end"));
    return () => {
      vapi.off("message", onMessageUpdate);
      vapi.off("call-end", () => console.log("call-end"));
    };
  }, [code]);

  return (
    <Editor
      saveViewState={true}
      height="74vh"
      width="100%"
      defaultLanguage='python'
      options={{
        readOnly: false,
        fontSize: 14,
        fontFamily: "Droid Sans Mono",
        acceptSuggestionOnCommitCharacter: true,
        acceptSuggestionOnEnter: "on",
        autoIndent: "full",
        accessibilitySupport: "auto",
        automaticLayout: true,
        codeLens: true,
        colorDecorators: true,
        contextmenu: true,
        cursorBlinking: "blink",
        cursorSmoothCaretAnimation: "on",
        cursorStyle: "line",
        disableLayerHinting: false,
        disableMonospaceOptimizations: false,
        dragAndDrop: true,
        fixedOverflowWidgets: false,
        folding: true,
        foldingStrategy: "auto",
        fontLigatures: false,
        formatOnPaste: false,
        formatOnType: false,
      }}
      onChange={handleEditorChange}
    />
);
}

export { Display };

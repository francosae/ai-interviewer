"use client"
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

function IDE() {
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("vs-dark");

  const handleSubmit = async () => {};

  const onChange = (value: any, event: any) => {
    console.log("onChange", value, event);;

  };
  
  return (
    <div className="flex justify-center items-start pt-10 h-screen">
      <div className="w-full max-w-4xl p-4 border">
        <form action="#" onSubmit={handleSubmit}>
          <div className="">
            <Editor
              height="80vh"
              defaultLanguage="javascript"
              defaultValue='Deno.serve(req => new Response("Hello!"));'
              onChange={(value, event) => { onChange(value, event); }}
              theme={theme}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Run
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <IDE />
    </main>
  );
}

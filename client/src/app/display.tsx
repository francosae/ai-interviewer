"use client";
import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { vapi } from "@/lib/vapi.sdk";
import React, { useEffect, useState, Fragment } from "react";
import Editor from "@monaco-editor/react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CodeBracketIcon,
  XMarkIcon,
  StopIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "", icon: CodeBracketIcon, current: true },
  { name: "Reports", href: "", icon: StopIcon, current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function Display() {
  // const editorRef = useRef(null);
  // function handleEditorDidMount(editor: any, monaco: any) {
  //   editorRef.current = editor;
  // }
  // editorRef.current?.getValue()

  const [code, setCode] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [problem, setProblem] = useState<any>(null);
  async function fetchProblem() {
    const problem = await fetch(
      "http://localhost:3002/select?titleSlug=two-sum",
      { cache: "no-store" }
    ).then((res) => res.json());

    setProblem(problem);
    console.log(problem);
  }

  useEffect(() => {
    fetchProblem();
  }, []);
  function handleEditorChange(value: string | undefined) {
    setCode(value || "");

    vapi.send({
      type: MessageTypeEnum.ADD_MESSAGE,
      message: {
        role: "system",
        content: `Here is the current code written by the user: ${JSON.stringify(
          code
        )}`,
      },
    });
  }

  useEffect(() => {
    const onMessageUpdate = (message: Message) => {
      if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        message.functionCall.name === "viewCode"
      ) {
        console.log("code", code);
        // vapi.send({
        //   type: MessageTypeEnum.ADD_MESSAGE,
        //   message: {
        //     role: "system",
        //     content: `Here current code written by the user: ${JSON.stringify(code)}`,
        //   },
        // });

        console.log(code, message.functionCall);
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
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="-mx-2 flex-1 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}>
                            <item.icon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
        <div className="flex h-16 shrink-0 items-center justify-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>
        <nav className="mt-8">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                    "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                  )}>
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <span className="sr-only">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
          onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          Dashboard
        </div>
        <a href="#">
          <span className="sr-only">Your profile</span>
          <img
            className="h-8 w-8 rounded-full bg-gray-800"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </a>
      </div>

      <main className="lg:pl-20">
        <div className="xl:pl-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <Editor
              saveViewState={true}
              height="100vh"
              width="100%"
              defaultLanguage="python"
              defaultValue="def twoSum(nums: List[int], target: int) -> List[int]:"
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
          </div>
        </div>
      </main>

      <aside className="fixed inset-y-0 left-20 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        {/* <div dangerouslySetInnerHTML={{ __html: problem?. }}></div> */}
        <div dangerouslySetInnerHTML={{ __html: problem?.question }}></div>
      </aside>
    </div>
  );
}

export { Display };

"use client";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
const navigation = [{ name: "Feedback", href: "", current: true }];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [feedback, setFeedback] = useState<any>({});

  const { stop } = useVapi();

  useEffect(() => {
    stop();
  }, []);
  
  useEffect(() => {
    const feedbackStr = localStorage.getItem("feedback");
    if (feedbackStr !== null) {
      setFeedback(JSON.parse(feedbackStr));
    }
  }, []);

  // Feedback has this shape
  //   "{
  //     "feedback": "The candidate struggled to implement the approach discussed and had difficulty with the coding process. It's important to practice coding and problem-solving regularly to build confidence and improve skills.",
  //     "rating": 2,
  //     "weaknesses": "Difficulty with coding implementation",
  //     "strengths": "Understanding of the problem and initial approach"
  //   }"

  console.log(feedback.feedback);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <Link href="/">
                        <img
                          className="block h-8 w-auto lg:hidden"
                          src="https://cdn-icons-png.flaticon.com/512/9777/9777458.png"
                          alt="Your Company"
                        />
                        <img
                          className="hidden h-8 w-auto lg:block"
                          src="https://cdn-icons-png.flaticon.com/512/9777/9777458.png"
                          alt="Your Company"
                        />
                      </Link>
                    </div>

                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}>
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Feedback
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <Cards
                feedback={feedback.feedback}
                rating={feedback.rating}
                weaknesses={feedback.weaknesses}
                strengths={feedback.strengths}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

import { HoverEffect } from "@/components/card-hover-effect";
import { useVapi } from "@/hooks/useVapi";

export function Cards(feedback: any) {
  const feedbackList = [
    {
      title: `Primary feedback`,
      description: JSON.stringify(feedback.feedback),
      link: "",
    },
    {
      title: `Rating`,
      description: `${JSON.stringify(feedback.rating)} / 5`,
      link: "",
    },
    {
      title: `Weaknesses`,
      description: JSON.stringify(feedback.weaknesses),
      link: "",
    },
    {
      title: `Strengths`,
      description: JSON.stringify(feedback.strengths),
      link: "",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={feedbackList} />
    </div>
  );
}

import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { systemPrompt } from "./prompt";

export const assistant: CreateAssistantDTO | any = {
  name: "Technical-Interviewer",
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    systemPrompt: systemPrompt,
    // functions: [
    //   {
    //     name: "viewCode",
    //     async: false,
    //     description: "Returns the code written by the user. Can be used to view/see the code written by the user.",
    //   },
    // ],
  },
  voice: {
    provider: "11labs",
    voiceId: "paula",
  },
  firstMessage:
  `Hi, Names Allie, I'll be your interviewer. Let's get started`,
    // `Hello! My name is Allie, and I'll be your interviewer for today's technical interview. Today, we'll be working on a LeetCode problem that I have selected for our session. I'll start by providing you with the problem statement, constraints, and a few examples to ensure you have a clear understanding. Throughout the interview, I encourage you to think out loud and share your problem-solving approach with me. I'll be evaluating your thought process, coding skills, and ability to handle edge cases. Feel free to ask questions or seek clarification at any point during the interview. If you get stuck or need guidance, I'll provide hints and ask leading questions to help you progress towards the solution. Remember, the goal is not just to solve the problem but also to demonstrate your problem-solving abilities and coding proficiency. At the end of the session, I'll provide you with an overall evaluation of your performance, discussing the strengths and areas for improvement. Ready to begin?`,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
};

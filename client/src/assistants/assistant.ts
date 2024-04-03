import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { systemPrompt } from "./prompt";

export const assistant: CreateAssistantDTO | any = {
  name: "Technical-Interviewer",
  silenceTimeoutSeconds: 120,
  responseDelaySeconds: 2,
  endCallMessage: "Thank you for participating in the interview. Goodbye!",
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    systemPrompt: systemPrompt,
    functions: [
      // {
      //   name: "enableEditor",
      //   async: true,
      //   description: "Enables the code editor for the user, allowing them to write code. This function should be called after the problem statement has been said to the user.",
      //   parameters: {
      //     type: "object",
      //     properties: {
      //       enable: {
      //         type: "boolean",
      //         description: "A boolean value indicating whether the code editor should be enabled or disabled. Set this value to true to enable the code editor for the user",
      //       }
      //     },
      //   }
      // },
      {
        name: "finishInterview",
        async: true,
        description: "Ends the interview session and provides feedback to the user based on their performance.",
        parameters: {
          type: "object",
          properties: {
            feedback: {
              type: "string",
              description: "The feedback to provide to the user based on their performance during the interview.",
            },
            rating: {
              type: "number",
              description: "The rating to assign to the user based on their performance during the interview. This should be a value between 1 and 5.",
            },
            weaknesses: {
              type: "string",
              description: "The areas of weakness identified in the user's performance during the interview.",
            },
            strengths: {
              type: "string",
              description: "The strengths identified in the user's performance during the interview.",
            },
          },
        }
      }
    ],
  },
  voice: {
    provider: "11labs",
    voiceId: "paula",
  },
  firstMessage:
  `Hi, Names Allie, I'll be your interviewer. Ready to get started?`,
    // `Hello! My name is Allie, and I'll be your interviewer for today's technical interview. Today, we'll be working on a LeetCode problem that I have selected for our session. I'll start by providing you with the problem statement, constraints, and a few examples to ensure you have a clear understanding. Throughout the interview, I encourage you to think out loud and share your problem-solving approach with me. I'll be evaluating your thought process, coding skills, and ability to handle edge cases. Feel free to ask questions or seek clarification at any point during the interview. If you get stuck or need guidance, I'll provide hints and ask leading questions to help you progress towards the solution. Remember, the goal is not just to solve the problem but also to demonstrate your problem-solving abilities and coding proficiency. At the end of the session, I'll provide you with an overall evaluation of your performance, discussing the strengths and areas for improvement. Ready to begin?`,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
};

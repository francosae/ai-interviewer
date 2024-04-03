# Real-time AI Interviewer

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/wUBfcmuFfss/0.jpg)](https://www.youtube.com/watch?v=wUBfcmuFfss)

## Introduction
This Real-time AI Interviewer leverages AI to revolutionize the mock interview process (and hopefully real interviews) for aspiring SWEs. This system provides an immersive and interactive experience, enabling users to practice and enhance their coding skills while receiving real-time feedback and guidance from an intelligent virtual interviewer.

## Key Features
- **Real-time Voice Interaction**: Engage in natural, real-time voice conversations with the AI interviewer, simulating a realistic interview experience.
- **Hint Generation**: When faced with difficulties, the AI interviewer provides intelligent hints and suggestions to guide the user towards the optimal solution.
- **Real-time Code Analysis**: As the user types their code, the AI interviewer analyzes it in real-time, offering immediate feedback on syntax, logic, and best practices.
- **Comprehensive Assessment**: Upon completion of the interview, the AI interviewer generates a detailed assessment report, highlighting the user's strengths, areas for improvement, and overall coding capabilities.

## Architecture
The Real-time AI Interviewer is built using a modern and efficient architecture:
- **Frontend**: The user interface is developed using Next.js.
- **Real-time Communication**: Vapi is used as the Voice AI infrastructure to handle real-time communication between the user and the AI interviewer. Pipeline for text-to-speech, speech-to-text, and NLP processing is integration is handled.
- **WebSocket**: WebSocket is used for real-time, bidirectional communication between the frontend and the AI interviewer, ensuring a smooth and responsive user experience.
- **AI Models**: Models used are `gpt-3.5-turbo`, `11labs` for TSS, `deepgram` for STT 
- **Backend**: The backend logic is handled by Next.js API routes.

## Getting Started
To run the Real-time AI Interviewer locally, follow these steps:
1. Clone the repository: `git clone https://github.com/your-username/real-time-ai-interviewer.git`
2. Install dependencies: `npm install`
3. Set up the required environment variables (e.g., API keys).
4. Start the development server: `npm start`
5. Access the application in your web browser at `http://localhost:3000`

## License
Real-time AI Interviewer is released under the [MIT License](https://opensource.org/licenses/MIT).

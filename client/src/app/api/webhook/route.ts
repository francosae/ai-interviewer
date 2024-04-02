
export async function POST(request: Request) {
  try {
    if (request.method === "POST") {
      const { message } = await request.json();

      const { type = "function-call", functionCall = {}, call } = message;
      console.log("payload message", message);

      if (type === "function-call") {
        if (functionCall?.name === "finishInterview") {
          const parameters = functionCall?.parameters;
          console.log(parameters);
          return Response.json({
            result:
              "Interview has been completed. You can now call the finishInterview function.",
          });
        } else if (functionCall?.name === "enableEditor") {
          return Response.json({
            result: "The code editor is now enabled.",
          });
        }

        return Response.json({ data: functionCall?.parameters });
      }

      return Response.json({});
    }

    return Response.json({ message: "Not Found" });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" });
  }
}

export function GET(request: Request) {
  try {
    if (request.method === "GET") {
      return Response.json({ message: "Poopie" });
    }
} catch (err) {
    return Response.json({ message: "Internal Server Error" });
  }
}
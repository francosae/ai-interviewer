export const envConfig = {
    vapi: {
      apiUrl: process.env.NEXT_PUBLIC_VAPI_API_URL ?? "https://api.vapi.ai",
      token: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ?? "vapi-web-token",
    },
    deno: {
      orgId: process.env.DEPLOY_ORG_ID ?? "",
      accessToken: process.env.DEPLOY_ACCESS_TOKEN ?? "",
    }
  };
  
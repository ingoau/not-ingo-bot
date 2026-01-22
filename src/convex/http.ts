import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/slack/event",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    console.log("Request body", body);
    if (body.type === "url_verification") {
      console.log("Received Slack event:", body);
      return new Response(body.challenge);
    }
    return new Response("");
  }),
});
export default http;

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/slack/event",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    console.log("Received Slack event:", await request.json());
    return new Response("");
  }),
});
export default http;

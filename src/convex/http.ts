import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import type { LinkSharedEvent } from "@slack/web-api";

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
    if (body.type === "event_callback") {
      if (body.event.type === "link_shared") {
        const event = body.event as LinkSharedEvent;
        console.log("Received link shared event:", event);
      }
    }
    return new Response("");
  }),
});
export default http;

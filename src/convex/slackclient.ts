"use node";

import { WebClient } from "@slack/web-api";

// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;

// Initialize
export default new WebClient(token);

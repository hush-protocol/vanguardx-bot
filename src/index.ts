import { Probot } from "probot";


import * as mongoose from "mongoose";
import user from "./user.js";
import Telegram from "puregram";

mongoose.connect(process.env.DB ?? "")



function extractPointsFromTitle(title: string): number | null {
  // Define the regex to match 'points:<number>'
  const regex = /points:(\d+)/;

  // Use regex to search for the points value in the title
  const match = title.match(regex);

  // If a match is found, return the captured number, else return null
  return match ? parseInt(match[1]) : null;
}
// console.log(process.env.TOKEN,"token")
const telegram = Telegram.Telegram.fromToken(process.env.TOKEN ?? "");
export default (app: Probot) => {
  // const router = getRouter("/telegram");

  // router.use(telegram.updates.getWebhookMiddleware())

  app.on("issues.opened", async (context) => {
    // const formattedUsernames = `@Nithin-Varma @trudransh`;
    const notificationMessage = `Issue has been created , if you work on it let @dipanshuhappy know`;

    await telegram.api.sendMessage({
      chat_id:"-1002373955283",
      text: `
Issue ${context.payload.issue.title}
has been created at link ${context.payload.issue.html_url}
`,
      message_thread_id:2
    })
    
    const issueComment = context.issue({
      body: notificationMessage,
    });
    await context.octokit.issues.createComment(issueComment);
  })

    app.on("issues.closed", async (context) => {
      const timeline = await context.octokit.issues.listEventsForTimeline({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        issue_number: context.payload.issue.number,
        per_page: 100,
      });

      console.log(timeline.data, "timeline");
    
    timeline.data.forEach(async (event) => {
      // console.log(event, "event");
      const pr = (event as any).source;
      console.log(pr,'prevennnt')
      if (pr) {
        console.log(pr, "pr");
        console.log(pr, "pr");
        const points = extractPointsFromTitle(context.payload.issue.title);
        const userPoints = await user.findOne({githubUsername: pr.issue.user.login});
        if(userPoints && points){
          await user.findByIdAndUpdate(userPoints._id, {points: (userPoints.points ?? 0) + points});
        }
      }
    })
  
    console.log(context.payload.organization?.login, "login");

  })

  

  


  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};

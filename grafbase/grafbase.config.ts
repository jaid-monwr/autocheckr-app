import { g, config, auth } from "@grafbase/sdk";

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 100 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    role: g.string().optional(),
    description: g.string().length({ min: 2, max: 1000 }).optional(),
    githubUrl: g.url().optional(),
    linkedInUrl: g.url().optional(),
    tests: g
      .relation(() => Test)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });

// @ts-ignore
const Test = g
  .model("Test", {
    title: g.string().length({ min: 3 }),
    description: g.string(),
    image: g.url(),
    samplequestionpaper: g.url(),
    sampleanswer: g.url(),
    totalmarks: g.string(),
    duration: g.string(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    subject: g.string().search(),
    asnwersheet: g.url().optional(),
    answeredBy: g.relation(() => User).optional(),
    createdBy: g.relation(() => User),
  })
  .auth((rules) => {
    rules.public().read().update();
    rules.private().create().delete();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});

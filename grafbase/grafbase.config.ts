import { g, config, auth } from "@grafbase/sdk";

// @ts-ignore
const User = g.model("User", {
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  roleUrl: g.string(),
  description: g.string().length({ min: 2, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
  tests: g
    .relation(() => Test)
    .list()
    .optional(),
});
// .auth((rules) => {
//   rules.public().read();
// });

// @ts-ignore
const Test = g.model("Test", {
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
  createdBy: g.relation(() => User),
});
// .auth((rules) => {
//   rules.public().read();
//   rules.private().create().delete().update();
// });

// const jwt = auth.JWT({
//   issuer: "grafbase",
//   secret: g.env("NEXTAUTH_SECRET"),
// });

export default config({
  schema: g,
  // auth: {
  //   providers: [jwt],
  //   rules: (rules) => rules.private(),
  // },
});

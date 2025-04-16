/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-hono-pract",
      removal: input?.stage === "production" ? "remove" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Function("Hono", {
      url: true,
      handler: "src/index.handler",
    });
  },
});

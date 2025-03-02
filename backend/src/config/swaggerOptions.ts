// src/config/swaggerOptions.ts
import { Options } from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Banking system API documentation",
    version: "1.0.0",
    description:
      "This is the API documentation for the Banking system project.",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options: Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

export default options;

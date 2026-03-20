import swaggerJSDoc from "swagger-jsdoc";
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sistema Ganadero API",
            version: "1.0.0",
            description: "API para el control de sistema ganadero",
        },
        components: {
            schemas: {},
        },
    },
    apis: ["./src/routes/*.ts", "./src/docs/**/*.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;

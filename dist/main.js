"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const exceptions_filter_1 = require("./exception/exceptions.filter");
const swagger_1 = require("@nestjs/swagger");
const movies_module_1 = require("./movies/movies.module");
const comments_module_1 = require("./comments/comments.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), {
        logger: ['warn', 'error', 'log'],
    });
    const configService = app.get(config_1.ConfigService);
    const prefix = 'api';
    app.setGlobalPrefix(prefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        disableErrorMessages: false,
    }));
    class_validator_1.useContainer(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalFilters(new exceptions_filter_1.ExceptionsFilter());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Movie API')
        .setDescription('API for searching and saving movies')
        .setVersion('1.0')
        .build();
    const appDocument = swagger_1.SwaggerModule.createDocument(app, options, {
        include: [app_module_1.AppModule, movies_module_1.MoviesModule, comments_module_1.CommentsModule],
    });
    swagger_1.SwaggerModule.setup(prefix, app, appDocument);
    await app.listen(configService.get('PORT'), '0.0.0.0');
    common_1.Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
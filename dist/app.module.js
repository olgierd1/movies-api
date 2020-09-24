"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const typeorm_1 = require("@nestjs/typeorm");
const health_controller_1 = require("./health/health.controller");
const custom_health_1 = require("./health/custom.health");
const movies_module_1 = require("./movies/movies.module");
const comments_module_1 = require("./comments/comments.module");
const omdb_module_1 = require("./omdb/omdb.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            terminus_1.TerminusModule,
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    PORT: Joi.number().required(),
                    POSTGRES_HOST: Joi.string().required(),
                    POSTGRES_USER: Joi.string().required(),
                    POSTGRES_PASSWORD: Joi.string().required(),
                    POSTGRES_DB: Joi.string().required(),
                }),
                validationOptions: {
                    abortEarly: true,
                },
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    port: +configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    entities: [__dirname + '/**/*.model{.ts,.js}'],
                    autoLoadModels: true,
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            movies_module_1.MoviesModule,
            common_1.HttpModule,
            comments_module_1.CommentsModule,
            omdb_module_1.OmdbModule
        ],
        controllers: [health_controller_1.HealthController],
        providers: [custom_health_1.CustomHealthIndicator],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
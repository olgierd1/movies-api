"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_serializer_1 = require("../comments/comment.serializer");
const omdb_module_1 = require("../omdb/omdb.module");
const movie_model_1 = require("./movie.model");
const movie_serializer_1 = require("./movie.serializer");
const movies_controller_1 = require("./movies.controller");
const movies_service_1 = require("./movies.service");
let MoviesModule = class MoviesModule {
};
MoviesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([movie_model_1.Movie]),
            common_1.HttpModule,
            omdb_module_1.OmdbModule
        ],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [movies_controller_1.MoviesController],
        providers: [movies_service_1.MoviesService, movie_serializer_1.MovieSerializerService, comment_serializer_1.CommentsSerializerService]
    })
], MoviesModule);
exports.MoviesModule = MoviesModule;
//# sourceMappingURL=movies.module.js.map
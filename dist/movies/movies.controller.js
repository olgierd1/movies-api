"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = exports.FindOneParams = void 0;
const common_1 = require("@nestjs/common");
const create_movie_dto_1 = require("./dto/create.movie.dto");
const movies_service_1 = require("./movies.service");
const movie_dto_1 = require("./dto/movie.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const movie_serializer_1 = require("./movie.serializer");
class FindOneParams {
}
__decorate([
    class_validator_1.IsUUID('all', { message: 'Provide valid uuid' }),
    __metadata("design:type", String)
], FindOneParams.prototype, "uuid", void 0);
exports.FindOneParams = FindOneParams;
let MoviesController = class MoviesController {
    constructor(moviesService, moviesSerializer) {
        this.moviesService = moviesService;
        this.moviesSerializer = moviesSerializer;
    }
    create(payload) {
        return this.moviesService.create(payload);
    }
    findAll() {
        return this.moviesService.findAll();
    }
    async find(params) {
        return this.moviesSerializer.serialize(await this.moviesService.find(params.uuid));
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiCreatedResponse(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOkResponse({
        type: String,
        isArray: true
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':uuid'),
    swagger_1.ApiOkResponse({
        type: movie_dto_1.MovieDto
    }),
    swagger_1.ApiParam({ name: 'uuid' }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindOneParams]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "find", null);
MoviesController = __decorate([
    swagger_1.ApiTags('movies'),
    common_1.Controller('movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService,
        movie_serializer_1.MovieSerializerService])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map
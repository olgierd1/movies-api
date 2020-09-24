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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const movie_model_1 = require("./movie.model");
const omdb_service_1 = require("../omdb/omdb.service");
let MoviesService = class MoviesService {
    constructor(connection, omdbService) {
        this.connection = connection;
        this.omdbService = omdbService;
    }
    convert(data) {
        return {
            title: data.Title,
            director: data.Director,
            actors: data.Actors,
            plot: data.Plot,
            year: parseInt(data.Year)
        };
    }
    async create(opts) {
        const data = await this.omdbService.fetchMovie(opts);
        const movie = this.convert(data);
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const found = await queryRunner.manager.findOne(movie_model_1.Movie, {
                where: { title: movie.title }
            });
            if (found) {
                throw new common_1.ConflictException('Movie already exists in Database');
            }
            await queryRunner.manager.save(new movie_model_1.Movie(movie));
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return (await this.connection.getRepository(movie_model_1.Movie)
            .find({ select: ['id'] })).map(movie => movie.id);
    }
    async find(uuid) {
        const found = await this.connection.getRepository(movie_model_1.Movie).findOne(uuid, { relations: ["comments"] });
        if (!found) {
            throw new common_1.NotFoundException();
        }
        return found;
    }
};
MoviesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        omdb_service_1.OmdbService])
], MoviesService);
exports.MoviesService = MoviesService;
//# sourceMappingURL=movies.service.js.map
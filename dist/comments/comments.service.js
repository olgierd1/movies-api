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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const movie_model_1 = require("../movies/movie.model");
const typeorm_1 = require("typeorm");
const comment_model_1 = require("./comment.model");
let CommentsService = class CommentsService {
    constructor(connection) {
        this.connection = connection;
    }
    async create(commentDto) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const movie = await queryRunner.manager.findOne(movie_model_1.Movie, {
                where: { title: commentDto.movieTitle }
            });
            if (!movie) {
                throw new common_1.NotFoundException('Movie with this title does not exist in Database');
            }
            await queryRunner.manager.save(new comment_model_1.Comment({
                text: commentDto.text,
                author: commentDto.author,
                movie
            }));
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
        return (await this.connection.getRepository(comment_model_1.Comment).find({ select: ['id'] })).map(c => c.id);
    }
    async find(uuid) {
        const found = this.connection.getRepository(comment_model_1.Comment).findOne(uuid);
        if (!found) {
            throw new common_1.NotFoundException();
        }
        return found;
    }
};
CommentsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map
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
exports.Movie = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const comment_model_1 = require("../comments/comment.model");
let Movie = class Movie {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Movie.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Movie.prototype, "director", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Movie.prototype, "year", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Movie.prototype, "actors", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Movie.prototype, "plot", void 0);
__decorate([
    typeorm_1.OneToMany(() => comment_model_1.Comment, comment => comment.movie, { cascade: true }),
    __metadata("design:type", Array)
], Movie.prototype, "comments", void 0);
Movie = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Movie);
exports.Movie = Movie;
//# sourceMappingURL=movie.model.js.map
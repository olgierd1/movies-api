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
exports.MovieSerializerService = void 0;
const common_1 = require("@nestjs/common");
const base_serializer_1 = require("../serialize/base.serializer");
const comment_serializer_1 = require("../comments/comment.serializer");
let MovieSerializerService = class MovieSerializerService extends base_serializer_1.BaseSerializerService {
    constructor(commentsSerializerService) {
        super();
        this.commentsSerializerService = commentsSerializerService;
    }
    serialize(entity) {
        return Object.assign({ id: entity.id, title: entity.title, director: entity.director, actors: entity.actors, plot: entity.plot, year: entity.year }, (entity.comments && { comments: this.commentsSerializerService.serializeCollection(entity.comments) }));
    }
};
MovieSerializerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [comment_serializer_1.CommentsSerializerService])
], MovieSerializerService);
exports.MovieSerializerService = MovieSerializerService;
//# sourceMappingURL=movie.serializer.js.map
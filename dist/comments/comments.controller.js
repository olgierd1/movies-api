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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comments_service_1 = require("./comments.service");
const comment_dto_1 = require("./dto/comment.dto");
const create_comment_dto_1 = require("./dto/create.comment.dto");
const movies_controller_1 = require("../movies/movies.controller");
const comment_serializer_1 = require("./comment.serializer");
let CommentsController = class CommentsController {
    constructor(commentsService, commentsSerializerService) {
        this.commentsService = commentsService;
        this.commentsSerializerService = commentsSerializerService;
    }
    create(payload) {
        return this.commentsService.create(payload);
    }
    async findAll() {
        return await this.commentsService.findAll();
    }
    async find(params) {
        return this.commentsSerializerService.serialize((await this.commentsService.find(params.uuid)));
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiCreatedResponse(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOkResponse({
        type: String,
        isArray: true
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':uuid'),
    swagger_1.ApiOkResponse({
        type: comment_dto_1.CommentDto
    }),
    swagger_1.ApiParam({ name: 'uuid' }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movies_controller_1.FindOneParams]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "find", null);
CommentsController = __decorate([
    swagger_1.ApiTags('comments'),
    common_1.Controller('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService,
        comment_serializer_1.CommentsSerializerService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map
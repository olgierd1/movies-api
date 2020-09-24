"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_model_1 = require("./comment.model");
const comment_serializer_1 = require("./comment.serializer");
const comments_controller_1 = require("./comments.controller");
const comments_service_1 = require("./comments.service");
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([comment_model_1.Comment])
        ],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [comments_controller_1.CommentsController],
        providers: [comments_service_1.CommentsService, comment_serializer_1.CommentsSerializerService]
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map
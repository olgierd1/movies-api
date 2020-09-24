"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let ExceptionsFilter = class ExceptionsFilter {
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        if (status === 500) {
            common_1.Logger.error(exception);
        }
        response.status(exception.getStatus()).send({
            description: status === 400 ? (_a = exception === null || exception === void 0 ? void 0 : exception.response) === null || _a === void 0 ? void 0 : _a.message : exception.message
        });
    }
};
ExceptionsFilter = __decorate([
    common_1.Catch()
], ExceptionsFilter);
exports.ExceptionsFilter = ExceptionsFilter;
//# sourceMappingURL=exceptions.filter.js.map
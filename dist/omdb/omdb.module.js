"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmdbModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const omdb_service_1 = require("./omdb.service");
let OmdbModule = class OmdbModule {
};
OmdbModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule, config_1.ConfigModule],
        providers: [omdb_service_1.OmdbService],
        exports: [omdb_service_1.OmdbService]
    })
], OmdbModule);
exports.OmdbModule = OmdbModule;
//# sourceMappingURL=omdb.module.js.map
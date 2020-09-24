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
exports.OmdbService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let OmdbService = class OmdbService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async fetchMovie(opts) {
        try {
            const { data } = await this.httpService.get(`${this.configService.get('RESOURCE_BASE_URL')}&t=${opts.title}&y=${opts.year}`).toPromise();
            if (data.Response === 'False') {
                throw new common_1.NotFoundException(data.Error);
            }
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};
OmdbService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        config_1.ConfigService])
], OmdbService);
exports.OmdbService = OmdbService;
//# sourceMappingURL=omdb.service.js.map
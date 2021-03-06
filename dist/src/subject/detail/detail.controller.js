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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const detail_entity_1 = require("./detail.entity");
const swagger_1 = require("@nestjs/swagger");
const detail_service_1 = require("./detail.service");
const auth_1 = require("../../utils/auth");
let SubjectDetailController = class SubjectDetailController {
    constructor(service) {
        this.service = service;
    }
    get base() {
        return this;
    }
    createOne(req, dto, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.headers.authorization) {
                    const accountId = yield auth_1.getAccountId(request.headers.authorization);
                    const accountDetail = yield auth_1.getAccountDetail(request.headers.authorization);
                    return yield this.base.createOneBase(req, Object.assign(Object.assign({}, dto), { created_by_id: accountId, meta_created_by: accountDetail }));
                }
                else {
                    throw new common_1.UnauthorizedException();
                }
            }
            catch (err) {
                throw new common_1.HttpException(err.message || err.response, err.status);
            }
        });
    }
    createMany(req, dto, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.headers.authorization) {
                    const accountId = yield auth_1.getAccountId(request.headers.authorization);
                    const accountDetail = yield auth_1.getAccountDetail(request.headers.authorization);
                    const newDto = {
                        bulk: [],
                    };
                    newDto.bulk = dto.bulk.map((item) => {
                        return Object.assign(Object.assign({}, item), { created_by_id: accountId, meta_created_by: accountDetail });
                    });
                    return yield this.base.createManyBase(req, newDto);
                }
                else {
                    throw new common_1.UnauthorizedException();
                }
            }
            catch (err) {
                throw new common_1.HttpException(err.message || err.response, err.status);
            }
        });
    }
    getAverage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.service.getAverage();
            }
            catch (err) {
                throw new common_1.HttpException(err.message || err.response, err.status);
            }
        });
    }
};
__decorate([
    crud_1.Override(),
    __param(0, crud_1.ParsedRequest()),
    __param(1, crud_1.ParsedBody()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, detail_entity_1.SubjectDetail, Object]),
    __metadata("design:returntype", Promise)
], SubjectDetailController.prototype, "createOne", null);
__decorate([
    crud_1.Override(),
    __param(0, crud_1.ParsedRequest()),
    __param(1, crud_1.ParsedBody()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SubjectDetailController.prototype, "createMany", null);
__decorate([
    common_1.Get('custom/getAverage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectDetailController.prototype, "getAverage", null);
SubjectDetailController = __decorate([
    crud_1.Crud({
        model: {
            type: detail_entity_1.SubjectDetail,
        },
        params: {
            id: {
                field: 'id',
                type: 'string',
                primary: true,
            },
        },
    }),
    swagger_1.ApiTags('SubjectDetail'),
    common_1.Controller('subject_detail'),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [detail_service_1.SubjectDetailService])
], SubjectDetailController);
exports.SubjectDetailController = SubjectDetailController;
//# sourceMappingURL=detail.controller.js.map
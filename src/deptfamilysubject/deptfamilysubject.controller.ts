import {
  Controller,
  HttpException,
  Req,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import {
  CreateManyDto,
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { DeptFamilySubject } from './deptfamilysubject.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DeptFamilySubjectService } from './deptfamilysubject.service';
import { getAccountId, getAccountDetail } from '../utils/auth';

@Crud({
  model: {
    type: DeptFamilySubject,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
@ApiTags('DeptFamilySubject')
@Controller('deptfamilysubject')
@ApiBearerAuth()
export class DeptFamilySubjectController
  implements CrudController<DeptFamilySubject> {
  constructor(public service: DeptFamilySubjectService) {}

  get base(): CrudController<DeptFamilySubject> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: DeptFamilySubject,
    @Req() request: Request,
  ) {
    try {
      if ((request.headers as any).authorization) {
        const accountId = await getAccountId(
          (request.headers as any).authorization,
        );
        const accountDetail = await getAccountDetail(
          (request.headers as any).authorization,
        );

        return await this.base.createOneBase(req, {
          ...dto,
          created_by_id: accountId,
          meta_created_by: accountDetail,
        } as any);
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new HttpException(err.message || err.response, err.status);
    }
  }

  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<DeptFamilySubject>,
    @Req() request: Request,
  ) {
    try {
      if ((request.headers as any).authorization) {
        const accountId = await getAccountId(
          (request.headers as any).authorization,
        );
        const accountDetail = await getAccountDetail(
          (request.headers as any).authorization,
        );

        const newDto = {
          bulk: [],
        };

        newDto.bulk = dto.bulk.map((item) => {
          return {
            ...item,

            created_by_id: accountId,
            meta_created_by: accountDetail,
          };
        });

        return await this.base.createManyBase(req, newDto);
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new HttpException(err.message || err.response, err.status);
    }
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Load dot environment before load other modules
import dotenv = require('dotenv');
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './timeout.interceptor';
import { ProfileModule } from './profile/profile.module';
import { DepartmentModule } from './department/department.module';
import { UniversityModule } from './university/university.module';
import { SubjectModule } from './subject/subject.module';
import { DeptFamilySubjectModule } from './deptfamilysubject/deptfamilysubject.module';
import { DepartmentFamilyModule } from './departmentFamily/departmentFamily.module';
import { SubjectLikeModule } from './subjectLike/subjectLike.module';
import * as migrations from './migrations';

const { parsed } = dotenv.config({
  path:
    process.cwd() +
    '/.env' +
    (process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''),
});
process.env = { ...process.env, ...parsed };

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      password: process.env.TYPEORM_PASSWORD,
      username: process.env.TYPEORM_USERNAME,
      database: process.env.TYPEORM_DATABASE,
      port: Number(process.env.TYPEORM_PORT),
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
        __dirname + '/**/**/*.entity{.ts,.js}',
        __dirname + '/**/**/**/*.entity{.ts,.js}',
      ],
      logging: Boolean(process.env.TYPEORM_LOGGING),
      synchronize: false,
      migrationsRun: true,
      dropSchema: false,
      cli: {
        migrationsDir: __dirname + '/migrations',
      },
      migrations: [
        migrations.InitDB1601986774361,
        migrations.AddTableSubjectLike1602908535934,
      ],
    }),
    ProfileModule,
    UniversityModule,
    DepartmentModule,
    DepartmentFamilyModule,
    SubjectModule,
    DeptFamilySubjectModule,
    SubjectLikeModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: TimeoutInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}

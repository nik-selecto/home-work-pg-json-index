import { Module } from "@nestjs/common";
import { PgModule } from "../../general-modules/pg/pg.module";
import { AuthModule } from "../auth/auth.module";
import { TablesController } from "./tables.controller";
import { TablesService } from "./tables.service";

@Module({
  controllers: [TablesController],
  imports: [AuthModule, PgModule],
  providers: [TablesService],
})
export class TablesModule { }
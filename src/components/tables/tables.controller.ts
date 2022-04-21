import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { MeGuard } from "../auth/guards/me.guard";
import { CreateTableDto } from "./dto/create-table.dto";
import { TablesService } from "./tables.service";

@Controller({ path: 'tables', 'version': '1' })
export class TablesController {
  constructor(private tablesService: TablesService) { }

  @Post('for-user/:userId')
  @UseGuards(MeGuard)
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTableForUser(@Param('userId') userId: string, @Body() data: CreateTableDto) {
    const { tableName } = data;
    
    return this.tablesService.createTableForUser(userId, tableName);
  }
}
import { PartialType } from '@nestjs/mapped-types';
import { EarningDto } from './earning.dto';

export class UpdateEarningDto extends PartialType(EarningDto) {}

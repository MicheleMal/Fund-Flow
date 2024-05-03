import { PartialType } from '@nestjs/mapped-types';
import { EarningSourceDto } from './earning-source.dto';

export class UpdateEarningSourceDto extends PartialType(EarningSourceDto) {}

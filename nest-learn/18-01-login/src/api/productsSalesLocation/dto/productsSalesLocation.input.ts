import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { ProductsSalesLocation } from '../entities/productsSalesLocation.entity';

@InputType()
export class ProductsSalesLocationInput extends OmitType(
  ProductsSalesLocation,
  ['id'],
  InputType,
) {}

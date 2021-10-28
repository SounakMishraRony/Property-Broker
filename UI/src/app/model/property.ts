import { IPropertybase } from "./IPropertybase";
import { Photo } from "./Photo";

export class property implements IPropertybase
{
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  propertyTypeId: number;
  bhk: number;
  furnishingType: string;
  furnishingTypeId: number;
  price: number;
  builtArea: number;
  carpetArea?: number;
  address: string;
  address2?: string;
  city: string;
  cityId: number;
  floorNo?: string;
  totalFloors?: string;
  readyToMove: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: number;
  maintenance?: number;
  estPossessionOn?: string;
  image?: string;
  description?: string;
  postedOn: string;
  postedBy: number;
  photos?:Photo[];
  contact:string;
}

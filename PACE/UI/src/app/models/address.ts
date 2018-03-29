import { BaseModel } from './base.model';

export class Address extends BaseModel {
    public id: number;
    public addressTypeId: number;
    public propertyTypeId: number;
    public streetTypeId: number;
    public subPropertyTypeId: number;
    public suburbId: number;
    public propertyName: string;
    public blockNo: string;
    public lotNo: string;
    public floor: string;
    public unit: string;
    public streetNo: string;
    public streetName: string;
    public latitude: string;
    public longitude: string;
    public geoResults: string;
    public titleReference: string;
    public section: string;
}
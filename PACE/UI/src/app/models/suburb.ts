import { BaseModel } from './base.model';

export class Suburb extends BaseModel {
    public id: number;
    public stateId: number;
    public countryTypeId: number;
    public district: string;
    public city: string;
    public suburbName: string;
    public postCode: string;


}

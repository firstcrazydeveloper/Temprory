import { BaseModel } from './base.model';

export class User extends BaseModel {
    public id: number;
    public businessLineId: number;
    public peopleSoftId: number;
    public employeeId: number;
    public userName: string;
    public domain: string;
    public position: string;
    public statusId: number;
}

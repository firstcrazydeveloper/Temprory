import { BaseModel } from './base.model';

export class UserPersonalDetail extends BaseModel {
    public id: number;
    public userId: number;
    public email: string;
    public mobile: string;
    public prefix: string;
    public firstName: string;
    public lastName: string;
}

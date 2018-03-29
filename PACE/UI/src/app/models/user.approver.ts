import { BaseModel } from './base.model';

export class UserApprover extends BaseModel {
    public id: number;
    public userId: number;
    public approverId: number;

}



import { BaseModel } from './base.model';

export class Role extends BaseModel {
    public id: number;
    public name: string;
    public modified: string;
    public isSuperAdmin: boolean;
    public totalCount: number;


    // constructor(id, name, users, date, count, isActive) {
    //     this.id = id;
    //     this.name = name;
    //     this.modified = date;
    //     this.createdBy = 'in/gagande.pratihar';
    //     this.modifiedBy = 'in/gagande.pratihar';
    //     this.isSuperAdmin = false;
    //     this.totalCount = count;
    //     this.IsDeleted = isActive;
    // }
}

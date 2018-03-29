export class Role {
    public id: number;
    public name: string;
    public modified: string;
    public isSuperAdmin: boolean;
    public createdBy: string;
    public modifiedBy: string;
    public totalCount: number;
    public IsDeleted: boolean;

    constructor(id: number, name: string, users: any, date: string, count: number, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.modified = date;
        this.createdBy = 'in/gagande.pratihar';
        this.modifiedBy = 'in/gagande.pratihar';
        this.isSuperAdmin = false;
        this.totalCount = count;
        this.IsDeleted = isActive;
    }
}

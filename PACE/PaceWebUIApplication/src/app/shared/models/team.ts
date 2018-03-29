export class Team {
    public id: number;
    public name: string;
    public modified: string;
    public createdBy: string;
    public modifiedBy: string;
    public totalCount: number;
    public isDeleted: boolean;
    public status: number;

    constructor(id: number, name: string, status: number, date: string, count: number, isDeleted: boolean) {
        this.id = id;
        this.name = name;
        this.modified = date;
        this.createdBy = 'in/divya.gusain';
        this.modifiedBy = 'in/divya.gusain';
        this.totalCount = count;
        this.isDeleted = isDeleted;
        this.status = 0;// change it to status after adding new status column
    }
}

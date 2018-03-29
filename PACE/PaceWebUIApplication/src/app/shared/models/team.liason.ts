export class TeamLiason {
    public id: number;
    public teamId: number;
    public createdBy: string;
    public modifiedBy: string;

    constructor(id: number, teamId: number, userId: number) {
        this.id = id;
        this.teamId= teamId;
        this.createdBy = 'in/divya.gusain';
        this.modifiedBy = 'in/divya.gusain';

    }
}

export class RoleAction {
    public roleId: number;
    public actionTypeId: number;
    private description: string;
    public isEnabled: number;

    constructor(id: number, desc: string, value: number) {
        this.roleId = id;
        this.description = desc;
        this.isEnabled = value;
    }
}

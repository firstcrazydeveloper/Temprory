export class RoleAction {
    public roleId: number;
    public actionTypeId: number;
    private description: string;
    public isEnabled: number;

    constructor(id, desc, value) {
        this.roleId = id;
        this.description = desc;
        this.isEnabled = value;
    }
}

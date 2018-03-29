import { BaseModel } from './base.model';
export class Team extends BaseModel {
    public id: number;
    public name: string;
    public modified: string;
    public status: number;
}

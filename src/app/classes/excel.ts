export class Excel {
    name:string;
    rows:string[][] = [];

    constructor(header:string[]){
        this.rows.push(header);
    }
}

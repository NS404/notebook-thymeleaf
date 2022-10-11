import {Note} from "./Note"
class Category{
    public name: string;
    public notes: Note[];

    constructor(name: string, notes: Note[]) {
        this.name = name;
        this.notes = notes;
    }

    public getName() {
        return this.name
    }

    public setName(name: string) {
        this.name = name;
    }

    public getNotes() {
        return this.notes;
    }

    public setNotes(notes: Note[]) {
        this.notes = notes;
    }

}

export{Category}
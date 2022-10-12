class Note{
    public title: string;
    public content: string;
    public categoryName: string;

    constructor(title: string, content: string, categoryName: string) {
        this.title = title;
        this.content = content;
        this.categoryName = categoryName;
    }

    public getTitle() {
        return this.title
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getContent() {
        return this.content;
    }

    public setContent(content: string) {
        this.content = content;
    }


    public getCategoryName(){
        return this.categoryName
    }

    public setCategoryName(categoryName: string){
        this.categoryName = categoryName;
    }
}

export{Note}
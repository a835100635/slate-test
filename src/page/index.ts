class Page {
    public name;
    constructor() {

    }
    public getName(): string {
        this.name = 'page ts';
        return this.name;
    }
}

export default Page;
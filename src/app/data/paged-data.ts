import { Page } from "app/data/page";


export class PagedData<T> {
    data = new Array<T>();
    page = new Page();
}
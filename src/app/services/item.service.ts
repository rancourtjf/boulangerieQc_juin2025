import {Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  http=inject(HttpClient)
items: any;
getItems(pageSize: number, currentPage: number) {
const queryParams = `?pageSize=${pageSize}&page=${currentPage}`;
return this.http.get<{ message: string, items: any, maxCount: number }>('API_URL' + queryParams)
.pipe(map((itemData) => {
return {
item: itemData.items,
maxCount: itemData.maxCount
};
})).subscribe((res) => {
this.items = res.item;
});
}
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})

export class SearchFilter implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if (el.nombre) {
                    return el.nombre.toString().toLowerCase().indexOf(input) > -1;
                } else if (el.name) {
                    return el.name.toString().toLowerCase().indexOf(input) > -1;
                } else {
                    return el.nombre.toString().toLowerCase().indexOf(input) > -1;
                }
            })
        }
        return value;
    }
}

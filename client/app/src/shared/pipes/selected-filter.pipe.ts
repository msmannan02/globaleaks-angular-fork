import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'selectedFilter',
})
export class SelectedFilterPipe implements PipeTransform {
    transform(items: any[], receivers: any[]): any[] {
        if (!items || !receivers) return items;

        return items.filter((item) => {
            return !receivers.includes(item.id);
        });
    }
}
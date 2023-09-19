import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
    transform(value: string, searchText: string): string {
        if (!searchText || !value) return value;

        const pattern = new RegExp(searchText, 'gi');
        return value.replace(pattern, (match) => `<span class="highlight">${match}</span>`);
    }
}
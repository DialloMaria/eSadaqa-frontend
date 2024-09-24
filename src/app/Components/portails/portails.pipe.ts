import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'portails',
  standalone: true
})
export class PortailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appBooleanPipe',
})
export class BooleanPipePipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'activos'  : 'inactivos'
  }

}

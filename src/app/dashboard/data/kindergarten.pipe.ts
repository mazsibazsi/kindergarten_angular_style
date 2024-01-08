import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kindergarten'
})
export class KindergartenPipe implements PipeTransform {

  transform(value: number) : any {
    let res = [];
    for (let i = 0; i < value; i++) {
        res.push(i + 1);
      }
      return res;
  }

}
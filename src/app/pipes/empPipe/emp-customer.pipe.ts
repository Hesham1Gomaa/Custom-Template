import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empCustomPipe'
})
export class empCustomPipe implements PipeTransform {

  transform(value: any, customers?: any): any { 
    debugger;
    var index=customers.findIndex(item=>item.id==value);
    var name=customers[index].customerName;
    return name;
  }

}

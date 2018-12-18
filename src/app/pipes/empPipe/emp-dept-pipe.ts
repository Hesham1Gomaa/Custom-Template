import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empDpPipe'
})
export class empDpPipe implements PipeTransform {

  transform(value: any, DPs?: any): any { 
    debugger;
    var index=DPs.findIndex(item=>item.id==value);
    var name=DPs[index].departmentName;
    return name;
  }

}

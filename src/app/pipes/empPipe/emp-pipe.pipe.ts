import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empPipe'
})
export class EmpPipePipe implements PipeTransform {

  transform(value: any, managerList?: any): any { 
    debugger;
    var index=managerList.findIndex(item=>item.id==value);
    var name=managerList[index].contactName;
    return name;
  }

}

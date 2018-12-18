import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empTLPipe'
})
export class empTLPipe implements PipeTransform {

  transform(value: any, TLs?: any): any { 
    debugger;
    var index=TLs.findIndex(item=>item.id==value);
    var name=TLs[index].contactName;
    return name;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { BaseUrl } from '../../services/base.service';

@Pipe({
  name: 'backgroundImage'
})
export class BackgroundImagePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (args[0]) { return { 'background-image': 'url(' + args[0] + ')' }; }
    if (value) {
      return { 'background-image': 'url(' + BaseUrl.appUrl + '/viewFile/' + value + (args[2] ? `?type=${args[2]}` : '') + ')' };
    } else { return { 'background-image': 'url(' + args[1] + ')' }; }
  }

}

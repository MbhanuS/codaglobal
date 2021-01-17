import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, ...args: string[]): any {
    console.log(args[0])
    if(args[0] == undefined) {
      return value;
    } else {
      console.log(value)
      let search = args[0].toLocaleLowerCase().trim();
      const searchedData = value.filteredData.filter((user: any) => {
        let userSearch = user.Name.substring(0, search.length);
        if(search == userSearch.toLocaleLowerCase()) {
          console.log(user)
          return user
        }
      })
      return searchedData
    }
  }

}

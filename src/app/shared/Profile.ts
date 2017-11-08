

import { Address }  from './Address';
import { Purchase } from './Purchase';


export class Profile {
  constructor(
    private name: string = 'unknown',
    private password: string = 'invalid',
    private address: Address = new Address(),
  ) { }

}

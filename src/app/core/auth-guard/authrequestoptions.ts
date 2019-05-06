import { Headers, Http, BaseRequestOptions } from '@angular/http';
import { KEY } from '../token/token.service';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

export class AuthRequestOptions extends BaseRequestOptions {
  
  constructor() {
    super();
    
    const token = localStorage.getItem(KEY);
    if(token) {
      this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
  }

}
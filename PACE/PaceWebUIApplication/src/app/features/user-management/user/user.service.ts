import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  pageSize = 25;
  constructor(private httpService: HttpService) { }
}
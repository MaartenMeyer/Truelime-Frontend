import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class BoardResolver implements Resolve<Observable<any>> {
  constructor(private boardService: BoardService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.boardService.getBoardById(id).pipe(
      map(response => {
        if(response) {
          return response
        }
        this.router.navigate(['boards/myboards/'])
        return null
      }),
      catchError(error => {
        this.router.navigate(['boards/myboards/'])
        return of(null)
      })
    )
  }
}
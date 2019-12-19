import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BoardService} from '../../../services/board.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.css']
})
export class NewBoardComponent implements OnInit {

  boardForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private boardService: BoardService, private router: Router) { }

  ngOnInit() {
    this.boardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      colors: [['#FCFF33', '#F00101', '#1BF001']]
    });
  }

  get form() {
    return this.boardForm.controls;
  }

  submitBoard() {
    this.submitted = true;
    if (this.boardForm.invalid) {
      return;
    }
    this.boardService.createBoard(this.boardForm.value)
      .pipe(first()).subscribe(data => {
        console.log(data)
        this.router.navigate([`/boards/board/${data.id}`]);
        
    });
  }

}

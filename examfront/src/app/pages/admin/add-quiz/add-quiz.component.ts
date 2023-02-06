import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  constructor(private _cat: CategoryService, 
  private _snack:MatSnackBar, public _quiz:QuizService) { }

  categories:any

  quizData = {
    'title': '',
    'description': '',
    'maxMarks': '',
    'numberOfQuestions': '',
    'active': true,
    'category':{
      'cid':'',
    },
  };



  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);

      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data from server!!', 'error')

      }
    )

  }

  addQuiz(){
      
    if(this.quizData.title==null || this.quizData.title.trim()==''){

      this._snack.open('Title Required','',{
        duration:3000,
      });
      return;
    }
    
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success','Quiz added successfully','success')
        this.quizData = {
          'title': '',
          'description': '',
          'maxMarks': '',
          'numberOfQuestions': '',
          'active': true,
          'category':{
            'cid':'',
          },
        };

      },
      (error)=>{
        Swal.fire('error','Error in getting data','error')
        console.log(error);    
      }
    );
} 

}

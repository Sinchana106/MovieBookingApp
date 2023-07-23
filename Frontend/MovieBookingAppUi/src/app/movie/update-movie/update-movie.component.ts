import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Movie } from 'src/app/_classes/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {

  movieId!:number;
  movie!:Movie;
  constructor(private route:ActivatedRoute,private movieService:MovieService,private router:Router) { }

  ngOnInit(): void {
    this.movieId=this.route.snapshot.params['movieId'];
    this.movieService.getMovieById(this.movieId).subscribe((data)=>{
      console.log(data);
      this.movie=data;
    })
  }

  onSubmit(){
    this.movieService.updateMovie(this.movie,this.movieId,).subscribe((response)=>{
      console.log(response);
      alert("Movie is updated Successfully!!");
      this.router.navigate(['/view-movie'])
    },(error)=>{
      console.log(error);
    })
  }
}

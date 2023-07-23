import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSuccessComponent } from 'src/app/modal-success/modal-success.component';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { TheatreService } from 'src/app/services/theatre.service';
import { Theatre } from 'src/app/_classes/theatre';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit {

  constructor(private theatreService: TheatreService,
    private dialog: MatDialog,
    private router: Router,
    private dataTransfer: DataTransferService) { }

  theatre!: Theatre;

  ngOnInit(): void {
  }

  //To Save Theatre Details in Database
  save(addTheatre: NgForm) {
    console.log(addTheatre.value)
    this.theatreService.addTheatre(addTheatre).subscribe((response) => {
      console.log(response);
      this.dataTransfer.data = "Theatre details are Added SuccessFully!"
      this.openModalSuccess();
      this.router.navigate(['/view-theatre'])
    }, (error) => {
      console.log(error);
    })
  }

  openModalSuccess(): void {
    this.dialog.open(ModalSuccessComponent, {
      width: '400px',
    });
  }
}

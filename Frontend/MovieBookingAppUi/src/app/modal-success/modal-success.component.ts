import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.css']
})
export class ModalSuccessComponent implements OnInit {

  data!: string;
  constructor(private dataTransfer: DataTransferService) { }

  ngOnInit(): void {
    this.data = this.dataTransfer.data;
  }

}

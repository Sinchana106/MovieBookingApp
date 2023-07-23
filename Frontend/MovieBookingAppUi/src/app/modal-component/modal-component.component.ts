import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {

  constructor(private dataService: DataTransferService) { }

  data!: string;
  ngOnInit(): void {
    //It is used to transfer data between components
    this.data = this.dataService.data;
  }

}

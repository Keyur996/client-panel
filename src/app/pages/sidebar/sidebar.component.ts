import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddClientComponent } from '../add-client/add-client.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  show = () => {
    const ref = this.dialogService.open(AddClientComponent, {
      // header: "Welcome Client",
      // autoZIndex: false,
      showHeader: false,
      width: '60%',
      closable: true,
    });
  }
}

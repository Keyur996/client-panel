import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { ClientDetailComponent } from '../client-detail/client-detail.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  @Input() clients: Client[];
  client: Client;
  @Input() total: number;

  constructor(private clientService: ClientService,
    private dialog: DialogService,
    public message: MessageService,
    private tostr: ToastrService,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
  }

  showDetail = (id: DOMStringList): void => {
    // console.log(id);
    this.dialog.open( ClientDetailComponent , {
      width: '60%',
      showHeader: false,
      closable: true,
      data: {
        id: id,
      },
    });
  }

  delete = (id: string): void => {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.clientService.deleteClient(id);
          this.message.add({ severity: 'success', summary: 'Client Deleted Successfully..' });
          setTimeout( () => this.message.clear(), 3000);
      },
      reject: () => {
          this.tostr.info('Rejected', 'You are Safe...', {
            timeOut: 3000,
            closeButton: true,
          });
      }
    });
  }
}

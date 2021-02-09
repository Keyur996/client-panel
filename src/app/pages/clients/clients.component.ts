import { Component, OnInit } from '@angular/core';
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
  clients: Client[];
  client: Client;
  totalOwned: number;

  constructor(private clientService: ClientService,
    private dialog: DialogService,
    public message: MessageService,
    private tostr: ToastrService,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      console.log(typeof this.clients);
      this.getTotalOwned();
      // console.log(this.getTotalOwned());
    });
  }

  getTotalOwned = (): void => {
    const total: number = this.clients.reduce( (total, client) => {
      // console.log(typeof client.balance);
      return (total + client.balance);
    }, 0);
    this.totalOwned = total;
    // const map = this.clients.map( (client) => {
    //   return client.balance;
    // });
    // console.log(map);
    console.log(this.totalOwned);
    // console.log(JSON.stringify(this.clients));
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

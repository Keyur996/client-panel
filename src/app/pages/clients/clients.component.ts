import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  clients: Client[];
  client: Client;
  totalOwned: number;

  constructor(private clientService: ClientService) { }

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
}

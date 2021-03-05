import { Component, OnInit} from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clients: Client[];
  totalOwned: number;
  show: boolean = false;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.show = true;
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwned();
      this.show = false;
    });
  }

  getTotalOwned = (): void => {
    const total: number = this.clients.reduce( (total, client) => {
      return (total + client.balance);
    }, 0);
    this.totalOwned = total;
    console.log(this.totalOwned);
  }
}

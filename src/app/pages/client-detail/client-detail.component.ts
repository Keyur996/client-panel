import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  @ViewChild('clientForm') form: any;

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  constructor(private clientService: ClientService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private message: MessageService,
    ) { }

  ngOnInit(): void {
    //get id
    this.id = this.config.data.id;
    // console.log(this.config.data);

    this.clientService.getSingleClient(this.id).subscribe( client => {
      console.log(client);
      this.client = client;
    })
  }
  
  onSubmit({value, valid}: {value:Client, valid:boolean}) {
    // console.log(this.id);

    //Add id to Client 
    value.id = this.id;

    if(!valid){
      this.message.add({ severity: 'error', summary: 'Fill Data Properly' });
      setTimeout( () => this.message.clear() , 3000);
    } else {
      this.clientService.updateClient(value);
      this.ref.close();
      this.message.add( {severity: 'success', summary: 'Client Updated Successfully'} );
      setTimeout( () => this.message.clear() , 3000);
    }
    
  }
}

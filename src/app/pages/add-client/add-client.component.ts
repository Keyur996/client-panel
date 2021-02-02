import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  @ViewChild('clientForm') form: any;

  client: Client ={
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  }

  constructor(public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private message: MessageService,
    private clientService: ClientService) { }

  ngOnInit(): void {
  }

  onSubmit = ({value, valid }: { value:Client, valid: boolean} ) => {
    if(!valid) {
      // message
      console.log(valid);
      this.message.add({severity: 'error', summary: 'Please Enter valid Data', detail: 'fill properly'});
      setTimeout(() => this.message.clear(), 3000);
    } else {
      console.log(value);
      this.clientService.saveClient(value);
      this.form.reset();
      this.message.add({severity: 'success', summary: 'Data Added Successfully'});
      setTimeout(() => this.message.clear(), 3000);
    }
  }

  close = ():void => {
    this.ref.close()
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientCollection = this.afs.collection('clients', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.clients;
  }

  saveClient = (client: Client): void => {
    this.clientCollection.add(client);
  };

  getSingleClient = (id: string): Observable<Client> => {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    //get Client
    this.client = this.clientDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          // this.message.add({ severity: 'danger',  })
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );

    return this.client;
  };

  updateClient = (client: Client): void => {
    this.clientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientDoc.update(client);
  };

  deleteClient = (id: string): void => {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.clientDoc.delete();
  };
}

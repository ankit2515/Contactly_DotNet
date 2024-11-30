import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from './models/contact.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule,AsyncPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);
  Contact$ = this.getContacts();
  contactsForm=new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(true)
  })

  onFormSubmit(){
    const addContactReq={
      name: this.contactsForm.value.name,
      email: this.contactsForm.value.email,
      phone: this.contactsForm.value.phone,
      favorite: this.contactsForm.value.favorite,
    }

    this.http.post('https://localhost:7255/api/Contact',addContactReq).subscribe(
      {
        next: (value)=>{
          this.Contact$=this.getContacts();
          this.contactsForm.reset();
        }
      }
    );
    
  }

  onDelete(id: String){
    this.http.delete(`https://localhost:7255/api/Contact/${id}`).subscribe(
      {
       next: (value)=>{
        alert('contact Deleted');
        this.Contact$=this.getContacts();
       } 
      }
    )
  }

private getContacts() : Observable<Contact[]>{
   return this.http.get<Contact[]>('https://localhost:7255/api/Contact');
}

}

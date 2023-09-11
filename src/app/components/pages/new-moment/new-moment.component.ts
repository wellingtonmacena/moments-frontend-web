import { Router } from '@angular/router';
import { MessagesService } from './../../../services/messages.service';
import { MomentService } from './../../../services/moment.service';
import { Component } from '@angular/core';
import { Moment } from 'src/app/Interfaces/Moment';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  btnText = 'Compartilhar!';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  async createHandler(moment: Moment) {
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

     (await this.momentService.createMoment(formData)).subscribe(item => {

      this.messagesService.add('Momento adicionado com sucesso!')
      this.router.navigate(['/'])
     })
  }
}

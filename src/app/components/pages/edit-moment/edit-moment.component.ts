import { MessagesService } from './../../../services/messages.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent {
  moment!: Moment;

  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData = new FormData();

    formData.append('id', id!.toString());
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image_url) {
      formData.append('image', momentData.image_url);
    }

    await (await this.momentService.updateMoment(id!, formData)).subscribe(item =>  this.messagesService.add(`Momento ${id} foi atualizado com sucesso`));

setTimeout(()=>{this.router.navigate(['/']);}, 1000)

  }
}

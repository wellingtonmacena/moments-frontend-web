import { Comment } from './../../../Interfaces/Comment';
import { MessagesService } from './../../../services/messages.service';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MomentService } from './../../../services/moment.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Interfaces/Moment';
import { environment } from 'src/environments/environments';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
    private commentService: CommentService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe(comment => this.moment!.comments!.push(comment.data));


    this.messagesService.add('Comentário adicionado!');
    this.commentForm.reset();

    formDirective.resetForm();


  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    setTimeout(() => {}, 3000);
    this.messagesService.add('Excluído com sucesso');

    this.router.navigate(['/']);
  }
}

import { MomentService } from './../../../services/moment.service';
import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/Interfaces/Moment';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;
  faSearch = faSearch;
  searchTerm: string = '';


  constructor(private momentService: MomentService) {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;
      data.map((item) => {
        item.format_created_at = item.created_at;
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });


      this.allMoments = data.sort( (a, b)=> new Date(a.format_created_at!).getTime() - new Date(b.format_created_at!).getTime());
      this.moments = this.allMoments;
    });

  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value == '') {
      this.moments = this.allMoments;
    } else {
      this.moments = this.allMoments.filter(
        (item) => item.title != null && item.title.toLowerCase().includes(value)
      );
    }
  }
}

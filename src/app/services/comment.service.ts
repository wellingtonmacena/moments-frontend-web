import { Response } from './../Interfaces/Response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Comment } from '../Interfaces/Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/api/v1/moments`;

  constructor(private http: HttpClient) {}

  async createComment(data: Comment):Promise<Observable<Response<Comment>>>{
    const url = `${this.apiUrl}/${data.moment_id}/comments`;

    return await this.http.post<Response<Comment>>(url, data);
  }
}


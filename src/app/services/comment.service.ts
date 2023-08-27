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
  private apiUrl = `${this.baseApiUrl}/api/moments`;

  constructor(private http: HttpClient) {}

  createComment(data: Comment):Observable<Response<Comment>>{
    const url = `${this.apiUrl}/${data.momentId}/comments`;

    return this.http.post<Response<Comment>>(url, data);
  }
}


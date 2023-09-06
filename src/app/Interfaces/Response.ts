export interface Response<T> {
  message?: string;
  data: T;
  momentId: string;
  created_at?: string;
  updated_at?: string;
}

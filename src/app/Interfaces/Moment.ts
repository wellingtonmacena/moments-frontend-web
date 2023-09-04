export interface Moment{
  id?:number,
  title:string,
  description:string,
  image_url:string,
  image:string,
  created_at?:string,
  format_created_at?:string,
  updated_at?:string,
  comments?:[{text:string; username:string}]
}

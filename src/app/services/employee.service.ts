import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  allBooks!:Employee[];
  private book = new BehaviorSubject({});
  private bookList = new BehaviorSubject<Array<Employee>>([]);
  private bookauthor = new BehaviorSubject('');
  private bookcategory = new BehaviorSubject('');

  pubBook = this.book.asObservable();
  pubBookList = this.bookList.asObservable();
  pubBookAuthor = this.bookauthor.asObservable();
  pubBookCategory = this.bookcategory.asObservable();

  constructor(private _httpClinet:HttpClient) { }
  // getBooks():Observable<any>{
    //  this._httpClinet.get('http://localhost:5000/book').subscribe((res:any)=>{
    //   // console.log(res);
    //   this.allBooks=res
    //   return res
    //  });
    
  getBooks():Observable<any>{
    return  this._httpClinet.get('http://localhost:5000/book')
   }

 
   add(employeeData:any):Observable<any>{
     return this._httpClinet.post(`http://localhost:5000/employees`,employeeData)
    }
 
    updateBook(id:any,newData:any):Observable<any>{
     return this._httpClinet.put(`http://localhost:5000/book/${id}`,newData)
    }
 

  loadBooks(): void {
    this._httpClinet.get('http://localhost:5000/book').
    subscribe((res: any) => this.bookList.next(res.data.book));
  }
  getSpecificBook(_id: string): any {
    this._httpClinet.get(`http://localhost:5000/book/${_id}`).
    subscribe((res: any) => {
      this.book.next(res.data.book[0]);
      this.bookauthor.next(res.data.book[0].AuthorId);
      this.bookcategory.next(res.data.book[0].categoryId);
    })
    return this.pubBook
  }

}

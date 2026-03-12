

import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookFormComponent implements OnInit {
  book: Book = { id: 0, title: '', author: '', isbn: '', publicationDate: '' };
  isEditMode = false;
  errorMessage: string = '';

  constructor(
    private bookService: BookService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.bookService.getBook(+id).subscribe(data => {
        this.book = data;
        if (this.book.publicationDate) {
          this.book.publicationDate = this.book.publicationDate.split('T')[0];
        }
      });
    }
  }

  saveBook() {
    this.errorMessage = '';

    if (this.isEditMode) {
      this.bookService.updateBook(this.book).subscribe(() => {
        alert("Book updated successfully");
        this.router.navigate(['/']);
      });
    } else {
      
      this.bookService.getBooks().subscribe(allBooks => {
        const exists = allBooks.find(b => b.id === this.book.id);
        if (exists) {
          this.errorMessage = "Error: A book with this ID already exists!";
        } else {
          this.bookService.addBook(this.book).subscribe(() => {
            alert("Book added successfully");
            this.router.navigate(['/']); 
          });
        }
      });
    }
  }
}
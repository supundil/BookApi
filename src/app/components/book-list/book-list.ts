import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
   imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  isLoading: boolean = true;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.isLoading = true;
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  // deleteBook(id: number) {
  //   this.bookService.deleteBook(id).subscribe(() => {
  //     this.loadBooks();
  //   });
  // }
  deleteBook(id: number) {
    if (confirm("Are you sure you want to delete this book?")) { // Confirmation added
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }
  editBook(book: Book) {
    if (confirm("Are you sure you want to edit this book?")) { // Confirmation added
      this.router.navigate(['/edit', book.id]);
    }
  }
}
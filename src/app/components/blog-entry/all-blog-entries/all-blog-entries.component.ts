import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogEntriesPageable } from 'src/app/model/blog-entry.interface';
import { WINDOW } from 'src/window.token';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent implements OnInit {

  @Input() blogEntries: BlogEntriesPageable | undefined;
  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  pageEvent: PageEvent | undefined;

  origin = this.window.location.origin;

  constructor(private router: Router, @Inject(WINDOW) private window: Window) { }


  ngOnInit(): void {
  }

}

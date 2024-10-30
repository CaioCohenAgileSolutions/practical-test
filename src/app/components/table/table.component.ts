import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnChanges {
  @Input() data: T[] = [];
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() displayedColumns: string[] = []; // Array of column keys to display

  @Output() pageChange = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  dataSource = new MatTableDataSource<T>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      // Update data source whenever input data changes
      this.dataSource.data = this.data;
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }
}

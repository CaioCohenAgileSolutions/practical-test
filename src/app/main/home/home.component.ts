import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

interface TableData {
  nome: string;
  identidade: string;
  votou: boolean;
  mesa: string;
  idMesa: string;
  voteImage: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatFormField,
    MatOption,
    MatIcon,
    FormsModule,       // Add FormsModule here
    MatLabel,
    MatSelect,
  MatInputModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'identidade', 'votou', 'mesa', 'idMesa', 'voteImage'];
  dataSource = new MatTableDataSource<TableData>([]);
  totalItems = 0;
  itemsPerPage = 10;
  pageNumber = 1;

  sortBy: string = '';
  filterBy: string = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const apiUrl = `http://localhost:3300/api/ocr/recuperarEleitores?currentPage=${this.pageNumber}&itemsPerPage=${this.itemsPerPage}&sortBy=${this.sortBy}&filterBy=${this.filterBy}`;
    this.http.get<{ data: TableData[]; total: number }>(apiUrl).subscribe(response => {
      this.dataSource.data = response.data;
      this.totalItems = response.total;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadData();
  }

  onSearch(): void {
    this.pageNumber = 1; // Reset to first page on search
    this.loadData();
  }
}

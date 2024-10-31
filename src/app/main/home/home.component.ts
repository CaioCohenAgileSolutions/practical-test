import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableComponent } from '../../components/table/table.component';
import { MatButtonModule } from '@angular/material/button';


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
    MatButtonModule,
    MatSelect,
    TableComponent,
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
  cols: number = 3;


  sortBy: string = '';
  filterBy: string = '';
  data: TableData[] = [];

  constructor(private http: HttpClient) {
    this.adjustGridCols(window.innerWidth);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const apiUrl = `http://localhost:3300/api/ocr/recuperarEleitores?currentPage=${this.pageNumber}&itemsPerPage=${this.itemsPerPage}&sortBy=${this.sortBy}&filterBy=${this.filterBy}`;
    this.http.get<{ data: TableData[]; total: number }>(apiUrl).subscribe(response => {
      this.data = response.data;
      this.totalItems = response.total;
    });
  }

  onPageChange(event: { pageIndex: number, pageSize: number }): void {
    this.pageNumber = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadData();
  }

  onSearch(): void {
    this.pageNumber = 1; // Reset to first page on search
    this.loadData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustGridCols(event.target.innerWidth);
  }

  private adjustGridCols(width: number) {
    this.cols = width < 600 ? 1 : 3; // Use 1 column for mobile, 3 for larger screens
  }
}

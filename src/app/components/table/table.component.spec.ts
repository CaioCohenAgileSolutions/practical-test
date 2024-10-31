import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableData } from '../../models/TableData';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';


describe('TableComponent', () => {
  let component: TableComponent<TableData>;
  let fixture: ComponentFixture<TableComponent<TableData>>;

  const mockData: TableData[] = [
    {
      nome: 'John Doe',
      identidade: '123456',
      votou: true,
      mesa: 'A1',
      idMesa: '001',
      voteImage: 'https://via.placeholder.com/100',
    },
    {
      nome: 'Jane Smith',
      identidade: '654321',
      votou: false,
      mesa: 'B2',
      idMesa: '002',
      voteImage: 'https://via.placeholder.com/100',
    },
    {
      nome: 'Alice Brown',
      identidade: '789012',
      votou: true,
      mesa: 'A3',
      idMesa: '003',
      voteImage: 'https://via.placeholder.com/100',
    },
    {
      nome: 'Bob Johnson',
      identidade: '345678',
      votou: false,
      mesa: 'B4',
      idMesa: '004',
      voteImage: 'https://via.placeholder.com/100',
    },
    {
      nome: 'Charlie Williams',
      identidade: '901234',
      votou: true,
      mesa: 'A5',
      idMesa: '005',
      voteImage: 'https://via.placeholder.com/100',
    },
    {
      nome: 'Diana Evans',
      identidade: '567890',
      votou: false,
      mesa: 'B6',
      idMesa: '006',
      voteImage: 'https://via.placeholder.com/100',
    },
    {
      nome: 'Edward Turner',
      identidade: '012345',
      votou: true,
      mesa: 'A7',
      idMesa: '007',
      voteImage: 'https://via.placeholder.com/100',
    },
    {
      nome: 'Fiona Harris',
      identidade: '678901',
      votou: false,
      mesa: 'B8',
      idMesa: '008',
      voteImage: 'https://via.placeholder.com/100',
    },
    {
      nome: 'George Lewis',
      identidade: '234567',
      votou: true,
      mesa: 'A9',
      idMesa: '009',
      voteImage: 'https://via.placeholder.com/100',
    },
    {
      nome: 'Hannah Martin',
      identidade: '890123',
      votou: false,
      mesa: 'B10',
      idMesa: '010',
      voteImage: 'https://via.placeholder.com/100',
    }
  ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, MatTableModule, MatPaginatorModule, CommonModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent<TableData>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent<TableData>);
    component = fixture.componentInstance;

    // Set up input properties
    component.dataSource.data = mockData;
    component.displayedColumns = ['nome', 'identidade', 'votou', 'mesa', 'idMesa', 'voteImage'];
    component.totalItems = mockData.length;
    component.itemsPerPage = 5;
    // Trigger change detection after setting inputs
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of rows', async () => {
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    //console.log('DataSource data in test:', component.dataSource.data); // Log dataSource content

    const tableRows = fixture.debugElement.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(mockData.length + 1); // Expect 11 rows, counting with the headers
  });

  it('should render the correct data in each row', async () => {
    fixture.detectChanges();
    await fixture.whenStable(); // Wait for asynchronous operations to finish
    fixture.detectChanges(); // Apply changes again to make sure the view is updated

    const tableRows = fixture.debugElement.nativeElement.querySelectorAll('tr');
    //console.log("table rows:", tableRows);
    // Check if rows were rendered as expected
    expect(tableRows.length).toBe(mockData.length + 1); // the data and the header

    if (tableRows.length > 0) {
      expect(tableRows[0].innerText).toBe("Nome	Identidade	Votou	Mesa	Idmesa	Voteimage")
      expect(tableRows[1].innerText).toBe("John Doe	123456	true	A1	001	https://via.placeholder.com/100")
    }
  });


  it('should display paginator with correct length', () => {
    fixture.detectChanges(); // Ensure latest changes are applied
    const paginator = fixture.nativeElement.querySelector('mat-paginator');
    expect(paginator).toBeTruthy();
    expect(component.totalItems).toBe(mockData.length);
  });

  it('should emit pageChange event on paginator interaction', () => {
    spyOn(component.pageChange, 'emit');

    // Create a mock PageEvent
    const pageEvent: PageEvent = {
      pageIndex: 1,
      pageSize: component.itemsPerPage,
      length: component.totalItems,
    };

    // Call onPageChange directly with the mock PageEvent
    component.onPageChange(pageEvent);

    // Check if the event was emitted with the expected values
    expect(component.pageChange.emit).toHaveBeenCalledWith({ pageIndex: 1, pageSize: component.itemsPerPage });
  });
});

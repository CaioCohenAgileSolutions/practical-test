import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';

interface TableData {
  nome: string;
  identidade: string;
  votou: boolean;
  mesa: string;
  idMesa: string;
  voteImage: string;
}

// Sample data for demonstration
export const TableDataExample: TableData[] = [
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
  }
];

// Meta configuration
const meta: Meta<TableComponent<TableData>> = {
  title: 'Components/Table',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      imports: [MatTableModule, MatPaginatorModule, CommonModule],
    }),
  ],
  tags: ['autodocs'],
  args: {
    data: TableDataExample,
    totalItems: 2,
    itemsPerPage: 10,
    displayedColumns: ['nome', 'identidade', 'votou', 'mesa', 'idMesa', 'voteImage'],
  },
  argTypes: {
    itemsPerPage: { control: 'number' }, // Add control for itemsPerPage
    pageChange: { action: 'pageChange' }, // Capture pageChange events
  },
};

export default meta;
type Story = StoryObj<TableComponent<TableData>>;

// Default story with sample data
export const Default: Story = {};

// Story with a larger dataset to demonstrate pagination
export const Paginated: Story = {
  args: {
    data: Array.from({ length: 10 }, (_, i) => ({
      nome: `User ${i + 1}`,
      identidade: `ID ${i + 1}`,
      votou: i % 2 === 0,
      mesa: `Mesa ${i % 5}`,
      idMesa: `${i + 1}`,
      voteImage: 'https://via.placeholder.com/100',
    })),
    totalItems: 50,
    itemsPerPage: 10,
    displayedColumns: ['nome', 'identidade', 'votou', 'mesa', 'idMesa', 'voteImage']
  },
};

// Story with custom column configuration
export const CustomColumns: Story = {
  args: {
    displayedColumns: ['nome','identidade', 'votou', 'mesa'],
    data: TableDataExample,
  },
};

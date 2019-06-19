import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  rowData: any ;
  currentRows: any;
  pageSize: number = 20;
  pagesCount: number = 0;
  currentPage: number = 0;
  selectedRow: any = null;
  sort: any  = {
    field: '',
    order: '',
  };

  tableHeaders = [
    {
      headerName: "Athlete",
      field: "athlete",
    },
    {
      headerName: "Age",
      field: "age",
      width: "100",
    },
    {
      headerName: "Country",
      field: "country",
    },
    {
      headerName: "Year",
      field: "year",
      width: "120",
    },
    {
      headerName: "Date",
      field: "date",
    },
    {
      headerName: "Sport",
      field: "sport",
    },
    {
      headerName: "Gold",
      field: "gold",
      width: "100",
    },
    {
      headerName: "Silver",
      field: "silver",
      width: "100",
    },
    {
      headerName: "Bronze",
      field: "bronze",
      width: "100",
    },
    {
      headerName: "Total",
      field: "total",
      width: "100",
    }
  ];

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.get()
      .subscribe(
        data => this.rowData = data,
        error => console.log(error),
        () => {
          this.pagesCount = this.rowData.length / this.pageSize;
          this.generatePages(0);
        }
      );
  }

  generatePages(index) {
    if(this.rowData.length) {
      let startFrom = index * this.pageSize;
      let endTo = startFrom + this.pageSize;

      this.currentRows = [];

      this.rowData.filter((row, index) => {
        if (index >= startFrom && index < endTo) {
          this.currentRows.push(row);
        }
      });
    }
  }

  gotoPage(index) {
    this.generatePages(index);
    this.currentPage = index;
    console.log(this.currentRows)
  }

  sortRows(field) {
    if(field == this.sort.field) {
      /* Reset Sorting */
      if(this.sort.order === 'dsc') {
        this.getData();

        this.sort.field = '';
        this.sort.order = 'none';
      }
      /* Descending Sorting */
      else {
        this.rowData.sort((a, b) => {
          if (a[field] > b[field]) {
            return -1;
          }
          else {
            return 1;
          }
        });

        this.sort.order = 'dsc';
      }
    }
    /* Ascending Sorting */
    else {
      this.rowData.sort((a, b) => {
        if(a[field] < b[field]) {
          return -1;
        }
        else {
          return 1;
        }
      });

      this.sort.field = field;
      this.sort.order = 'asc';
    }
    //this.currentPage = 0;
    this.generatePages(this.currentPage);

  }

  changeRowNumber(event) {
    if (this.pageSize === event.target.value) {
      return false;
    }
    this.pageSize = +event.target.value;
    this.getData();
    this.gotoPage(0);
  }

  onRowSelected(row) {
    this.selectedRow = row;
  }

  closeDetails() {
    this.selectedRow = null;
  }
}

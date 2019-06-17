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
  pageList: any [] = [];
  currentPage: number = 0;
  selectedData: any = null;

  tableHeaders = [
    {
      headerName: "Athlete",
      field: "athlete",
    },
    {
      headerName: "Age",
      field: "age",
    },
    {
      headerName: "Country",
      field: "country",
    },
    {
      headerName: "Year",
      field: "year",
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
    },
    {
      headerName: "Silver",
      field: "silver",
    },
    {
      headerName: "Bronze",
      field: "bronze",
    },
    {
      headerName: "Total",
      field: "total",
    }
  ];

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.get(
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
    ).subscribe(
      data => this.rowData = data,
      error => console.log(error),
      () => {
        this.generatePages(0);
        this.generatePageNumbers();
      }
      );

    //console.log(this.rowData)
  }

  generatePages(index) {
    let startFrom = index * this.pageSize;
    let endTo = startFrom + this.pageSize;

    this.currentRows = [];

    this.rowData.filter((row, index) => {
      if(index >= startFrom && index < endTo) {
        this.currentRows.push(row);
      }
    })
    console.log(this.currentRows);
  }

  generatePageNumbers() {
    let pagesCount = this.rowData.length / this.pageSize;

    for(let i = 0; i < pagesCount; i++) {
      this.pageList.push({
        index: i,
        text: i+1
      })
    }

    console.log(this.pageList)
  }

  gotoPage(index) {
    this.generatePages(index);
    this.currentPage = index;
  }

  onRowSelected(data) {
    this.currentRows.map(row => {
      if(row.selected) {
        return row.selected = false;
      }
    })
    data.selected = true;
    this.selectedData = data;
  }

  closeDetails() {
    this.selectedData = null;
  }
}

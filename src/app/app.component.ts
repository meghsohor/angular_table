import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-data-table';
  selectedData: any = null;

  columnDefs = [
    {
      headerName: "Athlete",
      field: "athlete",
      sortable: true, 
      filter: true
    },
    {
      headerName: "Age",
      field: "age",
      sortable: true, 
      filter: true,
      width: 100
    },
    {
      headerName: "Country",
      field: "country",
      sortable: true, 
      filter: true
    },
    {
      headerName: "Year",
      field: "year",
      sortable: true, 
      filter: true,
      width: 100
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true, 
      filter: true
    },
    {
      headerName: "Sport",
      field: "sport",
      sortable: true, 
      filter: true
    },
    {
      headerName: "Gold",
      field: "gold",
      sortable: true
    },
    {
      headerName: "Silver",
      field: "silver",
      sortable: true
    },
    {
      headerName: "Bronze",
      field: "bronze",
      sortable: true
    },
    {
      headerName: "Total",
      field: "total",
      sortable: true
    }
  ];

  rowData: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.rowData = this.http.get(
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
    );
  }

  onRowSelected(event) {
    console.log(event.node.data);
    this.selectedData = event.node.data;
  }

  closeDetails() {
    this.selectedData = null;
  }
}

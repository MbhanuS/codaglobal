import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ThemePalette} from '@angular/material/core';
import { HttpService } from './http.service';
import { User } from './models/user.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CodaGlobal';
  selection = false
  disableSelect = new FormControl(false);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  USER_DATA: User[] = []
  dataSource = new MatTableDataSource<User>(this.USER_DATA);
  displayedColumns: string[] = ['select', 'Name', 'Profile Image', 'Bet', 'Price'];
  selectedPlayers: User[] = []
  searchUser: any
  indices: Number[] = []
  isSelected: boolean = false

  constructor(private $httpService: HttpService) {}

  ngOnInit() {
    this.userData()
  }

  userData() {
    this.$httpService.getData().subscribe(res => {
      this.USER_DATA = res
      this.dataSource = new MatTableDataSource<User>(this.USER_DATA);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      console.log(this.USER_DATA)
    })
  }

  onSelection(index: number) {
    if(this.selectedPlayers.length <= 8) {
      this.isSelected = true
      this.dataSource.data.map((data, i) => {
        if(this.selectedPlayers.length == 0) {
          if(i == index) {
            this.selectedPlayers.push(data)
          }
        } else {
          if(i == index) {
            let flag = 0
            this.selectedPlayers.map((player, removedIndex) => {
              if(player == data) {
                flag = 1
                this.selectedPlayers.splice(removedIndex,1)
              }
            })
            if(flag == 0) {
              this.selectedPlayers.push(data)
            }
          }
        }
      })
      console.log(this.selectedPlayers)
    } else {
      alert('can not select more than 9 players')
    }
  }

  reseting() {
    this.searchUser = undefined;
  }

 }

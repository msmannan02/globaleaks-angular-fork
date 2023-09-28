import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';

@Component({
  selector: 'src-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;
  tabs: any[];
  nodeData: any
  active: string

  constructor(public node: NodeResolver) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.active = "Users"

    this.nodeData = this.node
    this.tabs = [
      {
        title: 'Users',
        component: this.tab1
      },
      {
        title: 'Options',
        component: this.tab2
      },
    ];

  }
}
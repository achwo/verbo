import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.scss']
})
export class VerbListComponent implements OnInit {
  @Input() title: string;
  @Input() verbs: Word[];

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-po-item',
  templateUrl: './po-item.component.html',
  styleUrls: ['./po-item.component.css']
})
export class PoItemComponent implements OnInit {

  @Input('group')
  addPOItem: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}

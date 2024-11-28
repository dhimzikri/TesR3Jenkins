import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConstantNew } from '../constant/URLConstantNew';

@Component({
  selector: 'app-things-to-do',
  templateUrl: './things-to-do.component.html',
  styleUrls: ['./things-to-do.component.scss']
})
export class ThingsToDoComponent implements OnInit {
  @Input() module : string;
  ListThingsToDo : any;
  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    var url = this.UrlConstantNew.GetThingsToDoByRole;
    var obj = {
      ModuleCode : this.module
    };
    this.http.post(url, obj).subscribe((response) => 
    {
      this.ListThingsToDo = response["ListThingsToDo"];
    });
  }

  click(url : string)
  {
    window.open(url);
  }
}

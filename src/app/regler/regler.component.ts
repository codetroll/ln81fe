import { Version } from './../models/version';
import { RuleService } from './../services/rule.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regler',
  templateUrl: './regler.component.html',
  styleUrls: ['./regler.component.css'],
})
export class ReglerComponent implements OnInit {
    version: Version;
    constructor(private ruleService: RuleService) {}

    ngOnInit(): void {
        this.ruleService.hentRegler().subscribe((data: Version) => {
            this.version = data;
            console.log(this.version);
        });
    }
}

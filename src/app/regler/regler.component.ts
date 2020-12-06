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
        console.log('ReglerComponent.ngOnInit()');
        this.ruleService.hentRegler().subscribe((data: Version) => {
            console.log('Hent regler');
            this.version = data;
            console.log('version', this.version);
        });
    }
}

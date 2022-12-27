import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.css']
})
export class RenameComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<RenameComponent>) {}

  folderName: string;

  ngOnInit() {}
}

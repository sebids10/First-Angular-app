import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'donut-single',
  template: `
    <div>
      <donut-form
        [donut]="donut"
        [isEdit]="isEdit"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></donut-form>
    </div>
  `,
  styles: [``],
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private donutService: DonutService) {}

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');

    this.donutService
    .readOne(id)
    .subscribe((donut: Donut) => this.donut= donut);

    this.isEdit=this.route.snapshot.data["isEdit"];
  }
  onCreate(donut: Donut) {
    this.donutService
      .create(donut)
      .subscribe(() => console.log('Created Successfully'));
  }
  onUpdate(donut: Donut) {

    this.donutService
      .update(donut)
      .subscribe({
        next:() => console.log('Updated succesfully!'),
        error: (err)=> console.log('onUpdate error: ', err)});
  }
  onDelete(donut: Donut)
  {
    this.donutService
      .delete(donut)
      .subscribe(() => console.log('Delete succesfully!'));
  }
}

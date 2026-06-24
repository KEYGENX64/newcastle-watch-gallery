import { NgModule } from "@angular/core";
import { NumberGroupingPipe } from "./number-grouping.pipe";
import { JalaliPipe } from "./jalali.pipe";

const declarations = [NumberGroupingPipe, JalaliPipe];


@NgModule({
    declarations: declarations,
    exports: declarations,
})
export class PipeLineModule {

}
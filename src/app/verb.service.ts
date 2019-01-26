import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  shareReplay,
  concatMap,
  filter,
  map,
  distinct,
  toArray,
  tap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerbService {
  constructor() {}

  public verbs$: Observable<Word[]> = from(
    fetch('assets/verb_objs.json').then(r => r.json()),
  ).pipe(shareReplay() );

  private irregularVerb$: Observable<Word> = this.verbs$.pipe(
    concatMap(v => from(v)),
    filter((w: Word) => this.containsIrregularity(w.indicativo.presente))
  );

  public irregularVerbs$: Observable<Word[]> = this.irregularVerb$.pipe(
    toArray()
  );

  public regularVerbs$ = this.verbs$.pipe(
    concatMap(v => from(v)),
    filter((w: Word) => !this.containsIrregularity(w.indicativo.presente)),
    toArray()
  );

  public irregularityTypes$ = this.irregularVerb$.pipe(
    map((w: Word) => w.indicativo.presente),
    map(fs => fs.filter(f => f.irregularity !== undefined)),
    map((ws: Form[]) => this.getIrregularities(ws)),
    distinct(i => JSON.stringify(i)),
    toArray()
  );

  containsIrregularity(forms: Form[]): boolean {
    const irr = forms.find(f => f.irregularity !== undefined);
    return irr !== undefined;
  }

  getIrregularities(forms: Form[]): IrregularityForm {
    const formArray = forms.map((f: Form) => {
      const irregularityForm: IrregularityForm = {};
      irregularityForm[f.person] = f.irregularity;
      return irregularityForm;
    });

    return this.mergeIrregularParts(formArray);
  }

  mergeIrregularParts(forms: IrregularityForm[]): IrregularityForm {
    let result: IrregularityForm = {};
    forms.forEach(i => {
      result = { ...result, ...i };
    });
    return result;
  }
}

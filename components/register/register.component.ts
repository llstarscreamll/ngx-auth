import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './../../../reducers';
import * as authActions from './../../actions/auth.actions';

import { AuthAbstractComponent } from './../auth-abstract.component';

/**
 * RegisterComponent Class.
 *
 * @author Johan Alvarez <llstascreamll@hotmail.com>
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  #subdomain {
    display:inline-block;
    width:50%;
    text-align: right;
  }

  #subdomain-label {
    width:48%;
  }

  fieldset { margin-top: 25px; }
  legend { color: #909090; }
`]
})
export class RegisterComponent extends AuthAbstractComponent implements OnInit, OnDestroy {

  /**
   * Account form.
   */
  public form: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
    protected store: Store<fromRoot.State>,
  ) { super(); }

  public ngOnInit() {
    this.triggerStoreSelects();
    this.buildForm();
  }

  /**
   * Build the register form.
   */
  private buildForm() {
    this.form = this.formBuilder.group({
      company_name: ['', [Validators.required, Validators.minLength(2)]],
      subdomain: [''], // the subdomain is automaticaly filled
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
      agree_terms: [false, [Validators.requiredTrue]],
    });
  }

  /**
   * Submit the form.
   */
  public submitForm() {
    this.store.dispatch(new authActions.CreateAccountAction(this.form.value));
  }

  public get subdomainFieldValue(): string {
    let value: string;

    value = this.form.get('company_name').value;
    value = this.parseTextToSubdomain(value);

    return value;
  }

  private parseTextToSubdomain(value: string): string {
    // clean dots
    let parsed = value.replace(/\./g, '');
    parsed = this.removeAccents(parsed);

    parsed = parsed.replace(/\W+/g, '-');

    return parsed.toLowerCase();
  }

  private removeAccents(str: string): string {
    const removalMap = {
      'A': /[AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄ]/g,
      'AA': /[Ꜳ]/g,
      'AE': /[ÆǼǢ]/g,
      'AO': /[Ꜵ]/g,
      'AU': /[Ꜷ]/g,
      'AV': /[ꜸꜺ]/g,
      'AY': /[Ꜽ]/g,
      'B': /[BⒷＢḂḄḆɃƂƁ]/g,
      'C': /[CⒸＣĆĈĊČÇḈƇȻꜾ]/g,
      'D': /[DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ]/g,
      'DZ': /[ǱǄ]/g,
      'Dz': /[ǲǅ]/g,
      'E': /[EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ]/g,
      'F': /[FⒻＦḞƑꝻ]/g,
      'G': /[GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ]/g,
      'H': /[HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ]/g,
      'I': /[IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ]/g,
      'J': /[JⒿＪĴɈ]/g,
      'K': /[KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ]/g,
      'L': /[LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ]/g,
      'LJ': /[Ǉ]/g,
      'Lj': /[ǈ]/g,
      'M': /[MⓂＭḾṀṂⱮƜ]/g,
      'N': /[NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ]/g,
      'NJ': /[Ǌ]/g,
      'Nj': /[ǋ]/g,
      'O': /[OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ]/g,
      'OI': /[Ƣ]/g,
      'OO': /[Ꝏ]/g,
      'OU': /[Ȣ]/g,
      'P': /[PⓅＰṔṖƤⱣꝐꝒꝔ]/g,
      'Q': /[QⓆＱꝖꝘɊ]/g,
      'R': /[RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ]/g,
      'S': /[SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ]/g,
      'T': /[TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ]/g,
      'TZ': /[Ꜩ]/g,
      'U': /[UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ]/g,
      'V': /[VⓋＶṼṾƲꝞɅ]/g,
      'VY': /[Ꝡ]/g,
      'W': /[WⓌＷẀẂŴẆẄẈⱲ]/g,
      'X': /[XⓍＸẊẌ]/g,
      'Y': /[YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ]/g,
      'Z': /[ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ]/g,
      'a': /[aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ]/g,
      'aa': /[ꜳ]/g,
      'ae': /[æǽǣ]/g,
      'ao': /[ꜵ]/g,
      'au': /[ꜷ]/g,
      'av': /[ꜹꜻ]/g,
      'ay': /[ꜽ]/g,
      'b': /[bⓑｂḃḅḇƀƃɓ]/g,
      'c': /[cⓒｃćĉċčçḉƈȼꜿↄ]/g,
      'd': /[dⓓｄḋďḍḑḓḏđƌɖɗꝺ]/g,
      'dz': /[ǳǆ]/g,
      'e': /[eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ]/g,
      'f': /[fⓕｆḟƒꝼ]/g,
      'g': /[gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ]/g,
      'h': /[hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ]/g,
      'hv': /[ƕ]/g,
      'i': /[iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı]/g,
      'j': /[jⓙｊĵǰɉ]/g,
      'k': /[kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ]/g,
      'l': /[lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ]/g,
      'lj': /[ǉ]/g,
      'm': /[mⓜｍḿṁṃɱɯ]/g,
      'n': /[nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ]/g,
      'nj': /[ǌ]/g,
      'o': /[oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ]/g,
      'oi': /[ƣ]/g,
      'ou': /[ȣ]/g,
      'oo': /[ꝏ]/g,
      'p': /[pⓟｐṕṗƥᵽꝑꝓꝕ]/g,
      'q': /[qⓠｑɋꝗꝙ]/g,
      'r': /[rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ]/g,
      's': /[sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ]/g,
      't': /[tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ]/g,
      'tz': /[ꜩ]/g,
      'u': /[uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ]/g,
      'v': /[vⓥｖṽṿʋꝟʌ]/g,
      'vy': /[ꝡ]/g,
      'w': /[wⓦｗẁẃŵẇẅẘẉⱳ]/g,
      'x': /[xⓧｘẋẍ]/g,
      'y': /[yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ]/g,
      'z': /[zⓩｚźẑżžẓẕƶȥɀⱬꝣ]/g,
    };

    Object.keys(removalMap).forEach(latin => {
      const nonLatin = removalMap[latin];
      str = str.replace(nonLatin, latin);
    });

    return str;
  }

}

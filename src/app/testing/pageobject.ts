import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

export class PageObject
{
  protected fixture: ComponentFixture<any>;

  constructor(fixture: ComponentFixture<any>) {
    this.fixture = fixture;
    this.fixture.autoDetectChanges(true);
  }

  get debugElement() {
    return this.fixture.debugElement;
  }

  get component() {
    return this.fixture.componentInstance;
  }

  public element(el: string): any {
    const element = this.debugElement.query(de => de.references[el]);

    if(!element) {
      throw new Error("Unable to find element '" + el + "'");
    }

    return element;
  }

  public service(service: string): any {
    return this.debugElement.injector.get(service);
  }

  public nativeElement(el: string): any {
    return this.element(el).nativeElement;
  }

  public updateInputValue(el: string, value: string, blur: boolean = true) {
    let input: HTMLInputElement = this.nativeElement(el);

    input.value = value;
    input.dispatchEvent(new Event('input'));

    // If blur is set to true we'll trigger the blur event after updating
    // the value
    if(blur) {
      input.dispatchEvent(new Event('blur'));
    }

    return this.fixture.whenStable();
  }

  public click(el: string) {
    this.nativeElement(el).click();
    return this.fixture.whenStable();
  }

}

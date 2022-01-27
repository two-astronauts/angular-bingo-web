import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BingoService } from './services/bingo/bingo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('scrollNumbers', {read: ElementRef}) scrollNumbers: ElementRef<HTMLElement>;
  @ViewChild('scrollMessages', {read: ElementRef}) scrollMessages: ElementRef<HTMLElement>;

  public title = 'angular-bingo-web';
  public messages: any;
  public table: any;
  public form: FormGroup;
  public username: String;
  public names: any;
  public numbers: any;

  constructor(private bingoService: BingoService) {
    this.messages = [];
    this.table = {};
    this.form = new FormGroup({
      name: new FormControl('')
    });
    this.username = '';
    this.names = [];
    this.numbers = [];
    this.scrollNumbers = {} as ElementRef;
    this.scrollMessages = {} as ElementRef;
  }

  ngOnInit() {
    this.bingoService.getNewMessage().subscribe((message: string) => {
      this.messages.push(message);
      this.scrollMessagesBottom();
    });

    this.bingoService.getTable().subscribe((message: string) => {
      this.createTable(message);
    });

    this.bingoService.getNames().subscribe((message: string) => {
      this.names = message;
    });

    this.bingoService.getNumbers().subscribe((message: string) => {
      this.numbers.push(message);
      if (Object.keys(this.table).length > 0) {
        this.findNumber(message);
      }
      this.scrollNumbersBottom();
    });
  }

  public setName(): void {
    this.username = this.form.get('name')?.value;
    this.bingoService.sendName(this.username);
  }

  public scrollNumbersBottom(): void {
    setTimeout(() => {
      if (!this.scrollNumbers) {
        return;
      }
      const {nativeElement} = this.scrollNumbers;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }, 100);
  }

  public scrollMessagesBottom(): void {
    setTimeout(() => {
      if (!this.scrollMessages) {
        return;
      }
      const {nativeElement} = this.scrollMessages;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }, 100);
  }

  public createTable(message: any): void {
    for (const word in message) {
      this.table[word] = [];
      for (const number of message[word]) {
        this.table[word].push({ number, painted: false });
      }
    }
  }

  public findNumber(message: any): void {
    const value = message.split(' ');
    const word = value[0].toLowerCase();
    let position = null;
    for (const [index, number] of this.table[word].entries()) {
      if (number.number == value[1]) {
        number.painted = true;
        position = index;
      }
    }
    this.validate(word, position);
  }

  public validate(word: any, index: any): void {
    const loose = this.table[word].some((number: any) => number.painted === false)
    if (loose) {
      if (index &&
          this.table.b[index].painted &&
          this.table.i[index].painted &&
          this.table.n[index].painted &&
          this.table.g[index].painted &&
          this.table.o[index].painted) {
          this.bingoService.sendWin('I win');
      }
    } else {
      this.bingoService.sendWin('I win');
    }
  }

}

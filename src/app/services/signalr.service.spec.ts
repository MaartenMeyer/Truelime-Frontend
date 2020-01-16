import { TestBed } from '@angular/core/testing';

import { SignalRService } from './signalr.service';
import { expressionType } from '@angular/compiler/src/output/output_ast';

describe('SignalrService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SignalRService]
  }));

  it('should be created', () => {
    const service: SignalRService = TestBed.get(SignalRService);
    expect(service).toBeTruthy();
  });
});

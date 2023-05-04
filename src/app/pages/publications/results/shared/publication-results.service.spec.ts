import { TestBed, async, inject } from '@angular/core/testing';
import { PublicationResultsService } from './publication-results.service';

describe('Service: PublicationResults', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicationResultsService]
    });
  });

  it('should ...', inject([PublicationResultsService], (service: PublicationResultsService) => {
    expect(service).toBeTruthy();
  }));
});

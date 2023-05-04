import { TestBed, async, inject } from '@angular/core/testing';
import { ConfigCategoriesService } from './config-categories.service';

describe('Service: ConfigCategories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigCategoriesService]
    });
  });

  it('should ...', inject([ConfigCategoriesService], (service: ConfigCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});

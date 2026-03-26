import { TestBed } from '@angular/core/testing';
import { describe, it, expect } from 'vitest';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorHandleService } from '../error-handle.service';
import { firstValueFrom } from 'rxjs';

describe('ErrorHandleService', () => {
  let service: ErrorHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandleService],
    });

    service = TestBed.inject(ErrorHandleService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should handle client-side error', async () => {
    const errorEvent = new ErrorEvent('Network error', {
      message: 'Client failure',
    });

    const httpError = new HttpErrorResponse({
      error: errorEvent,
      status: 0,
    });

    try {
      await firstValueFrom(service.handleError(httpError));
      expect.fail('Expected an error, not success');
    } catch (err: any) {
      expect(err.status).toBe(0);
      expect(err.message).toBe(`Error: ${errorEvent.message}`);
      expect(err.error).toBe(errorEvent);
    }
  });

  it('should handle server-side error', async () => {
    const httpError = new HttpErrorResponse({
      error: { detail: 'Server exploded' },
      status: 500,
      statusText: 'Internal Server Error',
    });

    try {
      await firstValueFrom(service.handleError(httpError));
      expect.fail('Expected an error, not success');
    } catch (err: any) {
      expect(err.status).toBe(500);
      expect(err.message).toBe(`Error code: 500, message: ${httpError.message}`);
      expect(err.error).toEqual({ detail: 'Server exploded' });
    }
  });

  it('should handle null error body', async () => {
    const httpError = new HttpErrorResponse({
      error: null,
      status: 400,
    });

    try {
      await firstValueFrom(service.handleError(httpError));
      expect.fail('Expected an error, not success');
    } catch (err: any) {
      expect(err.status).toBe(400);
      expect(err.message).toBe(`Error code: 400, message: ${httpError.message}`);
      expect(err.error).toBeNull();
    }
  });
});

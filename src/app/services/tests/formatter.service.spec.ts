import { describe, it, expect, beforeEach } from 'vitest';
import { FormatterService } from '../formatter.service';
import { TestBed } from '@angular/core/testing';

describe('FormatterService', () => {
  let service: FormatterService;

  beforeEach(() => {
    service = TestBed.inject(FormatterService);
  });

  describe('firstCharToUpperCase', () => {
    it('should capitalize first character of a word', () => {
      const result = service.firstCharToUpperCase('hello');
      expect(result).toBe('Hello');
    });

    it('should return empty string if input is undefined', () => {
      const result = service.firstCharToUpperCase(undefined);
      expect(result).toBe('');
    });

    it('should return empty string if input is empty', () => {
      const result = service.firstCharToUpperCase('');
      expect(result).toBe('');
    });

    it('should not modify rest of the string', () => {
      const result = service.firstCharToUpperCase('hELLO');
      expect(result).toBe('HELLO');
    });

    it('should handle single character', () => {
      const result = service.firstCharToUpperCase('a');
      expect(result).toBe('A');
    });
  });

  describe('firstCharPerWordToUpperCase', () => {
    it('should capitalize each word', () => {
      const result = service.firstCharPerWordToUpperCase('hello world');
      expect(result).toBe('Hello World');
    });

    it('should lowercase rest of each word', () => {
      const result = service.firstCharPerWordToUpperCase('hELLo WoRLD');
      expect(result).toBe('Hello World');
    });

    it('should handle multiple spaces', () => {
      const result = service.firstCharPerWordToUpperCase('hello   world');
      expect(result).toBe('Hello World');
    });

    it('should return empty string if input is undefined', () => {
      const result = service.firstCharPerWordToUpperCase(undefined);
      expect(result).toBe('');
    });

    it('should return empty string if input is empty', () => {
      const result = service.firstCharPerWordToUpperCase('');
      expect(result).toBe('');
    });

    it('should handle single word', () => {
      const result = service.firstCharPerWordToUpperCase('angular');
      expect(result).toBe('Angular');
    });

    it('should trim out empty words caused by spaces', () => {
      const result = service.firstCharPerWordToUpperCase('  hello   world  ');
      expect(result).toBe('Hello World');
    });
  });
});

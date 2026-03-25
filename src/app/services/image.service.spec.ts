import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    service = new ImageService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should convert file to base64 successfully', async () => {
    const mockResult = 'data:image/png;base64,ABC123';

    const readAsDataURLMock = vi.fn();

    vi.spyOn(global, 'FileReader').mockImplementation(() => {
      return {
        readAsDataURL: readAsDataURLMock,
        result: mockResult,
        onload: null,
        onerror: null,
      } as unknown as FileReader;
    });

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    const promise = service.convertFileToBase64(file);

    const readerInstance = (FileReader as unknown as any).mock.results[0].value;
    readerInstance.onload();

    const result = await promise;

    expect(readAsDataURLMock).toHaveBeenCalledWith(file);
    expect(result).toBe(mockResult);
  });

  it('should reject when FileReader fails', async () => {
    const mockError = new Error('Read error');

    vi.spyOn(global, 'FileReader').mockImplementation(() => {
      return {
        readAsDataURL: vi.fn(),
        result: null,
        onload: null,
        onerror: null,
      } as unknown as FileReader;
    });

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    const promise = service.convertFileToBase64(file);

    const readerInstance = (FileReader as unknown as any).mock.results[0].value;
    readerInstance.onerror(mockError);

    await expect(promise).rejects.toBe(mockError);
  });
});

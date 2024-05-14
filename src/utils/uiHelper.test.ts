import { expect, describe, it } from 'vitest';

import { canWatchMovieToday } from './uiHelper';

describe('canWatchMovieToday', () => {
  it('should return true when the given day is Sunday', () => {
    const result = canWatchMovieToday('Sunday');
    expect(result).toEqual(true);
  });

  it('should return true when the given day is Monday and score is greater than 70', () => {
    const result = canWatchMovieToday('Monday', 71);
    expect(result).toEqual(true);
  });

  it('should return false when the given day is Monday and score is 70', () => {
    const result = canWatchMovieToday('Monday', 70);
    expect(result).toEqual(false);
  });
});

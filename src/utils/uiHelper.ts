export const canWatchMovieToday = (
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday',
  score?: number,
) => {
  // if day is sunday return true,
  // if day is Monday and score is greater than 70 return true
  // else return false
  if (day === 'Sunday') {
    return true;
  }
  if (day === 'Monday' && score! > 70) {
    return true;
  }
  return false;
};

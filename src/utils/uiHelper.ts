export const canWatchMovieToday = (
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Friday',
  score?: number,
) => {
  // if day is sunday return true,
  // if day is Monday and score is greater than 70 return true
  // else return false
  return !!(
    day === 'Sunday' ||
    (day === 'Monday' && score! > 70) ||
    (day === 'Friday' && score! >= 90)
  );
};

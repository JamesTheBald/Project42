const convertISODate = (ISODate) => {
  /*
   * @param {string} called ISODate
   * This function converts ISODate received from Mongo and returns a formatted/readable date
  */

  const date = new Date(ISODate);
  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
  "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

  // const dayOrdinal = (dayNumber) => {
  //   if (dayNumber > 3 && dayNumber < 21) return 'th';
  //   switch (dayNumber % 10) {
  //     case 1:  return "st";
  //     case 2:  return "nd";
  //     case 3:  return "rd";
  //     default: return "th";
  //   }
  // };

  if (ISODate) {
    const formattedDate = 
    date.getDate()
    + " "
    + monthNames[date.getMonth()] // getMonth() returns INDEX of month, not value
    + " "
    + date.getFullYear();

  return (formattedDate);
  } else {
    return ('unknown');
  }
};

export default convertISODate;
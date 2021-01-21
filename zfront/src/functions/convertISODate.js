const convertISODate = (ISODate) => {
  /*
   * @param {string} called ISODate
   * This function converts ISODate received from Mongo and returns formatted date
  */

  const date = new Date(ISODate);
  // TODO LATER: CHECK IF VALID DATE, RETURN N/A IF INVALID
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  
  const dayOrdinal = (dayNumber) => {
    if (dayNumber > 3 && dayNumber < 21) return 'th';
    switch (dayNumber % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };

  const formattedDate = 
    monthNames[date.getMonth()] // getMonth() returns INDEX of month, not value
    + ' '
    + date.getDate()
    + dayOrdinal(date.getDate())
    + ", "
    + date.getFullYear();

  return (formattedDate);
};

export default convertISODate;
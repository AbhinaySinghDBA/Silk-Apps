function getCurrentMonthAndYear() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const twelveMonthsAgo = new Date(currentDate);
    twelveMonthsAgo.setMonth(currentMonth - 12);

    const twelveMonthsAgoMonth = twelveMonthsAgo.getMonth() + 1;
    const twelveMonthsAgoYear = twelveMonthsAgo.getFullYear();

    const currentFormatted = `${currentMonth}-${currentYear}`;
    const twelveMonthsAgoFormatted = `${twelveMonthsAgoMonth}-${twelveMonthsAgoYear}`;

    return {
        from: twelveMonthsAgoFormatted,
        to: currentFormatted,
    };
}

function getCurrentQuarterAndYear() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const previousYear = currentYear - 1;

    const currentQuarter = Math.ceil(currentMonth / 3);

    return {
        from: currentQuarter + '-' + previousYear,
        to: currentQuarter + '-' + currentYear,
    };
}


export { getCurrentMonthAndYear, getCurrentQuarterAndYear }
 const getdayDate = (date) => {
        const parsedDate = new Date(date);
        return parsedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
        });
    }

export default getdayDate;
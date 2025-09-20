const getFormatedDate = (date) => {

        const day = new Date(date).toLocaleDateString('en-GB', { weekday: 'long' });
        const formattedDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        const result = `${day}, ${formattedDate}`;
        return result
    }
export default getFormatedDate;
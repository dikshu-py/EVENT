const getTodayDate = () => {

        
        const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        const result = `${formattedDate}`;
        return result
    }
export default getTodayDate;
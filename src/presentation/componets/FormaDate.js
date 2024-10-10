

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', options).format(date);
};

const formatDate1 = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    const timeDiff = today - date;
    const daysDiff = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));

    if (date > today) {
        return `Hace ${daysDiff} días`;
    }

    if (daysDiff === 0) {
        return 'Hoy';
    } else if (daysDiff === 1) {
        return 'Ayer';
    } else if (daysDiff < 7) {
        return `Hace ${daysDiff} días`;
    }
};


export { formatDate, formatDate1 };

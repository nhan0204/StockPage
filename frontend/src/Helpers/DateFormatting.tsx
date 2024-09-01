export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (typeof date === 'undefined') 
        return;

    return date.toLocaleDateString(undefined, { year:'numeric', month: 'short', day: 'numeric' });
}
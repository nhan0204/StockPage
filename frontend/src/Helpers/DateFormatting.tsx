export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (typeof date === 'undefined') 
        return;

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
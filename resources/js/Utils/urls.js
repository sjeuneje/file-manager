export const getParentId = () => {
    const queryString = window.location.search;

    if (
        !queryString.substring(1).includes('parent_id') ||
        queryString.substring(1)?.split('=').length > 2
    )
        return null;

    return window.location.search.substring(1)?.split('=')?.pop();
}

export const getSiteUrl = () => {
    return window.location.protocol + '//' + window.location.hostname;
}

export default { getParentId, getSiteUrl };

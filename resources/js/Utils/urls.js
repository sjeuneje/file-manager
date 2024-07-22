export default function getParentId() {
    const queryString = window.location.search;

    if (
        !queryString.substring(1).includes('parent_id') ||
        window.location.search.substring(1)?.split('=').length > 2
    )
        return null;

    return window.location.search.substring(1)?.split('=')?.pop();
}

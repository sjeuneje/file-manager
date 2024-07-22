export default function getParentId() {
    return window.location.search.substring(1)?.split('=')?.pop();
}

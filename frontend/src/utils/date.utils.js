export function sortByDate(d1, d2) {
    if (d1.isBefore(d2)) {
        return -1;
    }
    if (d1.isAfter(d2)) {
        return 1;
    }
    return 0;
}

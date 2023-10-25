export function calculateDistance(
    userLatitude: number,
    userLongitude: number,
    storeLatitude: number,
    storeLongitude: number,
): number {
    const storeLatitudeRad = storeLatitude * (Math.PI / 180);
    const storeLongitudeRad = storeLongitude * (Math.PI / 180);
    const userLatitudeRad = userLatitude * (Math.PI / 180);
    const userLongitudeRad = userLongitude * (Math.PI / 180);

    const dist =
        6371 * // Earth radius
        Math.acos(
            Math.cos(userLatitudeRad) *
                Math.cos(storeLatitudeRad) *
                Math.cos(userLongitudeRad - storeLongitudeRad) +
                Math.sin(userLatitudeRad) * Math.sin(storeLatitudeRad),
        );

    return dist;
}

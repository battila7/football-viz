var dataToColor = function dataToColor(w1, w2, w3) {
    const r = (w2 * (254 / 255) + w2 * (223 / 255) + w2 * (0 / 255));
    const g = (w1 * (0 / 255) + w1 * (86 / 255) + w1 * (59 / 255));
    const b = (w3 * (237 / 255) + w3 * (41 / 255) + w3 * (57 / 255));

    return [Math.min(r * 500, 255), Math.min(g * 255, 255), Math.min(b * 144, 255)]
        .map(x => Math.round(x));
};

var toColorString = function toColorString([r, g, b]) {
    return `rgb(${r}, ${g}, ${b})`;
};

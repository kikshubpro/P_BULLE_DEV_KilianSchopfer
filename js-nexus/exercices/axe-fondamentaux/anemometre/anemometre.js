// @ts-check

// TODO : déclarer la constante de conversion entre les km/h et les m/s

/**
 * Convertit une vitesse de km/h en m/s.
 * @param {number} speedKmh
 * @returns {number}
 */
export function kmhToMs(speedKmh) {
  return speedKmh / 3.6;
}

/**
 * Calcule l'écart entre une rafale et le vent moyen.
 * @param {number} gustKmh
 * @param {number} averageKmh
 * @returns {number}
 */
export function gustGap(gustKmh, averageKmh) {
  return gustKmh - averageKmh;
}

/**
 * Calcule la moyenne de trois mesures.
 * @param {number} speed1
 * @param {number} speed2
 * @param {number} speed3
 * @returns {number}
 */
export function averageOfThree(speed1, speed2, speed3) {
  return (speed1 + speed2 + speed3) / 3;
}

/**
 * Indique si le vent atteint au moins 75 km/h.
 * @param {number} speedKmh
 * @returns {boolean}
 */
export function isStormAlert(speedKmh) {
  return speedKmh >= 75;
}

/**
 * Construit le bulletin météo d'une station.
 * @param {string} station
 * @param {number} speedKmh
 * @returns {string}
 */
export function windReport(station, speedKmh) {
  return `${station} : vent de ${speedKmh} km/h (${speedKmh / 3.6} m/s).`;
}

// @ts-check

export const DESCENT_SPEED = -10;
export const MAX_WIND = 3;

/**
 * Calcule la vitesse verticale en tenant compte du vent.
 * @param {number} wind
 * @returns {number}
 */
export function verticalSpeed(wind) {
  return DESCENT_SPEED + wind;
}

/**
 * Calcule l'altitude suivante du drone.
 * @param {number} altitude
 * @param {number} wind
 * @returns {number}
 */
export function nextAltitude(altitude, wind) {
  let newAltitude = altitude + wind + DESCENT_SPEED;
  return newAltitude > 0 ? newAltitude : 0;
}

/**
 * Génère une valeur aléatoire de vent.
 * @returns {number}
 */
export function randomWind() {
  return Math.random() * 3;
}

/**
 * Simule un atterrissage et compte sa durée.
 * @param {number} startAltitude
 * @returns {number}
 */
export function landingDuration(startAltitude) {
  let time = 0;
  while (startAltitude > 0) {
    startAltitude = nextAltitude(startAltitude, randomWind());
    time++;
  }
  return time;
}

/**
 * Indique si le drone atterrit avant l'épuisement de sa batterie.
 */
/**
 *
 * @param {number} startAltitude
 * @param {number} battery
 * @returns {boolean}
 */
export function hasGracefullyLanded(startAltitude, battery) {
  return landingDuration(startAltitude) <= battery;
}

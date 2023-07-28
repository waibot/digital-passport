export function currentTs() {
  return Math.ceil(+new Date() / 1000);
}

export function currentTs1000() {
  return Math.ceil(+new Date());
}

/**
 * Sleeps a specified amount of time
 * @param ms time in milliseconds
 * @returns {Promise}
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

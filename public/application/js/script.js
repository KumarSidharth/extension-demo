/**
 * SCRIPT INJECTION
 */
console.log("HELLO WORLD !!!");



/**
 * VALIDATING LOADER
 */
(async () => {
  let url = window.location.href.split("/")[2];
  const response = await fetch(
    `https://${url}/ext/ajio_zissan_1/application/api`
  );

  const data = await response.json();

  console.log("data::", data);
})();



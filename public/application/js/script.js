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
    `https://${url}/ext/jio-workshop/storefront/api`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    }
  );

  const data = await response.json();

  console.log("data::", data);
})();



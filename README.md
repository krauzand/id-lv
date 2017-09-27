# id-lv
Latvijas personas koda kontrolcipara un datuma daļas pārbaudes Javascript valodā.
Latvian person identification code checksum and date validator in Javascript.

# Lietošanas piemēri / Examples of usage
Iekļaujam id-lv.js faila saturu savā projektā un gatavs lietošanai.
Include id-lv.js file in your project and you are ready to go.

```javascript
if (IdeLve.isValidIdentificationCode("111111-11111")) {
  console.log("jā, būs pareizs kods");
  console.log("ok, valid code");
}
if (IdeLve.isValidIdentificationCode("111111-11111")) {
  console.log("nē, nebūs pareizs kods");
  console.log("invalid code");
}
```

function faireQqc() {
  return new Promise((successCallback, failureCallback) => {
    console.log("C'est fait");
    // réussir une fois sur deux
    if (Math.random() > 0.5) {
      successCallback("Réussite");
    } else {
      failureCallback("Échec");
    }
  });
}

function successCallback(résultat) {
  console.log("L'opération a réussi avec le message : " + résultat);
}

function failureCallback(erreur) {
  console.error("L'opération a échoué avec le message : " + erreur);
}

console.log(faireQqc());

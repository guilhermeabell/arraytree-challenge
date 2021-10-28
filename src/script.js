 // https://bitsofco.de/async-vs-defer  atributo async e defer


// marcar todas as caixas de seleção e escutar
// quando
// executa a função percorrendo os elementos pais e adiciona o ícone de menos
// executa a função para percorrer os elementos filhos e adicionar o ícone de marca de seleção
// e reverter quando desmarcar a caixa


const checkboxElements = document.querySelectorAll("input[type='checkbox']");

function traversalParents(target, checkOrUncheck) {
  let targetLevel = parseInt(target.getAttribute("level"));
  let curElement = target.parentElement;
  console.log(target.parentElement)

  // selecione o elemento pai correto usando o atributo de nível
  for (let i = 0; i < targetLevel; i++) {
    curElement = curElement.parentElement;
  }
  // cur element !== null
  while (curElement) {
    curElement = curElement.previousElementSibling;
    if (curElement) {
      const previousSiblingInput = curElement.querySelector("input[type='checkbox']");
      const previousLevel = parseInt(previousSiblingInput.getAttribute("level"));

      if (targetLevel > previousLevel) {
        previousSiblingInput.indeterminate = checkOrUncheck;
        targetLevel = previousLevel;
      }
    }
  }
}
function traversalChilds(target, checkOrUncheck) {
  let targetLevel = parseInt(target.getAttribute("level"));
  let curElement = target.parentElement;

  
// selecione o elemento pai correto usando o atributo de nível
  for (let i = 0; i < targetLevel; i++) {
    curElement = curElement.parentElement;
  }

  while (curElement) {
    curElement = curElement.nextElementSibling;
    if (curElement) {
      const previousSiblingInput = curElement.querySelector("input[type='checkbox']");
      const previousLevel = parseInt(previousSiblingInput.getAttribute("level"));

      if (targetLevel < previousLevel || targetLevel === 0) {
        previousSiblingInput.checked = checkOrUncheck;
      } else {
        break;
      }
    }
  }
}

checkboxElements.forEach((element) => {
  element.addEventListener("click", ({ target }) => {
    if (target.checked) {
      traversalParents(target, true);
      traversalChilds(target, true);
      console.log(target.getAttribute("level"));
    } else {
      traversalParents(target, false);
      traversalChilds(target, false);
    }
  });



  element.addEventListener("mouseenter", ({ target }) => {
    let targetLevel = parseInt(target.getAttribute("level"));
    target.parentElement.style.backgroundColor  = "#B0C4DE";
    let curElement = target.parentElement;

    for (let i = 0; i < targetLevel; i++) {
      curElement = curElement.parentElement;
    }
    // cur element !== null
    while (curElement) {
      curElement = curElement.previousElementSibling;
      if (curElement) {
        const previousSiblingInput = curElement.querySelector("input[type='checkbox']");
        const previousLevel = parseInt(previousSiblingInput.getAttribute("level"));

        if (targetLevel > previousLevel) {
          previousSiblingInput.parentElement.style.backgroundColor = "";
          targetLevel = previousLevel;
        }
      }
    }
  });



  element.addEventListener("mouseleave", ({ target }) => {
    let targetLevel = parseInt(target.getAttribute("level"));
    target.parentElement.style.backgroundColor  = "#ffff";

    let curElement = target.parentElement;

    for (let i = 0; i < targetLevel; i++) {
      curElement = curElement.parentElement;
    }
    // cur element !== null
    while (curElement) {
      curElement = curElement.previousElementSibling;
      if (curElement) {
        const previousSiblingInput = curElement.querySelector("input[type='checkbox']");
        const previousLevel = parseInt(previousSiblingInput.getAttribute("level"));

        if (targetLevel > previousLevel) {
          previousSiblingInput.parentElement.style.backgroundColor = '#ffff';
          targetLevel = previousLevel;
        }
      }
    }
  });
});


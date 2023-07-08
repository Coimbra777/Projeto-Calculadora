// seleção dos elementos operação futura
const previusOperationText = document.querySelector("#previus-operation");
// seleção dos elementos operação usuário
const currentOperationTex = document.querySelector("#current-operation");
// seleção dos botões
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previusOperationText, currentOperationTex) {
    this.previusOperationText = previusOperationText;
    this.currentOperationText = currentOperationTex;
    // valor que o usuário esta digitando
    this.currentOperation = "";
  }

  // CHAMADA DOS MÉTODOS

  // adiciona digitos à tela
  addDigit(digit) {
    //condição para checar se a operação ja tem um ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    // condição para processar as operações
    this.processOperation();

    this.currentOperation = digit;
    this.updateScreen();
  }

  // CRIAÇÃO DAS AÇÕES / MÉTODOS
  processOperation(operation) {
    // console.log(operation);

    // verifique se o campo que o usuário digita está vazia
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // se for diferente muda a operação
      if (this.previusOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      // retorna a operção
      return;
    }
    // pegar os valores das operações e converter para valores numericos
    let operationValue;
    const previous = +this.previusOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    // switch para iteração com as operações e os botões
    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, previous, current);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, previous, current);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, previous, current);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, previous, current);
        break;
      case "DELL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearAllOperation();
        break;
      case "=":
        this.processEqualOperation();
        break;
      default:
        return;
    }
  }

  // alterar valor da tela de atualização
  updateScreen(
    operationValue = null,
    operation = null,
    previous = null,
    current = null
  ) {
    // console.log(operationValue, operation, current, previous);
    // console.log(digit);
    // coloca o valor da operaçõa atual dentro do texto da operação atual
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // condição para verificar se o valor é zero, se for apenas adicione o valor atual
      if (previous === 0) {
        operationValue = current;
      }

      // adicionar valor atual ao anterior
      this.previusOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
  // alterar operação matemática
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];
    // verificação para identificar a operação que o usuário ordenou
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previusOperationText.innerText =
      this.previusOperationText.innerText.slice(0, -1) + operation;
  }

  // método para o botão DELL
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  // método para botão CE
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }
  // método para botão C , que limpa as duas areas de texto
  processClearAllOperation() {
    this.currentOperationText.innerText = "";
    this.previusOperationText.innerText = "";
  }
  // método para botão de igualdade
  processEqualOperation() {
    const operation = previusOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
    // this.currentOperationText.innerText = "";
    // this.previusOperationText.innerText = "";
  }
}

// isntância da class
const calc = new Calculator(previusOperationText, currentOperationTex);

// iteração pelos botões
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // variável p/ capturar valor do botão ao click
    const value = e.target.innerText;
    // condição para saber se é numero ou tipo de operação que o usuário clicou
    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
      // console.log(value);
    } else {
      // console.log("op: " + value);
      calc.processOperation(value);
    }
  });
});

// sequência
// 1 - iterar pelos botões com foreach
// 2 - capturar os valores
// 3 - fazer operações básicas com condições

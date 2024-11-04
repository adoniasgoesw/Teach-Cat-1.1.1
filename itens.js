// Define os valores iniciais dos itens




document.querySelector("#portion h3").innerHTML = portion;
document.querySelector("#gold h3").innerHTML = gold;
document.querySelector("#intesive h3").innerHTML = intesive;
document.querySelector("#crystails h3").innerHTML = crystals;

/* -------- Open Quiz --------*/ 

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os botões com a classe open-quiz
    const quizButtons = document.querySelectorAll(".open-quiz");

    // Adiciona o evento de clique a cada botão
    quizButtons.forEach(button => {
        button.addEventListener("click", function () {
            window.location.href = "quiz.html"; // Redireciona para quiz.html
        });
    });
});



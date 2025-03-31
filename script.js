const quizData = [
    {
        question: "1. Что такое JavaScript?",
        answers: [
            "Язык стилей для описания внешнего вида веб-страниц",
            "Язык программирования для создания интерактивных элементов на веб-страницах",
            "Система управления базами данных",
            "Серверный язык программирования"
        ],
        type: "choice",
        correct: 1
    },
    {
        question: "2. Какой метод используется для вывода информации в консоли браузера?",
        answers: [
            "console.output()",
            "console.show()",
            "console.log()",
            "console.display()"
        ],
        type: "input",
        correctAnswer: "console.log()",

    },
    {
        question: "3. Что отображает следующий код: `console.log(typeof null)`?",
        answers: [
            "null",
            "undefined",
            "object",
            "string"
        ],
        type: "input",
        correctAnswer: "object"
    },
    {
        question: "4. Как объявить переменную в JavaScript? Назовите три способа.",
        answers: [
            "var, define, new",
            "let, const, make",
            "var, let, const",
            "define, create, let"
        ],
        type: "choice",
        correct: 2
    },
    {
        question: "5. Для чего используется оператор `===` в JavaScript?",
        answers: [
            "Для проверки на нестрогое равенство",
            "Для строгого равенства, проверяя только значение",
            "Для строгого равенства, проверяя и тип, и значение",
            "Для объявления переменной"
        ],
        type: "choice",
        correct: 2
    },

];



// Переменные для отслеживания состояния

// Инициализация переменной для отслеживания текущего вопроса
let currentQuestionIndex = 0;
// Инициализация переменной для подсчета правильных ответов
let score = 0;


// Получаем элементы из HTML для управления интерфейсом

// Основной контейнер для отображения вопросов и результатов
const container = document.querySelector('.container');
// Кнопка для запуска теста
const startButton = document.querySelector('.start-button');
// Контейнер для отображения результата после теста
const resultContainer = document.querySelector('.result');
// Кнопка для перезапуска теста
const resetButton = document.querySelector('.reset-button');


// Создаем и настраиваем элементы полоски прогресса
const progressBarContainer = document.createElement('div');
const progressBar = document.createElement('div');

progressBarContainer.classList.add('progress-bar-container');
progressBar.classList.add('progress-bar');

progressBarContainer.appendChild(progressBar);
container.insertBefore(progressBarContainer, resultContainer);

// Функция обновления прогресс-бара
function updateProgressBar() {
    const progress = ((currentQuestionIndex / quizData.length) * 100).toFixed(2);
    progressBar.style.width = `${progress}%`;
}

// Функция для начала теста
function startTest() {
    container.innerHTML = '';

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    const titleParts = ["ТЕСТ", "НА", "ЗНАНИЯ", "JavaScript"];
    titleParts.forEach(part => {
        const span = document.createElement('span');
        span.textContent = part;
        textContainer.appendChild(span);
    });

    container.appendChild(textContainer);
    container.appendChild(startButton);
    startButton.style.display = 'block';
}

// Запускаем тест при нажатии на кнопку "Начать тест"
startButton.addEventListener('click', () => {
    // скрываем кнопку начать тест
    startButton.style.display = 'none'
    // показываем контейнер с вопросами
    renderQuestion()
});

// Функция отображения текущего вопроса
function renderQuestion() {
    // Получаем текущий вопрос из массива
    const questionData = quizData[currentQuestionIndex];
    // Очищаем контейнер перед добавлением нового вопроса
    container.innerHTML = '';

    container.appendChild(progressBarContainer);
    updateProgressBar();
    
    // Создаем элемент <label>
    const questionLabel = document.createElement('label');
    // Устанавливаем текст вопроса в <label>
    questionLabel.textContent = questionData.question;
    // Добавляем <label> в container 
    container.appendChild(questionLabel);

    // проверяем тип вопроса
    if (questionData.type === 'choice') {
        // Создаем контейнер для ответов
        const answersContainer = document.createElement('div');
        // Присваиваем класс 'answers' для стилей
        answersContainer.classList.add('answers');


        // Теперь добавим кнопки с ответами в answersContainer
        questionData.answers.forEach((answer, index) => {
            // Создаем кнопку для каждого ответа
            const answerButton = document.createElement('button');
            // Устанавливаем текст ответа в кнопку
            answerButton.textContent = answer;
            // Присваиваем класс 'button' для стилей
            answerButton.classList.add('button');
            // заранее прописал обработчик для правильности ответа через будущую функцию checkAnswer
            answerButton.addEventListener('click', () => checkAnswer(index === questionData.correct, answerButton));
            // Добавляем кнопку в контейнер ответов
            answersContainer.appendChild(answerButton);
        });
        // Добавляем контейнер ответов в основной контейнер
        container.appendChild(answersContainer);

        // Добавление текстового поля для вопросов с input и кнопку принятия ответа
    } else if (questionData.type === 'input') {
        const answerInput = document.createElement('input');
        answerInput.type = 'text';
        answerInput.placeholder = 'Введите ответ...';
        // Добавляем класс 'button' для применения стилей 
        answerInput.classList.add('button');

        // Создаем кнопку для отправки ответа
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Ответить';
        submitButton.classList.add('button');
        submitButton.addEventListener('click', () => checkAnswer(
            answerInput.value.trim().toLowerCase() === questionData.correctAnswer.toLowerCase(), answerInput
        ));

        container.appendChild(answerInput);
        container.appendChild(submitButton);
    }
}

// Функция для отключения всех кнопок и инпутов
function disableInputs() {
    document.querySelectorAll('button').forEach(button => button.disabled = true);
    document.querySelectorAll('input').forEach(input => input.readOnly = true);
}

// Функция для включения всех кнопок и инпутов
function enableInputs() {
    document.querySelectorAll('button').forEach(button => button.disabled = false);
    document.querySelectorAll('input').forEach(input => input.readOnly = false);
}

// Функция для проверки ответа
function checkAnswer(isCorrect, element) {
    disableInputs() // Отключить элементы, чтобы пользователь не мог взаимодействовать

    // Удаляем стили правильного/неправильного ответа с каждой кнопки перед добавлением новых
    document.querySelectorAll('.button').forEach(button => button.classList.remove('correct', 'incorrect'));
    //Проверка правильности и подсветка ответа
    if (isCorrect) { // Если ответ правильный
        element.classList.add('correct'); // Подсвечиваем ответ зелёным
        score++; // Увеличиваем счетчик правильных ответов
    } else { // Если ответ неверный
        element.classList.add('incorrect'); // Подсвечиваем ответ красным
    }

    //Переход к следующему вопросу через задержку, сделал для того, чтобы пользователь успел увидеть правильно или не правильно ответил
    setTimeout(() => {
        enableInputs(); // Включить элементы после задержки
        
        // Переходим к следующему вопросу, увеличив индекс на 1
        currentQuestionIndex++; 
        // Проверяем, есть ли еще вопросы
        if (currentQuestionIndex < quizData.length) { 
            // Если вопросы остались, вызываем renderQuestion для отображения следующего
            renderQuestion();
            
        } else { // Если вопросов больше нет
            showResult(); // Показываем итоговый результат
        }
    }, 1000); // Переход через 2 секунды
}


// Функция отображения результата
function showResult() {
    container.innerHTML = ''; 
    container.appendChild(resultContainer); 
    container.appendChild(resetButton); 

    // Рассчитываем процент и округляем до двух знаков после запятой
    const percentage = ((score / quizData.length) * 100).toFixed(2);
    // Устанавливаем текст результата с процентом 
    resultContainer.textContent = `Ваш результат: ${score} из ${quizData.length} правильных ответов (${percentage}%)`; 

    // Делаем контейнер с результатом видимым и ресет кнопку
    resultContainer.style.display = 'block'; 
    resetButton.style.display = 'block'; 
}

// Функция для перезапуска теста
resetButton.addEventListener('click', () => {
    currentQuestionIndex = 0; // Сбрасываем индекс текущего вопроса на 0
    score = 0; // Сбрасываем счетчик правильных ответов
    resultContainer.style.display = 'none'; // Скрываем контейнер с результатом
    resetButton.style.display = 'none'; // Скрываем кнопку перезапуска
    startButton.style.display = 'block'; // Показываем кнопку "Начать тест" для повторного запуска
    startTest()
});
startTest()



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
    {
        question: "6. Что такое 'замыкание' (closure) в JavaScript?",
        answers: [
            "Объект, содержащий методы для работы с массивами",
            "Функция, которая всегда возвращает другую функцию",
            "Функция с доступом к переменным из родительской области видимости",
            "Способ обработки асинхронных запросов"
        ],
        type: "choice",
        correct: 2
    },
    {
        question: "7. Какой будет результат выполнения `0.1 + 0.2 === 0.3`?",
        answers: [
            "true",
            "false",
            "true,",
            "false,"
        ],
        type: "input",
        correctAnswer: "false"
    },
    {
        question: "8. Что такое промис (Promise) в JavaScript и для чего он используется?",
        answers: [
            "Метод сортировки массивов",
            "Объект, представляющий успешное завершение или ошибку асинхронной операции",
            "Способ управления видимостью переменных",
            "Синтаксический сахар для работы с коллбэками"
        ],
        type: "choice",
        correct: 1
    },
    {
        question: "9. Для чего используется метод `Array.prototype.map()`?",
        answers: [
            "Для изменения строк",
            "Для выполнения математических вычислений",
            "Для создания нового массива с результатами вызова функции на каждом элементе массива",
            "Для фильтрации массива по условию"
        ],
        type: "choice",
        correct: 2
    },
    {
        question: "10. Что возвращает функция `Array.prototype.filter()`?",
        answers: [
            "Новую строку с отфильтрованными элементами",
            "Булевое значение на основе условия",
            "Массив индексов соответствующих элементов",
            "Новый массив с элементами, прошедшими тестовое условие"
        ],
        type: "choice",
        correct: 3
    }
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
    }  else if (questionData.type === 'input') {
        // Создаем элемент <input>
        const answerInput = document.createElement('input');
        // Задаем тип input как текстовый (text) 
        answerInput.type = 'text'; 
        // Добавляем подсказку для пользователя
        answerInput.placeholder = 'Введите ответ...';
        // Добавляем класс 'button' для применения стилей 
        answerInput.classList.add('button'); 
    

}


}


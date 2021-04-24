## Лабораторная работа № 1

Сверстать сайт с отображением информации о погоде в соответствии с макетами. Отображение сайта должно гибко адаптироваться при изменении ширины – для примера даны макеты для desktop и mobile. Иконки погоды на макетах сделаны заглушками, замените их на свои. Цветовая схема, шрифты могут отличаться от макета, но общая сетка страницы должна быть соблюдена. В верстке должна соблюдаться семантика.

Разработка должна вестись итеративно и публиковаться на github. К моменту проверки и сдачи работы репозиторий должен быть публичным. Также должна быть настроена публикация работы на github pages.

____

### Макеты:

![Desktop](https://github.com/Erartria/web_6sem/blob/master/img/readme/desktop.jpg)

![Mobile](https://github.com/Erartria/web_6sem/blob/master/img/readme/mobile.jpg)

____

## Лабораторная работа № 2

Доработать лабораторную работу 1 для работы с внешним API, позволяющим получить данные о погоде в городе.

При первой загрузке страницы происходит запрос пользователя на получение данных о геолокации с использованием HTML5 Geolocation API. Если пользователь соглашается предоставить данные о геолокации – получаем из внешнего API данные о погоде (API можно выбрать самостоятельно). Если нет – запрашиваем информацию для города по умолчанию (город по умолчанию можно выбрать самостоятельно). Эти сведения отображаются в верхней части страницы – "Погода здесь". Иконка погоды должна соответствовать тем данным о погоде, что были получены из API.

У пользователя есть возможность добавления и удаления городов в избранное. Информация о погоде отображается для всех городов из избранного в соответствии с макетом и реализацией первой лабораторной работы (секция "Избранное"). Список избранных городов сохраняется в LocalStorage. Сами данные о погоде в LocalStorage сохранять не нужно – запрос актуальных сведений происходит при каждой загрузке страницы.

Пока происходит загрузка данных по конкретному городу/локации – показываем loader и/или сообщение об ожидании загрузки данных. Пример ниже, в вашей реализации может отличаться.

В случае возникновения ошибки при работе с API пользователь должен получить информацию о возникновении подобной ситуации. Адаптивность страницы должна сохраняться.

Реализация должна быть на нативном JavaScript, без использования сторонних библиотек.

Разработка должна вестись итеративно и публиковаться на github. К моменту проверки и сдачи работы репозиторий должен быть публичным. Также должна быть настроена публикация работы на github pages.

API выбираете самостоятельно. Ниже несколько примеров подборок:

https://rapidapi.com/blog/access-global-weather-data-with-these-weather-apis/

https://www.climacell.co/blog/top-8-weather-apis-for-2020/
____

### Сайт при загрузке данных с API:

![Desktop](https://github.com/Erartria/web_6sem/blob/master/img/readme/Onload.jpg)
____
## Лабораторная работа 3 (ФРОНТ)

Необходимо доработать лабораторную работу №2, добавив реализацию серверной части приложения. Серверная часть реализуется на `NodeJS`, допустимо использовать фреймворки вроде `Express` или `Sails`.

Приложение в этой работе становится клиент-серверным, запросы данных о погоде к внешнему API и хранение данных об избранных городах переносятся на сервер. Запросы с клиента отправляются только к самостоятельно реализованной серверной части.

Для получения данных о погоде из внешнего API по городу используется запрос на `GET-endpoint /weather/city` (например: /weather/city?q=Moscow), по координатам – `/weather/coordinates` (например: /weather/coordinates?lat=123&long=456). Если город не найден, должен возвращаться соответствующий ответ с 404 статусом.

Данные об избранных городах хранятся в базе данных, можно использовать любое `SQL/NoSQL` решение. Для работы с избранными городами на сервере должен быть реализован `endpoint /favourites`, обрабатывающий `POST-запросы` на добавление города и `DELETE-запросы` на удаление конкретного города из списка. `GET-запрос на /favourites` возвращает список избранных городов.

Клиентская логика должна быть адаптирована с учетом этих изменений, включая обработку возможных ошибок. Изменения на клиенте должны применяться только после получения соответствующего ответа с сервера (например, удаление города из избранного).

Разработка должна вестись итеративно и публиковаться на github. К моменту проверки и сдачи работы репозиторий должен быть публичным.

Демонстрация работоспособности работы выполняется студентом с помощью демонстрации экрана в zoom. К этому моменту все должно быть подключено и настроено.
____
## Конечные точки
| Конечные точки | Метод | Пример запроса | Описание запроса | Cтатусы | Описание статуса |
| -------------- | ----- | -------------- | ---------------- | ------- | ---------------- |
| /weather/city  | GET | /weather/city?q=Moscow | Возвращает погоду для переданного города |
| /weather/coordinates  | GET | /weather/coordinates?lat= 2&lon=2 | Возвращает погоду по заданным координатам |
| /favourites | GET | /favourites | Возвращает погоду для каждого города в избранном | Возвращает погоду для каждого города в избранном |
| /favourites | POST | /favourites, с переданным телом запроса:<br>{“name”: “Moscow”} | Добавление города в список избранных |
| /favourites | DELETE | /favourites, с переданным телом запроса:<br>{“name”: “Moscow”} | Удаление города из списка избранных |
Установка:

1. Скачайте и установите [бэк](https://github.com/Erartria/WeatherAPI)
2. В ./js/request/config.js расскоментируйте строку `const APIurl = "http://localhost:3000"`, удалите останьные объявления переменной APIurl в этом файле.
3. Откройте index.html

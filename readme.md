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

## Исправить с 12.03.2021

- [x] Убрать grid из body
- [x] Media-запрос срабатывает слишком поздно, нужно примерно на 500 px
- [x] Переписать header с grid на flex
- [x] Колонка для текущей локации должна быть вровень с нижней 
- [x] Использовать tag p для temperature вместо div
- [x] Переписать секцию addition с grid на flex
- [x] Переписать шапку для карточки избранного города с grid на flex
- [x] Кнопки удаления избранного города должны иметь кликабельный размер на мобильных устройствах
- [x] Расположить форму добавления нового избранного города на уровне с правой колонкой избранных городов
- [x] Задать вертикальное расстояние между карточками избранных городов

## Исправить с 19.03.2021

- [x] В header появился лишний div;
- [x] position: absolute ломает кнопку с геолокацией;
- [x] Съезжающее название города;
- [x] Лишняя полоска под карточками (зачем?);
- [x] Избранное лучше отделить от карточек ещё большим отступом;
- [x] margin для "Избранное" и position: absolute для формы - некруто, есть же flexbox.


## Исправить с 26.03.2021

- [x] При вызове асинхронной функции используется либо ```await``` либо ```then и catch```. (Пример как не нужно делать на 130 строке)
- [x] Выделить для запроса локации и города отдельные функции
- [x] Использовать один стиль camel/snake case (default_city для localstorage - не очень изменить на camelCase)
- [x] Разделить все функции js на несколько файлов по назначению (request, localstorage, main и т.д.)
- [x] Параллельно загружать карточки для localStorage в разделе ```Favourites```
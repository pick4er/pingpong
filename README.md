
## Содержание

* [Описание проекта](#описание-проекта)
* [Библиотеки](#библиотеки)
* [Команды](#команды)
* [Хранение кода](#организация-хранения-кода)
* [Архитектура и организация кода](#архитектура-и-организация-кода)
* [Структура кода](#структура-проекта)
* [Стили](#стили)
* [Подход к вёрстке](#подход-к-вёрстке)
* [Выпадающий список](#выпадающий-список)
* [Валидация формы](#валидация-формы)
* [TODO](#todo)
* [Послесловие](#послесловие)

## Описание проекта

Этот проект - небольшая консоль для работы с API сервиса рассылок sendsay https://sendsay.ru/api/apiform.html. 
Его главная задача - предоставить удобный интерфейс для работы с объёмными json запросами.<br />

Чтобы работать с консолью, нужно создать бесплатный аккаунт на sendsay https://sendsay.ru/ и войти под своей учётной записью на сайте https://sendsay-api.herokuapp.com. В текущей версии работа по своему api ключу не предусмотрена.<br />

Интерфейс консоли представляет собой панель из двух редакторов кода: один для запроса, другой для ответа. Консоль уже знает, по какому адресу отправлять запросы и умеет работать только с ним, поэтому указать свой url сервера нельзя.<br />

Если выполнить запрос в первый раз, то над редакторами появится строка с историей запросов. Она умеет хранить до 15 элементов и сортировать элементы от самых свежих к самым старым. Каждый запрос в истории можно повторить снова, скопировать или удалить, если нажать на кнопку выпадающего списка в углу каждого запроса. Повторённый запрос перемещается в начало списка.<br />

У консоли есть память. Она хранит размеры окон редакторов, историю запросов и сессию. К сожалению, автоматического обновления сессии пока нет. Поэтому, если в ответе на запрос приходит ошибка доступа, возможно, вам нужно выйти и зайти в консоль снова. Работаю над исправлением этого неудобства.<br />

Если у вас возникают трудности при работе с консолью, то можно написать разработчику в телегу [@pick4er](https://t.me/pick4er). <br />

## Библиотеки
Проект создан с помощью create-react-app утилиты.
В качестве CLI в проекте выбрал yarn, потому что он идёт по-умолчанию в create-react-app приложении.<br />

Ниже указаны лишь те библиотеки, назначение которых трудно осмыслить без дополнительных усилий.

**jsonlint-mod** - чтобы проверять качество json кода в редакторе codemirror. Расширение jsonlint в codemirror по-умолчанию оказалось нерабочим из-за ошибки в самом
jsonlint (https://github.com/scniro/react-codemirror2/issues/21#issuecomment-485384864). Пришлось заменить.<br />
**nanoid** - для создания уникальных id. Выбрал вместо uuid, потому что у nanoid меньше размер и привычнее api.<br />
**cookies-js** - для хранения токена авторизации в cookies браузера. <br />
**js-beautify** - для форматирования кода в редакторе codemirror. <br />
**redux-thunk** - middleware для асинхронных действий в store.<br />
**redux-persist** - для хранения данных в local storage.<br />
**node-sass** - для работы с sass стилями в проекте (почему sass написал в разделе о стилях).<br />

## Команды
`yarn start` - запускает код в development режиме<br />
`yarn build` - собирает код фронта в production версию<br />
`yarn serve` - запускает сервер для обслуживания собранной production версии фронта<br />
`yarn lint` - проверяет код на соглашения<br />
`yarn lint-fix` - проверяет код на соглашения и исправляет стилевые несоответствия (с помощью prettier)<br />

## Организация хранения кода
Система версионирования - git. Удалённый репозиторий проекта лежит на github и доступен по ссылке https://github.com/pick4er/pingpong.<br />

Рабочая ветка по-умолчанию - dev. Нежелательно пушить в неё напрямую, потому что к dev ветке подключено staging окружение на heroku. Идеально, если это будет pull requests из других (не master) веток с законченными улучшениями.<br />

Чтобы начать делать задачу, нужно создать отдельную ветку от dev и работать с ней.<br />
Ветка master нужна для production окружения и пока не используется. Пушить в неё напрямую запрещено.<br />

## Архитектура и организация кода
У проекта стандартная flux архитектура с общим store, в котором лежат данные и логика, и компонентами - подписчиками, которые подписываются на изменения в store разными способами.<br />

Store разделён на модули по смыслу. Прежде чем добавить новый функционал в приложение, стоит подумать, в каком существующем модуле могут лежать новые данные. Если такого нет, стоит ещё раз подумать, как будет выглядеть новый модуль. <br />

В качестве организации flux модуля выбран подход ducks. При нём actions, reducer, action creators, selectors и middleware лежат в модулях по смыслу, а не в файлах по типу механизма. Практика показывает, что так удобнее.<br />

Чтобы подписаться на свойство определённого модуля в store, нужно создать отдельный селектор для данного свойства (с помощью библиотеки reselect), а не обращаться напрямую store.state.user… . Такое решение связано с тем, что структура store может изменяться при развитии проекта, и тогда обращение к свойствам напрямую принесёт лишь дополнительные трудности.<br />

В проекте обширно используется DOM API в обход привычного React подхода “сверху - вниз” (от родителя к потомкам). Это решение вызвано тем, что в некоторых случаях оно удобнее и производительнее привычной передачи параметров, а жизнь вообщем не ограничивается библиотеками.<br />

Все UI компоненты представляют собой функции с react hooks, потому что они быстрее и лаконичнее классовых компонентов. Они разделены на три уровня по степени переиспользования: elements, components и pages. <br />

Pages это целые страницы. Они должны быть презентационными. Их задача собирать UI компоненты воедино. Как правило, pages не переиспользуются в приложении.<br />

Components это отдельные компоненты для страниц. Они могут переиспользоваться на разных страницах. Их задача работать со своим по-смыслу участком store и подстраиваться под разные данные. В компоненте могут быть вложенные компоненты. Они доступны для работы только своему компоненту-родителю. <br />

Elements представляют собой простые UI элементы страницы. Они выполняют чётко одну небольшую ограниченную задачу и предоставляют интерфейс для своего внешнего вида. Они не работают со store. Элементы могут использовать другие элементы.<br />

## Структура проекта
Каждый UI компонент должен лежать в одноимённой папке и содержать файлы index.js(x) и index.scss (стили могут отсутствовать). <br />
По-умолчанию в путях импорта указана папка src/.
Импортировать js компоненты можно, опуская расширение .js и index.js в частности. <br />

Ниже даны пояснения к некоторым файлам и папкам:<br />

**public** папка хранит статику, которую create-react-app обрабатывает не сильно при сборке кода приложения.<br />
**src/App.js** - отвечает за логику путей и редиректов. Используется для авторизации.<br />
**src/styles** папка хранит глобальные стили. В файлах этой папки лежат классы или переменные по-назначению - то есть те, которые могут изменять определённые свойства компонентов и элементов. <br />
**src/helpers** папка хранит утилиты, общие для нескольких компонентов в проекте. <br />
**src/flux** папка хранит логику работы с данными проекта.<br />
**src/flux/modules/user** модуль хранит информацию, специфичную для пользователя: токен, логин, сублогин, размеры редактора.<br />
**src/flux/modules/requests** модуль хранит информацию о запросах и историю.<br />
**src/flux/modules/notifications** модуль хранит уведомления и отвечает за их очистку.<br />
**src/dictionary/index.js** - хранит словари с ключевыми словами и ненастраиваемые константы (независимые от окружения).<br />
**src/assets** папка хранит иконки и другую статику, обрабатываемую при сборке.<br />
**src/api/index.js** - хранит вызовы к api. <br />

## Стили
В этом проекте используется sass, потому что с его помощью можно определить глобальные переменные (цвета) и примеси. Примеси удобно использовать там, где глобальные классы бессильны. Например, при настройке CodeMirror не всегда удаётся оптимальным образом передать конкретный класс конкретному dom элементу. Для этой задачи удобно взять существующий класс и добавить в него примесь.<br />

Глобальные классы в папке styles/ определены в одноимённых файлах. Это значит, что для настройки текста нужно взять классы из файла text.scss, для анимации - из файла animation.scss. Глобальные стили, специфичные для определённого элемента, лежат в файле по назначению с глобальными стилями. То есть класс текста для кнопки по-умолчанию будет лежать в файле styles/text.scss и называться .button-text. <br />

Названия глобальных классов могут иметь разную специфичность. Сравните .button-text и .input-text. Класс .button-text может иметь точно такие же css правила, что и .input-text. Но для стилизации какой-нибудь особенной кнопки нужно использовать именно .button-text, потому что этот класс подходит по-смыслу.<br />

## Подход к вёрстке
Вёрстка в этом проекте придерживается БЭM подхода. <br />

Каждый компонент / элемент, если нужно, должен предоставлять параметр с названием класса стилей в качестве интерфейса для настройки конкретного элемента внутри себя. Расширять классы компонентов внутри в обход интерфейса нежелательно. <br />

## Выпадающий список
Корневой элемент выпадающего списка - элемент Dropdown. Это полностью логический компонент без классов и стилей.<br />

Он принимает параметр состояния открытости списка, коллбек для изменения состояния открытости, несколько стилевых параметров и два главных элемента: триггер, который открывает список, и сам список.<br />

Dropdown оборачивает в dom узлы триггер и список и к каждому dom узлу-обёртке внутри себя добавляет ref ссылку. С помощью этих ref ссылок и DOM API он рассчитывает координаты триггера и абсолютно позиционирует список относительно триггера. <br />

Также Dropdown добавляет несколько обработчиков на document и на их основе решает, стоит показывать список или нет.<br />

Такой подход к организации выпадающего списка помогает отделить необходимую логику открытия / закрытия от стилей и дополнительных действий, вроде закрытия списка по клику внутренней кнопки.<br />

## Валидация формы
Основная проблема работы с формой, которую мог наблюдать в предыдущих проектах, это лишняя перерисовка всех элементов формы при изменении какого-то одного поля. <br />

Поэтому, чтобы избежать растраты ресурсов, решил оставить значение формы внутри самого инпута и сделать его неконтролируемым. То есть он не хранит value и не изменяет его программно. <br />

Элемент FormInput содержит в себе название (label) и native (dom) input. Он получает ref ссылку нативного инпута и с помощью неё подписывается на событие ‘change’, которое срабатывает по окончании ввода, и событие ‘submit’ на форме, чтобы провести валидацию ещё раз. DOM компонент формы можно получить через ref нативного инпута.<br />

Также элемент FormInput получает от своего родителя массив функций-валидаторов, которые должны возвращать текст ошибки в случае ошибки, либо undefined, если всё ок.<br />

При нахождении ошибки в процессе валидации элемент FormInput добавляет в native input атрибут data-error с текстом ошибки, который может использовать форма - пользователь инпута. <br />

Чтобы использовать все прелести такого инпута, компонент формы-пользователя должен получить ref ссылку на dom форму и тоже подписаться на событие ‘change’. Оно срабатывает, когда пользователь завершил ввод в одно из полей формы. В этом событии можно выполнить свою валидацию или заблокировать кнопку submit, если в native input есть ошибка (проверяется через dataset.error). <br />

## TODO
Показывать уведомление, если запрос или логин длятся слишком долго.<br />
Автоматически обновлять сессию или направлять пользователя в logout при истечении срока жизни токена.<br />
Улучшить анимацию при добавлении нового запроса в историю.<br />
Добавить работу по api ключу, а не только логину. <br />

## Послесловие
Скорее всего, это далеко не идеальная реализация консоли. Во многом проблемы связаны с подходом “лучшее враг хорошего” и желанием выпустить MVP в адекватные сроки (7 дней). Работа над проектом продолжается в свободное вечернее время. Буду благодарен любой обратной связи и code review. <br />
<br />
@pick4er

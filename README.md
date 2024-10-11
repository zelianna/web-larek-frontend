# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами


## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание проекта
Проект "Web-larek" представляет собой пример работы интернет-магазина. Главная страница содержит каталог товаров. Пользователь может просматривать товары. При нажатии на карточку товара открывается окно с детальной информацией о товаре. При нажатии на иконку корзины открывается корзина. При просмотре товара у пользователя есть возможность добавить товар в корзину по кнопке Купить или удалить из корзины ранее добавленный товар по кнопке Убрать. Проект использует TypeScript и SPA (Single Page Application) подход с использованием API для получения данных о товарах.


## Архитектура проекта
Приложение реализует MVP-паттерн. Логика разделена на слои:

1) Model (Модель) — отвечает за данные. Модель ничего не знает о визуальной части приложения.
Здесь выделены 3 сущности: Item, Basket и User. Интерфейсы товара, корзины и пользователя описаны в index.ts

Синхронизация моделей данных с сервером делается с помощью следующих функций:
fetchItems
addItemToBasket
deleteItemToBasket
submitOrder

2) View (Представление) — отвечает за отображение данных пользователю и взаимодействие с ним. Это визуальная часть приложения. View получает команды от Presenter и отображает данные, но сама не выполняет никакую бизнес-логику.

Представление охватывает следующие пользовательские сценарии:
Просмотр каталога товаров и взаимодействие с корзиной (MainPageView)
Просмотр карточки товара в модальном окне (ItemModalView)
Просмотр малой карточки товара (ItemCardView)
Просмотр корзины (BasketModalView)
Оформление заказа (Оплата и доставка- PaymentModalView, данные получателя- ContactsModalView)
Информирование пользователя об успешном заказе (SuccessOrderModalView)

Интерфейсы всех представлений описаны в index.ts

Так как модальные окна в проекте однотипные, то их общая логика и структура вынесена в абстрактный класс ModalForm. Все модальные окна наследуются от него и переопределяют методы для своих нужд.

3) Presenter (Презентер) — посредник между View и Model (EventEmitter). Он получает данные от Model, обрабатывает их, если нужно, и передает их в View. Также Presenter обрабатывает действия пользователя, которые происходят во View, и решает, как на них реагировать, взаимодействуя с Model.

![UML схема проекта](./README_UML.jpg)

## Описание используемых классов
### Классы модели

1. **Item (Товар)**
   - **Атрибуты**:
     id: string — уникальный идентификатор товара
     title: string — название товара
     image: string — изображение товара
     price: number — цена товара
     category: string — категория товара
     description: string — описание товара
   - **Методы**:
     getFormattedPrice(): string — возвращает цену товара в отформатированном виде
     getItemDetails(): string — возвращает краткое описание товара для отображения в карточке

2. **User (Пользователь)**
   - **Атрибуты**:
     id: string — уникальный идентификатор пользователя
     email: string — электронная почта
     phone: string — номер телефона
   - **Методы**:
     updateContactInfo(newEmail: string, newPhone: string): void — обновляет контактную информацию пользователя
     getContactDetails(): string — возвращает контактные данные пользователя в виде строки

3. **Basket (Корзина)**
   - **Атрибуты**:
     items: IItem[] — список товаров в корзине
     total: number — общая сумма корзины
     payment_method: string — метод оплаты
     shipping_address: string — адрес доставки
     buyer_id: string — идентификатор покупателя
     status_order: string — статус заказа
   - **Методы**:
     addItem(item: IItem): void — добавляет товар в корзину
     removeItem(itemId: string): void — удаляет товар из корзины по id
     getTotalPrice(): number — возвращает общую сумму корзины
     clearBasket(): void — очищает корзину
     submitOrder(): Promise<string> — отправляет заказ на сервер и возвращает статус заказа


### Классы представления

1. **MainPageView**
   - **Методы**:
     - `renderItems(items: IItem[]): void` — отображает список товаров на главной странице.
     - `showError(message: string): void` — отображает сообщение об ошибке на странице.

2. **ItemCardView**
   - **Методы**:
     - `render(item: IItem): void` — отображает карточку товара с его основной информацией.
     - `onAddToBasketClick(item: IItem): void` — обрабатывает нажатие на кнопку "Добавить в корзину".

3. **ItemModalView**
   - **Методы**:
     - `render(item: IItem): void` — отображает информацию о товаре в модальном окне.
     - `onAddToBasketClick(item: IItem): void` — обрабатывает добавление товара в корзину через модальное окно.
     - `closeModal(): void` — закрывает модальное окно.

4. **BasketModalView**
   - **Методы**:
     - `renderBasket(basket: IBasket): void` — отображает содержимое корзины в модальном окне.
     - `onRemoveItemClick(itemId: string): void` — обрабатывает удаление товара из корзины.
     - `closeModal(): void` — закрывает модальное окно корзины.

5. **PaymentModalView**
   - **Методы**:
     - `renderPaymentForm(basket: IBasket): void` — отображает форму оплаты для текущей корзины.
     - `onPaymentSubmit(paymentDetails: { paymentMethod: string; shippingAddress: string }): void` — обрабатывает отправку формы оплаты.
     - `showError(message: string): void` — отображает сообщение об ошибке при оплате.

6. **ContactsModalView**
   - **Методы**:
     - `renderContactForm(user: IUser): void` — отображает форму с контактной информацией пользователя.
     - `onSubmitContactForm(contactDetails: { email: string; phone: string }): void` — обрабатывает отправку формы с контактной информацией.

7. **SuccessOrderModalView**
   - **Методы**:
     - `renderSuccessMessage(orderId: string): void` — отображает сообщение об успешном заказе с идентификатором заказа.

 ### API 
 Класс Api: базовая логика отправки запросов
    - **Атрибуты**:
        baseUrl: строка, представляющая базовый URL API.
        options: параметры запроса
    - **Методы**:  
        get(uri: string): отправляет GET-запрос на указанный URI и обрабатывает ответ.
        post(uri: string, data: object, method: ApiPostMethods = 'POST'): отправляет POST, PUT или DELETE запрос с переданными данными.
        handleResponse(response: Response): обрабатывает ответ от сервера, возвращая данные или ошибку.
    - **Типы**:
        ApiListResponse<Type>: представляет ответ API, содержащий общее количество и массив элементов типа Type.
        ApiPostMethods: тип, который определяет методы POST, PUT, DELETE.    

 Класс EventEmitter: обеспечивает работу событий. Его методы позволяют устанавливать и снимать слушатели событий, вызывать слушатели при возникновении события.
    - **Атрибуты**:
        events: карта событий, которая связывает имена событий с подписчиками (функциями обратного вызова).
    - **Методы**:
        on(eventName: EventName, callback: (event: T) => void): подписывает на событие с указанным именем.
        off(eventName: EventName, callback: Subscriber): удаляет подписку на событие.
        emit(eventName: string, data?: T): вызывает событие с переданными данными.
        onAll(callback: (event: EmitterEvent) => void): подписка на все события.
        offAll(): удаляет все подписки.
        trigger(eventName: string, context?: Partial<T>): создает функцию, которая инициирует событие при вызове.
    - **Типы**:
        EventName: строка или регулярное выражение, представляющее имя события.
        Subscriber: функция, представляющая подписчика на событие.
        EmitterEvent: объект события с именем и данными.        

### Связь между моделью и представлением
Связь между слоем модели и представлением реализована через слой Presenter. Он управляет взаимодействием между Model и View, принимая пользовательские команды, обновляя данные и передавая их для отображения.        
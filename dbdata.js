// collection Client
{
    "_id": {
    "$oid": "646ec5a04e4b8e8aaacda9fa"
},
    "name": "Иван",
    "surname": "Иванов",
    "patronymic": "Иванович",
    "birthDate": "01-01-1980",
    "products": [
    {
        "category": "Страхование",
        "title": "Страхование недвижимости"
    },
    {
        "category": "Страхование",
        "title": "Страхование жизни"
    }
]
}
/************/
{
    "_id": {
    "$oid": "646ec7424e4b8e8aaacdaa05"
},
    "name": "Олег",
    "surname": "Олегов",
    "patronymic": "Олегович",
    "birthDate": "02-02-1990",
    "products": [
    {
        "category": "Инвестиции",
        "title": "Инвестиции недвижимости"
    }
]
}
/************/

// colletion Manager
{
    "_id": {
    "$oid": "646ec5134e4b8e8aaacda9f5"
},
    "name": "Петр",
    "surname": "Петров",
    "category": "ordinary"
}
/************/
{
    "_id": {
    "$oid": "646ec5824e4b8e8aaacda9f6"
},
    "name": "Сергей",
    "surname": "Сергеев",
    "category": "business"
}
/************/
{
    "_id": {
    "$oid": "646ec5894e4b8e8aaacda9f7"
},
    "name": "Ольга",
    "surname": "Олеева",
    "category": "bank"
}
/************/

// collection User
{
    "_id": {
    "$oid": "646ec6634e4b8e8aaacda9fe"
},
    "role": "manager",
    "login": "manager1",
    "idForeign": "646ec5134e4b8e8aaacda9f5"
}
/************/
{
    "_id": {
    "$oid": "646ec6944e4b8e8aaacdaa00"
},
    "role": "manager",
    "login": "manager2",
    "idForeign": "646ec5824e4b8e8aaacda9f6"
}
/************/
{
    "_id": {
    "$oid": "646ec6984e4b8e8aaacdaa01"
},
    "role": "manager",
    "login": "manager3",
    "idForeign": "646ec5894e4b8e8aaacda9f7"
}
/************/
{
    "_id": {
    "$oid": "646ec69d4e4b8e8aaacdaa02"
},
    "role": "client",
    "login": "client1",
    "idForeign": "646ec5a04e4b8e8aaacda9fa"
}
/************/
{
    "_id": {
    "$oid": "646ec6a34e4b8e8aaacdaa03"
},
    "role": "client",
    "login": "client2",
    "idForeign": "646ec7424e4b8e8aaacdaa05"
}
/************/

// collection ClientChat
{
    "_id": {
    "$oid": "646ec8a94e4b8e8aaacdaa19"
},
    "clientId": "646ec5a04e4b8e8aaacda9fa",
    "clientName": "Иван",
    "clientSurname": "Иванов",
    "clientProducts": [
    {
        "category": "Страхование",
        "title": "Страхование недвижимости"
    },
    {
        "category": "Страхование",
        "title": "Страхование жизни"
    }
],
    "messages": [
    {
        "senderId": "646ec5a04e4b8e8aaacda9fa",
        "text": "привет!",
        "timestamp": "18-05-32 24-05-2023"
    },
    {
        "senderId": "646ec5134e4b8e8aaacda9f5",
        "text": "привет, как дела?",
        "timestamp": "18-06-00 24-05-2023"
    },
    {
        "senderId": "646ec5a04e4b8e8aaacda9fa",
        "text": "Отлично, а твои?",
        "timestamp": "18-06-10 24-05-2023"
    },
    {
        "senderId": "646ec5134e4b8e8aaacda9f5",
        "text": "Тоже хорошо",
        "timestamp": "18-06-32 24-05-2023"
    }
],
    "chatStatus": "isClosed",
    "chatCategory": null,
    "managerId": null
}
/************/
{
    "_id": {
    "$oid": "646ec96e4e4b8e8aaacdaa1e"
},
    "clientId": "646ec7424e4b8e8aaacdaa05",
    "clientName": "Олег",
    "clientSurname": "Олегов",
    "clientProducts": [
    {
        "category": "Бизнес",
        "title": "Малый бизнес"
    }
],
    "messages": [],
    "chatStatus": "isClosed",
    "chatCategory": null,
    "managerId": null
}
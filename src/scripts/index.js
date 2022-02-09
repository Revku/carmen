import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const btn = document.getElementById('btn');
const result = document.getElementById('result');

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handleSubmit = () => {
    const countryInput = document.getElementById('country');
    const genderInput = document.getElementById('gender');
    const minAgeInput = document.getElementById('minAge');
    const maxAgeInput = document.getElementById('maxAge');
    const phoneNumberFormatInput = document.getElementById('phoneNumberFormat');

    let options = {
        gender: genderInput.value,
        ageInterval: {
            min: minAgeInput.value,
            max: maxAgeInput.value,
        },
        country: countryInput.value,
        phoneNumberFormat: phoneNumberFormatInput.value,
    }

    if (!maxAgeInput.value) {
        options.ageInterval.max = 95;
    }

    if (!minAgeInput.value) {
        options.ageInterval.min = 1;
    }

    if (!phoneNumberFormatInput.value) {
        options.phoneNumberFormat = '###-###-###';
    }
    
    // Faker language
    faker.setLocale(options.country);

    const person = [
        {
            title: 'Imię',
            value: faker.name.firstName(options.gender),
        },
        {
            title: 'Nazwisko',
            value: faker.name.lastName(options.gender),
        },
        {
            title: 'Zawód',
            value: faker.name.title(),
        },
        {
            title: 'Wiek',
            value: getRandomNumber(options.ageInterval.min, options.ageInterval.max),
        },
        {
            title: 'Adres IP',
            value: faker.internet.ip(),
        },
        {
            title: 'Numer Telefonu',
            value: faker.phone.phoneNumber(options.phoneNumberFormat),
        },
        {
            title: 'Miasto',
            value: faker.address.cityName(),
        },
        {
            title: 'Ulica',
            value: faker.address.streetName(),
        },
    ]

    const fragment = document.createElement('div');
    fragment.classList.add('card');

    person.map(item => {
        const el = document.createElement('p');
        el.innerHTML = `<span class="item__title">${item.title}:</span> <span class="item__value"> ${item.value}</span>`;
        fragment.appendChild(el);
    });


    result.appendChild(fragment);

    console.log(person);
}

btn.addEventListener('click', handleSubmit)
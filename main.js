const openModalBtn = document.querySelector('.open-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const closeModalLuckBtn = document.querySelector('.lucky-btn');
const form = document.querySelector('.send-message');
const buttons = document.querySelectorAll('.button-panel > li > button');
const illustrations = document.querySelectorAll('.illustration-content');
const inputs = form.getElementsByTagName('input');
const inputCredit = document.getElementById('input-credit-card');
const inputPhone = document.getElementById('input-phone');
const inputDate = document.getElementById('input-date');

AOS.init();

const cleaveCreditCard = new Cleave(inputCredit, {
    creditCard: true
});

var cleaveDate = new Cleave(inputDate, {
    date: true,
    delimiter: '-',
    datePattern: ['Y', 'm', 'd']
});

var cleavePhone = new Cleave(inputPhone, {
    phone: true,
    phoneRegionCode: 'BY',
    delimiter: ' ',
    blocks: [2, 3, 2, 2],
    prefix: '+375 ',
    noImmediatePrefix: true
});

const swiper = new Swiper(
    '.first-swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 4,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        spaceBetween: 28
    }
)

const swiper2 = new Swiper(
    '.second-swiper', {
        direction: 'horizontal',
        loop: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            // bulletActiveClass: '.swiper-pagination-bullet-active'
        },

        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,

        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },
        mousewheel: {
            sensitivity: 1,
        },
    }
)

for (let i = 0; i < 6; i++) {
    const input = inputs[i];

    input.addEventListener('input', () => {

        let value = input.value

        if (value === '') {
            input.setCustomValidity("Поле должно быть заполнено!");
        } else if (value.length > 20) {
            input.setCustomValidity("ДВА СИМВОЛА МАКСИМУМ")
        } else if (value.length < 2) {
            input.setCustomValidity("ДВА СИМВОЛА МИНИМУМ")
        } else {
            input.setCustomValidity("");
        }

        input.value = value.charAt(0).toUpperCase() + value.slice(1);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isError;
    for (let i = 0; i < 5; i++) {
        const input = inputs[i];

        if (input.value === null || input.value === '') {
            alert('Please, fill all of inputs');
            isError = true;
            break;
        }
    }

    if (isError) return;

    console.log('Message sent!');
})

const handleModalClosing = () => {
    modal.classList.add('hidden');

    closeModalBtn.removeEventListener('click', handleModalClosing);
};

const handleModalOpening = () => {
    console.log('click')
    setTimeout(() => {

        modal.classList.remove('hidden');

        closeModalBtn.addEventListener('click', handleModalClosing);

        document.addEventListener('keydown', (event) => {

            if (event.key === 'Escape') {
                event.preventDefault();
                handleModalClosing();
            }
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                handleModalClosing()
            }
        });

        closeModalLuckBtn.addEventListener('click', () => {
            handleModalClosing()
        })
    }, 500)
}

openModalBtn.addEventListener('click', handleModalOpening);

const setTab = (event) => {
    const element = event.target;
    const tabName = element.getAttribute('data-tab');

    const activeBtn = document.querySelector('.button-panel .active');
    activeBtn.classList.remove('active');

    element.classList.add('active');

    for (let i = 0; i < illustrations.length; i++) {
        const tabItem = illustrations[i].getAttribute('data-tab');

        if (tabItem !== tabName && tabName !== 'all') {
            illustrations[i].classList.add('tabHidden');
        } else {
            illustrations[i].classList.remove('tabHidden');
        }
    }
};

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', setTab);
}


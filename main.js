const openModalBtn = document.querySelector('.open-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const closeModalLuckBtn = document.querySelector('.lucky-btn');
const form = document.querySelector('.send-message');
const inputs = form.getElementsByTagName('input');
const submitBtn = document.querySelector('.send');

console.log(inputs[0].value)

for (let i = 0; i < 5; i++) {
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
// }

const handleModalClosing = () => {
    modal.style.display = 'none';

    closeModalBtn.removeEventListener('click', handleModalClosing);
};

const handleModalOpening = () => {
    setTimeout(() => {

        closeModalLuckBtn.innerText = 'good luck';

        modal.style.display = 'block';

        closeModalBtn.addEventListener('click', handleModalClosing);

        document.addEventListener('keydown', (event) => {
            event.preventDefault();

            if (event.key === 'Escape') handleModalClosing();
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                handleModalClosing()
            }
        });

        closeModalLuckBtn.addEventListener('click', () => {
            closeModalLuckBtn.innerText = 'Thank you!';

            setTimeout(handleModalClosing, 1000);

        })
    }, 500)
}

openModalBtn.addEventListener('click', handleModalOpening)
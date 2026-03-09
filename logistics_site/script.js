document.querySelector('.scroll-indicator').addEventListener('click', function() {
    document.querySelector('#contacts').scrollIntoView({
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('modal');
    const openBtns = document.querySelectorAll('.cta-btn, .header-btn');
    const closeBtn = document.querySelector('.close-btn');
    const sendBtn = document.getElementById('sendBtn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    });


    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
    });

    document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
    }
    });


    if (sendBtn) {
        sendBtn.addEventListener('click', function() {

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();

            if (!name || !phone) {
                alert("Будь ласка, заповніть всі поля");
                return;
            }

            const token = '8322616035:AAHTjV94AXuQbns6MqBYddqXSQti2babHwM';
            const chat_id = '1175559763';

            const message = `🚛 Нова заявка з сайту РівнеАвтоТранс\n\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}`;

            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chat_id,
                    text: message
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    alert("Заявка відправлена!");
                    modal.classList.remove('active');
                } else {
                    console.log(data);
                    alert("Помилка Telegram");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Помилка відправки");
            });

        });
    }

});

const TELEGRAM_BOT_TOKEN = '8322616035:AAHTjV94AXuQbns6MqBYddqXSQti2babHwM';
const TELEGRAM_CHAT_ID = '1175559763';

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('[data-modal]');
  const menu = document.querySelector('[data-menu]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const form = document.querySelector('[data-lead-form]');
  const submitButton = form.querySelector('button[type="submit"]');

  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => modal.showModal());
  });

  document.querySelector('[data-close-modal]').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });

  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const details = String(data.get('details') || '').trim() || 'Не вказано';
    const text = [
      '🚚 Нова заявка з сайту РівнеАвтоТранс', '',
      `Ім’я: ${name}`, `Телефон: ${phone}`,
      `Маршрут / вантаж: ${details}`,
      `Час: ${new Date().toLocaleString('uk-UA')}`
    ].join('\n');

    submitButton.disabled = true;
    submitButton.textContent = 'Надсилання…';
    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text })
      });
      if (!response.ok) throw new Error('Telegram request failed');
      form.reset(); modal.close();
      alert('Заявку надіслано. Ми зв’яжемося з вами найближчим часом.');
    } catch (error) {
      console.error(error);
      alert('Не вдалося надіслати заявку. Будь ласка, зателефонуйте нам: +38 067 165 93 60');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Надіслати заявку <span aria-hidden="true">↗</span>';
    }
  });

  document.querySelector('[data-year]').textContent = new Date().getFullYear();
});

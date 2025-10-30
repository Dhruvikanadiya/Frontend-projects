// script.js — simple UI enhancements: theme toggle and basic contact form validation

document.addEventListener('DOMContentLoaded', function () {
  // Simple contact-form validation + demo submit handling
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const fields = Array.from(form.querySelectorAll('input, textarea'))
        .filter(el => el.type !== 'hidden');

      const empty = fields.find(f => f.value.trim() === '');
      if (empty) {
        // Focus the first empty field and show a message
        empty.focus();
        alert('Please fill out all fields before submitting.');
        return;
      }

      // Demo success flow (replace with real submission logic)
      alert('Thanks — your message was received (demo).');
      form.reset();
    });
  }

  // Small interaction: click the name to show a greeting
  const nameEl = document.getElementById('n2');
  if (nameEl) {
    nameEl.style.cursor = 'pointer';
    nameEl.title = 'Click for a greeting';
    nameEl.addEventListener('click', function () {
      alert("Hello Dhruvi — nice to meet you 👋");
    });
  }
});

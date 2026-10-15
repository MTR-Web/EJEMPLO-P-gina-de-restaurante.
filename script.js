document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const cfg = typeof CONFIG !== 'undefined' ? CONFIG : null;
  if (!cfg) { console.error('No se pudo cargar config.js'); return; }

  const setText = (selector, value) => { const el = $(selector); if (el && value != null) el.textContent = value; };
  const setImage = (selector, src, alt) => { const el = $(selector); if (el && src) { el.src = src; if (alt) el.alt = alt; } };
  const waUrl = (message = '') => `https://wa.me/${String(cfg.whatsapp || '').replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  document.documentElement.style.setProperty('--bg', cfg.colores?.fondo || '#f8f6f1');
  document.documentElement.style.setProperty('--text', cfg.colores?.texto || '#20231f');
  document.documentElement.style.setProperty('--accent', cfg.colores?.acento || '#c36c45');
  document.documentElement.style.setProperty('--card', cfg.colores?.tarjeta || '#fff');
  document.documentElement.style.setProperty('--dark', cfg.colores?.oscuro || '#242923');
  document.title = `${cfg.nombre || 'Restaurante'} | ${cfg.rubro || 'Restaurante'}`;
  $$('.business-name').forEach(el => el.textContent = cfg.nombre || 'Restaurante');
  setText('#announcement', cfg.avisoSuperior);
  setText('#hero-description', cfg.portada?.descripcion);
  setText('#hero-note', cfg.portada?.nota);
  setImage('#hero-image', cfg.portada?.imagen, `Interior de ${cfg.nombre}`);
  setText('#story-title', cfg.nosotros?.titulo);
  setText('#story-description', cfg.nosotros?.descripcion);
  setText('#story-signoff', cfg.nosotros?.firma);
  setImage('#story-image', cfg.nosotros?.imagen, `Ambiente de ${cfg.nombre}`);
  setText('#contact-address', cfg.direccion);
  setText('#reservation-address', cfg.direccion);
  setText('#contact-hours', cfg.horarios);
  setText('#reservation-hours', cfg.horarios);
  setText('#contact-phone', cfg.telefonoVisible);
  setText('#current-year', new Date().getFullYear());
  if ($('#maps-link')) $('#maps-link').href = cfg.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(cfg.direccion || '')}`;
  if ($('#contact-whatsapp')) $('#contact-whatsapp').href = waUrl(`Hola, quisiera hacer una consulta para ${cfg.nombre}.`);
  if ($('#floating-whatsapp')) $('#floating-whatsapp').href = waUrl(`Hola, quisiera consultar con ${cfg.nombre}.`);
  if ($('#contact-phone') && cfg.telefonoVisible) $('#contact-phone').href = `tel:${cfg.telefonoVisible.replace(/[^\d+]/g, '')}`;

  // Menú móvil
  const toggle = $('#menu-toggle'), nav = $('#nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      toggle.textContent = open ? '✕' : '☰';
    });
    $$('#nav a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú'); toggle.textContent = '☰';
    }));
  }

  // Carta generada desde config.js
  const menuGrid = $('#menu-grid'), filters = $('#menu-filters');
  const categories = ['Todos', ...new Set((cfg.platos || []).map(dish => dish.categoria))];
  if (filters) filters.innerHTML = categories.map((category, index) => `<button class="filter-button${index === 0 ? ' active' : ''}" type="button" data-category="${escapeHTML(category)}" aria-pressed="${index === 0}">${escapeHTML(category)}</button>`).join('');
  function escapeHTML(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
  function renderMenu(category = 'Todos') {
    if (!menuGrid) return;
    const dishes = (cfg.platos || []).filter(dish => category === 'Todos' || dish.categoria === category);
    menuGrid.innerHTML = dishes.map(dish => `<article class="dish-card"><img class="dish-image" src="${escapeHTML(dish.imagen)}" alt="${escapeHTML(dish.nombre)}" loading="lazy" onerror="this.style.display='none'"><div class="dish-content"><div class="dish-top"><h3>${escapeHTML(dish.nombre)}</h3><span class="dish-price">${escapeHTML(dish.precio)}</span></div><p>${escapeHTML(dish.descripcion)}</p>${dish.etiqueta ? `<span class="dish-tag">${escapeHTML(dish.etiqueta)}</span>` : ''}</div></article>`).join('');
  }
  renderMenu();
  filters?.addEventListener('click', event => {
    const button = event.target.closest('[data-category]'); if (!button) return;
    $$('.filter-button', filters).forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    renderMenu(button.dataset.category);
  });

  // Galería y lightbox
  const gallery = $('#gallery-grid'), lightbox = $('#lightbox'), lightboxImage = $('#lightbox-image');
  if (gallery) gallery.innerHTML = (cfg.galeria || []).map(item => `<button type="button" class="gallery-item" data-image="${escapeHTML(item.imagen)}" data-alt="${escapeHTML(item.alt)}" aria-label="Ampliar: ${escapeHTML(item.alt)}"><img src="${escapeHTML(item.imagen)}" alt="${escapeHTML(item.alt)}" loading="lazy" onerror="this.closest('button').style.display='none'"><span class="gallery-caption">${escapeHTML(item.texto || item.alt)}</span></button>`).join('');
  function closeLightbox() { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden', 'true'); document.body.classList.remove('no-scroll'); }
  gallery?.addEventListener('click', event => {
    const item = event.target.closest('[data-image]'); if (!item || !lightbox || !lightboxImage) return;
    lightboxImage.src = item.dataset.image; lightboxImage.alt = item.dataset.alt || ''; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll'); $('#lightbox-close')?.focus();
  });
  $('#lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

  // Formulario de reserva: abre WhatsApp con los datos cargados.
  const form = $('#reservation-form'), feedback = $('#form-feedback');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#res-name')?.value.trim(); const phone = $('#res-phone')?.value.trim();
    const date = $('#res-date')?.value; const time = $('#res-time')?.value; const guests = $('#res-guests')?.value;
    const notes = $('#res-notes')?.value.trim();
    if (!name || !phone || !date || !time || !guests) {
      if (feedback) feedback.textContent = 'Completá los campos obligatorios para preparar tu solicitud.';
      return;
    }
    const selectedDate = new Date(`${date}T12:00:00`).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    let message = `Hola, quiero solicitar una reserva en ${cfg.nombre}.\nNombre: ${name}\nTeléfono: ${phone}\nFecha: ${selectedDate}\nHorario: ${time}\nPersonas: ${guests}`;
    if (notes) message += `\nComentarios: ${notes}`;
    if (feedback) feedback.textContent = 'Se abrirá WhatsApp para que envíes la solicitud. La reserva queda pendiente de confirmación del restaurante.';
    window.open(waUrl(message), '_blank', 'noopener,noreferrer');
  });
  const dateInput = $('#res-date');
  if (dateInput) { const today = new Date(); dateInput.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`; }

  // WhatsApp con pedido/consulta desde la carta
  $$('.order-dish').forEach(button => button.addEventListener('click', () => window.open(waUrl(`Hola, quisiera consultar por ${button.dataset.dish || 'la carta'} en ${cfg.nombre}.`), '_blank', 'noopener,noreferrer')));

  // Botón volver arriba
  const backTop = $('#back-to-top');
  const updateBackTop = () => backTop?.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', updateBackTop, { passive: true }); updateBackTop();
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Animaciones discretas al entrar en pantalla
  const revealItems = $$('.section-heading, .dish-card, .story-copy, .story-image-wrap, .gallery-item, .reservation-copy, .reservation-form');
  revealItems.forEach(item => item.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('revealed'));
});

const money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });
const facebookUrl = 'https://www.facebook.com/senvietbuffetbacninh/?locale=vi_VN';

const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'coffee', label: 'Cà phê' },
  { id: 'juice', label: 'Nước ép' },
  { id: 'fruit-tea', label: 'Trà hoa quả' },
  { id: 'milk-tea', label: 'Trà sữa' },
  { id: 'signature', label: 'Đặc trưng' }
];

const menu = [
  { id:'espresso', category:'coffee', name:'Espresso Solo', price:25000, description:'Một shot gọn, crema dày, hậu vị cacao và hạt rang.' },
  { id:'americano', category:'coffee', name:'Americano Trong Veo', price:28000, description:'Espresso kéo dài với nước nóng, nhẹ thân nhưng rõ hương.' },
  { id:'degas-sua-da', category:'coffee', name:'Degas Sữa Đá', price:32000, description:'Cà phê đậm, sữa đặc vừa đủ và đá già giòn.' },
  { id:'bac-xiu', category:'coffee', name:'Bạc Xỉu Ánh Kem', price:35000, description:'Nhiều sữa, một nhịp cà phê và lớp bọt mịn.' },
  { id:'caramel-latte', category:'coffee', name:'Latte Caramel Nâu', price:38000, description:'Espresso, sữa tươi và caramel nấu nhẹ tại quán.' },
  { id:'cam-dua', category:'juice', name:'Cam Dứa Rạng Đông', price:35000, description:'Cam tươi và dứa chín, ép lạnh khi bạn gọi.' },
  { id:'dua-hau-bac-ha', category:'juice', name:'Dưa Hấu Bạc Hà', price:30000, description:'Dưa hấu mọng, bạc hà non và một chút chanh.' },
  { id:'tao-oi', category:'juice', name:'Táo Ổi Xanh', price:38000, description:'Giòn, thơm và thanh mát với hậu vị nhiệt đới.' },
  { id:'chanh-le', category:'juice', name:'Chanh Lê Trong Vườn', price:35000, description:'Lê ngọt tự nhiên cân bằng vị chanh tươi sáng.' },
  { id:'tra-dao', category:'fruit-tea', name:'Trà Đào Múa Hè', price:35000, description:'Đào vàng, trà nhài và lát cam thơm dịu.' },
  { id:'tra-chanh-day', category:'fruit-tea', name:'Trà Chanh Dây Nắng', price:35000, description:'Chanh dây tươi, trà xanh và bạc hà mát.' },
  { id:'tra-vai', category:'fruit-tea', name:'Trà Vải Cánh Hoa', price:38000, description:'Vải ngọt thanh, trà lài và cánh hồng khô.' },
  { id:'tra-dau', category:'fruit-tea', name:'Trà Dâu Hoàng Hôn', price:38000, description:'Dâu đỏ, trà ô long và chanh vàng tươi.' },
  { id:'tra-nhiet-doi', category:'fruit-tea', name:'Trà Nhiệt Đới Degas', price:40000, description:'Xoài, dứa, chanh dây và trà nhài trong một nhịp.' },
  { id:'tra-sua-truyen-thong', category:'milk-tea', name:'Trà Sữa Gấm Nâu', price:30000, description:'Hồng trà đậm, sữa béo vừa và đường nâu thơm.' },
  { id:'tra-sua-oolong', category:'milk-tea', name:'Ô Long Kem Mây', price:35000, description:'Ô long rang, sữa tươi và lớp kem mặn mỏng.' },
  { id:'tra-sua-matcha', category:'milk-tea', name:'Matcha Vũ Điệu', price:38000, description:'Matcha thanh, sữa tươi và chút mật ong.' },
  { id:'tra-sua-caramel', category:'milk-tea', name:'Caramel Trân Châu', price:40000, description:'Trà sữa caramel, trân châu đen nấu trong ngày.' },
  { id:'degas-motion', category:'signature', name:'Degas Motion', price:40000, description:'Espresso, chocolate đen và kem muối—đậm, mượt, dài.' },
  { id:'petrol-cloud', category:'signature', name:'Petrol Cloud', price:40000, description:'Ô long hoa, sữa tươi và lớp kem xanh thực vật tinh tế.' },
  { id:'golden-hour', category:'signature', name:'Golden Hour', price:40000, description:'Trà đào, cam vàng, mật ong và bọt chanh thơm.' }
];

const sizes = [
  { id:'S', add:0, label:'S', note:'Nguyên bản' },
  { id:'M', add:5000, label:'M', note:'+5.000đ' },
  { id:'L', add:10000, label:'L', note:'+10.000đ' }
];

const toppings = [
  { id:'pearls', name:'Trân châu đen', price:5000 },
  { id:'white-pearls', name:'Trân châu trắng', price:5000 },
  { id:'coffee-jelly', name:'Thạch cà phê', price:5000 },
  { id:'salted-cream', name:'Kem muối', price:8000 },
  { id:'fruit', name:'Trái cây thêm', price:8000 }
];

const state = {
  filter: 'all',
  activeProduct: null,
  productQty: 1,
  cart: loadCart()
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function categoryLabel(id) {
  return categories.find(category => category.id === id)?.label || '';
}

function loadCart() {
  try { return JSON.parse(localStorage.getItem('degas-cart')) || []; }
  catch { return []; }
}

function saveCart() {
  // Storage can be blocked or full; keep the in-memory cart usable.
  try { localStorage.setItem('degas-cart', JSON.stringify(state.cart)); }
  catch { /* The cart remains available until the page is reloaded. */ }
}

function renderFilters() {
  const filters = $('[data-menu-filters]');
  filters.innerHTML = categories.map(category => `
    <button class="menu-filter" type="button" data-filter="${category.id}" aria-pressed="${category.id === state.filter}">${category.label}</button>
  `).join('');
}

function renderMenu() {
  const grid = $('[data-menu-grid]');
  const filtered = state.filter === 'all' ? menu : menu.filter(item => item.category === state.filter);
  grid.innerHTML = filtered.map(item => `
    <article class="menu-card" data-menu-item="${item.id}">
      <p class="menu-card__category">${categoryLabel(item.category)}</p>
      <h3>${item.name}</h3>
      <p class="menu-card__description">${item.description}</p>
      <div class="menu-card__bottom">
        <span class="menu-card__price">Từ ${money.format(item.price)}</span>
        <button type="button" data-customize="${item.id}" aria-label="Chọn kích cỡ và topping cho ${item.name}">+</button>
      </div>
    </article>
  `).join('');
  $('[data-visible-count]').textContent = filtered.length;
}

function setFilter(filter) {
  state.filter = filter;
  renderFilters();
  renderMenu();
}

function openProduct(id) {
  const product = menu.find(item => item.id === id);
  if (!product) return;
  state.activeProduct = product;
  state.productQty = 1;
  $('[data-product-category]').textContent = categoryLabel(product.category);
  $('[data-product-name]').textContent = product.name;
  $('[data-product-description]').textContent = product.description;
  $('[data-product-qty]').textContent = '1';
  $('[data-size-options]').innerHTML = sizes.map((size, index) => `
    <label><input type="radio" name="size" value="${size.id}" ${index === 0 ? 'checked' : ''}><span><b>${size.label}</b><small>${size.note}</small></span></label>
  `).join('');
  $('[data-topping-options]').innerHTML = toppings.map(topping => `
    <label><input type="checkbox" name="topping" value="${topping.id}"><span>${topping.name}<b>+${money.format(topping.price)}</b></span></label>
  `).join('');
  updateProductTotal();
  openDialog($('[data-product-dialog]'));
}

function selectedSize() {
  const selected = $('[data-product-form] input[name="size"]:checked');
  return sizes.find(size => size.id === selected?.value) || sizes[0];
}

function selectedToppings() {
  const ids = $$('[data-product-form] input[name="topping"]:checked').map(input => input.value);
  return toppings.filter(topping => ids.includes(topping.id));
}

function currentProductUnitPrice() {
  if (!state.activeProduct) return 0;
  return state.activeProduct.price + selectedSize().add + selectedToppings().reduce((sum, topping) => sum + topping.price, 0);
}

function updateProductTotal() {
  $('[data-product-total]').textContent = money.format(currentProductUnitPrice() * state.productQty);
}

function addActiveProduct() {
  const product = state.activeProduct;
  if (!product) return;
  const size = selectedSize();
  const chosenToppings = selectedToppings();
  const item = {
    key: `${product.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    productId: product.id,
    name: product.name,
    size: size.id,
    toppings: chosenToppings,
    qty: state.productQty,
    unitPrice: product.price + size.add + chosenToppings.reduce((sum, topping) => sum + topping.price, 0)
  };
  state.cart.push(item);
  saveCart();
  updateCartUI();
  closeDialog($('[data-product-dialog]'));
  showToast(`Đã thêm ${product.name} vào đơn`);
}

function itemDescription(item) {
  const toppingText = item.toppings.length ? ` · ${item.toppings.map(topping => topping.name).join(', ')}` : '';
  return `Size ${item.size}${toppingText}`;
}

function cartSubtotal() {
  return state.cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
}

function deliveryFee() {
  const form = $('[data-checkout-form]');
  const fulfillment = form?.elements.fulfillment?.value;
  return fulfillment === 'delivery' ? Number(form.elements.distance.value) : 0;
}

function renderCartItems() {
  const items = $('[data-cart-items]');
  const empty = $('[data-cart-empty]');
  const submit = $('.checkout-submit');
  empty.hidden = state.cart.length > 0;
  submit.disabled = state.cart.length === 0;
  items.innerHTML = state.cart.map(item => `
    <article class="cart-item">
      <div><h4>${item.name}</h4><p>${itemDescription(item)}</p></div>
      <div class="cart-item__price">${money.format(item.unitPrice * item.qty)}
        <div class="cart-item__actions">
          <button type="button" data-cart-minus="${item.key}" aria-label="Giảm ${item.name}">−</button>
          <span aria-label="Số lượng">${item.qty}</span>
          <button type="button" data-cart-plus="${item.key}" aria-label="Tăng ${item.name}">+</button>
          <button type="button" data-cart-remove="${item.key}" aria-label="Xóa ${item.name}">Xóa</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderTotals() {
  const subtotal = cartSubtotal();
  const fee = deliveryFee();
  $('[data-cart-totals]').innerHTML = `
    <div class="cart-total-line"><span>Tạm tính</span><b>${money.format(subtotal)}</b></div>
    <div class="cart-total-line"><span>Phí giao hàng</span><b>${fee ? money.format(fee) : 'Miễn phí'}</b></div>
    <div class="cart-total-line cart-total-line--grand"><span>Tổng dự kiến</span><b>${money.format(subtotal + fee)}</b></div>
  `;
}

function updateCartUI() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  $$('[data-cart-count]').forEach(element => { element.textContent = count; });
  const trigger = $('.cart-trigger');
  if (trigger) trigger.setAttribute('aria-label', `Mở đơn hàng, ${count} món`);
  renderCartItems();
  renderTotals();
}

function changeCartQuantity(key, delta) {
  const item = state.cart.find(entry => entry.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.cart = state.cart.filter(entry => entry.key !== key);
  saveCart();
  updateCartUI();
}

function removeCartItem(key) {
  state.cart = state.cart.filter(entry => entry.key !== key);
  saveCart();
  updateCartUI();
}

function buildOrderText(form) {
  const data = new FormData(form);
  const isDelivery = data.get('fulfillment') === 'delivery';
  const lines = [
    'DEGAS COFFEE — ĐƠN TẠM',
    '——————————————',
    ...state.cart.map((item, index) => `${index + 1}. ${item.name} × ${item.qty}\n   ${itemDescription(item)}\n   ${money.format(item.unitPrice * item.qty)}`),
    '——————————————',
    `Tạm tính: ${money.format(cartSubtotal())}`,
    `Phí giao hàng: ${deliveryFee() ? money.format(deliveryFee()) : 'Miễn phí'}`,
    `TỔNG DỰ KIẾN: ${money.format(cartSubtotal() + deliveryFee())}`,
    '',
    `Khách hàng: ${data.get('customerName')}`,
    `Điện thoại: ${data.get('phone')}`,
    `Nhận món: ${isDelivery ? 'Giao hàng' : 'Nhận tại quán'}`
  ];
  if (isDelivery) {
    const distanceText = form.elements.distance.options[form.elements.distance.selectedIndex].text;
    lines.push(`Địa chỉ: ${data.get('address')}`, `Khoảng cách: ${distanceText}`);
  }
  if (data.get('note')) lines.push(`Ghi chú: ${data.get('note')}`);
  lines.push('', 'Vui lòng xác nhận đơn và thời gian chuẩn bị giúp mình.');
  return lines.join('\n');
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
}

function showToast(message) {
  const toast = $('[data-toast]');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function setupAudio() {
  const audio = $('[data-ambient-audio]');
  const buttons = $$('.sound-toggle, [data-sound-invite]');
  const invite = $('[data-sound-invite]');
  const inviteLabel = $('[data-sound-invite-label]');
  audio.volume = .22;

  const setPlayingUI = (playing, blocked = false) => {
    $('.sound-toggle').classList.toggle('is-playing', playing);
    $('.sound-toggle').setAttribute('aria-pressed', String(playing));
    $('.sound-toggle').setAttribute('aria-label', playing ? 'Tạm dừng nhạc nền' : 'Bật nhạc nền');
    invite.classList.toggle('is-playing', playing);
    invite.setAttribute('aria-pressed', String(playing));
    inviteLabel.textContent = playing
      ? 'Nhạc đang phát · chạm để tạm dừng'
      : blocked ? 'Chạm để bật không gian âm nhạc' : 'Phát lại không gian Degas';
  };

  const startAudio = async (announce = false) => {
    try {
      await audio.play();
      setPlayingUI(true);
      if (announce) showToast('Đã bật nhạc nền');
      return true;
    } catch {
      setPlayingUI(false, true);
      return false;
    }
  };

  buttons.forEach(button => button.addEventListener('click', async () => {
    if (audio.paused) {
      const started = await startAudio(true);
      if (!started) showToast('Chạm lại để trình duyệt cho phép phát nhạc');
    } else { audio.pause(); setPlayingUI(false); }
  }));
  audio.addEventListener('play', () => setPlayingUI(true));
  audio.addEventListener('pause', () => setPlayingUI(false));

  const unlockOnFirstInteraction = async event => {
    if (event.target.closest('.sound-toggle, [data-sound-invite]')) return;
    if (await startAudio()) {
      removeEventListener('pointerdown', unlockOnFirstInteraction, true);
      removeEventListener('keydown', unlockOnFirstInteraction, true);
    }
  };

  startAudio().then(started => {
    if (!started) {
      addEventListener('pointerdown', unlockOnFirstInteraction, true);
      addEventListener('keydown', unlockOnFirstInteraction, true);
    }
  });
}

function setupScrollEffects() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
    });
  }, { threshold: .12 });
  $$('[data-reveal]').forEach(element => reveal.observe(element));

  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    $('.scroll-progress span').style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    $('[data-header]').classList.toggle('is-scrolled', y > 40);
    if (!reduced) {
      document.documentElement.style.setProperty('--hero-y', `${Math.min(y * .09, 85)}px`);
      const signature = $('.signature');
      if (signature) {
        const rect = signature.getBoundingClientRect();
        const progress = (innerHeight - rect.top) / (innerHeight + rect.height);
        document.documentElement.style.setProperty('--signature-y', `${(progress - .5) * 45}px`);
      }
      $$('.bean').forEach((bean, index) => bean.style.setProperty('--bean-y', `${y * (.04 + index * .018)}px`));
    }
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive:true });
  update();
}

function setupNavigation() {
  const toggle = $('.nav-toggle');
  const nav = $('.primary-nav');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  $$('.primary-nav a').forEach(link => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open');
  }));
}

// Older mobile browsers do not implement HTMLDialogElement.showModal.
let fallbackDialog = null;
let dialogOpener = null;
let dialogBackdrop = null;
let dialogBackground = [];

function openDialog(dialog) {
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialogOpener = document.activeElement;
    fallbackDialog = dialog;
    dialogBackdrop = document.createElement('div');
    dialogBackdrop.className = 'dialog-backdrop';
    dialogBackdrop.addEventListener('click', () => closeDialog(dialog));
    document.body.appendChild(dialogBackdrop);
    dialog.setAttribute('open', '');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('tabindex', '-1');
    dialog.classList.add('dialog-fallback');
    (dialog.querySelector('button, input, select, textarea, [tabindex="0"]') || dialog).focus();
    dialogBackground = [...document.body.children]
      .filter(element => element !== dialog && element !== dialogBackdrop)
      .map(element => {
        const previous = element.getAttribute('aria-hidden');
        element.setAttribute('aria-hidden', 'true');
        return [element, previous];
      });
  }
  document.body.classList.add('dialog-open');
}

function closeDialog(dialog) {
  if (dialog !== fallbackDialog) {
    dialog.close();
    return;
  }
  dialog.removeAttribute('open');
  dialog.removeAttribute('aria-modal');
  dialog.classList.remove('dialog-fallback');
  dialogBackdrop.remove();
  dialogBackground.forEach(([element, previous]) => {
    if (previous === null) element.removeAttribute('aria-hidden');
    else element.setAttribute('aria-hidden', previous);
  });
  fallbackDialog = null;
  document.body.classList.remove('dialog-open');
  if (dialogOpener && dialogOpener.isConnected) dialogOpener.focus();
}

function setupDialogs() {
  document.addEventListener('focusin', event => {
    if (fallbackDialog && !fallbackDialog.contains(event.target)) fallbackDialog.focus();
  });
  document.addEventListener('keydown', event => {
    if (!fallbackDialog) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialog(fallbackDialog);
    } else if (event.key === 'Tab') {
      const controls = [...fallbackDialog.querySelectorAll('button, input, select, textarea, a[href], [tabindex]')]
        .filter(element => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first) { event.preventDefault(); fallbackDialog.focus(); }
      else if (event.shiftKey && (document.activeElement === first || document.activeElement === fallbackDialog)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === fallbackDialog)) {
        event.preventDefault(); first.focus();
      }
    }
  });
  const productDialog = $('[data-product-dialog]');
  const cartDialog = $('[data-cart-dialog]');
  [productDialog, cartDialog].forEach(dialog => {
    dialog.querySelectorAll('form[method="dialog"]').forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        closeDialog(dialog);
      });
    });
    dialog.addEventListener('close', () => {
      if (!productDialog.open && !cartDialog.open) document.body.classList.remove('dialog-open');
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });
  $$('[data-open-cart]').forEach(button => button.addEventListener('click', () => {
    updateCartUI(); openDialog(cartDialog);
  }));
  $('[data-close-to-menu]').addEventListener('click', () => {
    closeDialog(cartDialog); $('#menu').scrollIntoView({ behavior:'smooth' });
  });
}

document.addEventListener('click', event => {
  const filter = event.target.closest('[data-filter]');
  if (filter) setFilter(filter.dataset.filter);
  const customize = event.target.closest('[data-customize]');
  if (customize) openProduct(customize.dataset.customize);
  const quickAdd = event.target.closest('[data-quick-add]');
  if (quickAdd) openProduct(quickAdd.dataset.quickAdd);
  const minus = event.target.closest('[data-cart-minus]');
  if (minus) changeCartQuantity(minus.dataset.cartMinus, -1);
  const plus = event.target.closest('[data-cart-plus]');
  if (plus) changeCartQuantity(plus.dataset.cartPlus, 1);
  const remove = event.target.closest('[data-cart-remove]');
  if (remove) removeCartItem(remove.dataset.cartRemove);
});

$('[data-product-form]').addEventListener('change', updateProductTotal);
$('[data-product-form]').addEventListener('submit', event => { event.preventDefault(); addActiveProduct(); });
$('[data-qty-minus]').addEventListener('click', () => { state.productQty = Math.max(1, state.productQty - 1); $('[data-product-qty]').textContent = state.productQty; updateProductTotal(); });
$('[data-qty-plus]').addEventListener('click', () => { state.productQty = Math.min(20, state.productQty + 1); $('[data-product-qty]').textContent = state.productQty; updateProductTotal(); });

$('[data-checkout-form]').addEventListener('change', event => {
  const form = event.currentTarget;
  const delivery = form.elements.fulfillment.value === 'delivery';
  $('[data-delivery-fields]').hidden = !delivery;
  form.elements.address.required = delivery;
  renderTotals();
});

$('[data-checkout-form]').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!state.cart.length || !form.reportValidity()) return;
  const order = buildOrderText(form);
  const facebookWindow = window.open(facebookUrl, '_blank', 'noopener');
  try {
    await copyText(order);
    showToast('Đã sao chép đơn — hãy dán vào khung chat Facebook');
  } catch {
    showToast('Không thể sao chép tự động — vui lòng thử lại');
  }
  if (!facebookWindow) window.location.href = facebookUrl;
});

window.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderMenu();
  updateCartUI();
  setupAudio();
  setupScrollEffects();
  setupNavigation();
  setupDialogs();
  $('[data-year]').textContent = new Date().getFullYear();
  setTimeout(() => $('.loader').classList.add('is-hidden'), 850);
});

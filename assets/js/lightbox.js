(() => {
  const images = Array.from(document.querySelectorAll('.gallery figure img'));
  if (!images.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'image-lightbox';
  dialog.setAttribute('aria-label', 'Visualização ampliada da imagem');
  dialog.innerHTML = `
    <button class="image-lightbox__close" type="button" aria-label="Fechar imagem ampliada">×</button>
    <button class="image-lightbox__nav image-lightbox__nav--previous" type="button" aria-label="Imagem anterior">‹</button>
    <button class="image-lightbox__nav image-lightbox__nav--next" type="button" aria-label="Próxima imagem">›</button>
    <div class="image-lightbox__stage">
      <img class="image-lightbox__image" alt="">
    </div>
    <div class="image-lightbox__details" aria-live="polite">
      <span class="image-lightbox__caption"></span>
      <span class="image-lightbox__hint">Clique na imagem para alternar entre ajuste à tela e zoom</span>
      <span class="image-lightbox__counter"></span>
    </div>`;
  document.body.appendChild(dialog);

  const closeButton = dialog.querySelector('.image-lightbox__close');
  const previousButton = dialog.querySelector('.image-lightbox__nav--previous');
  const nextButton = dialog.querySelector('.image-lightbox__nav--next');
  const stage = dialog.querySelector('.image-lightbox__stage');
  const expandedImage = dialog.querySelector('.image-lightbox__image');
  const caption = dialog.querySelector('.image-lightbox__caption');
  const counter = dialog.querySelector('.image-lightbox__counter');
  let lastFocused = null;
  let currentIndex = 0;

  const labelFor = (image) => {
    const figureCaption = image.closest('figure')?.querySelector('figcaption');
    const coverLabel = image.closest('.cover')?.querySelector('.cover-label');
    return figureCaption?.textContent.trim() || coverLabel?.textContent.trim() || image.alt || 'Imagem do projeto';
  };

  const closeLightbox = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    dialog.classList.remove('is-original');
    expandedImage.style.width = '';
    expandedImage.style.height = '';
    document.body.classList.remove('lightbox-open');
    if (lastFocused) lastFocused.focus();
  };

  const showImage = (index) => {
    currentIndex = (index + images.length) % images.length;
    const image = images[currentIndex];
    expandedImage.src = image.currentSrc || image.src;
    expandedImage.alt = image.alt;
    caption.textContent = labelFor(image);
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
    dialog.classList.remove('is-original');
    expandedImage.style.width = '';
    expandedImage.style.height = '';
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
  };

  const openLightbox = (image) => {
    lastFocused = image;
    showImage(images.indexOf(image));
    document.body.classList.add('lightbox-open');
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    closeButton.focus();
  };

  images.forEach((image) => {
    image.classList.add('lightbox-trigger');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${labelFor(image)} — abrir imagem ampliada`);
    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  expandedImage.addEventListener('click', () => {
    const shouldZoom = !dialog.classList.contains('is-original');
    if (shouldZoom) {
      const fittedWidth = expandedImage.getBoundingClientRect().width;
      const zoomedWidth = Math.ceil(Math.max(fittedWidth * 1.8, expandedImage.naturalWidth));
      dialog.classList.add('is-original');
      expandedImage.style.width = `${zoomedWidth}px`;
      expandedImage.style.height = 'auto';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          stage.scrollTo({
            left: Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2),
            top: Math.max(0, (stage.scrollHeight - stage.clientHeight) / 2)
          });
        });
      });
    } else {
      dialog.classList.remove('is-original');
      expandedImage.style.width = '';
      expandedImage.style.height = '';
      stage.scrollTo({ left: 0, top: 0 });
    }
  });
  previousButton.addEventListener('click', () => showImage(currentIndex - 1));
  nextButton.addEventListener('click', () => showImage(currentIndex + 1));
  closeButton.addEventListener('click', closeLightbox);
  stage.addEventListener('click', (event) => {
    if (event.target === stage) closeLightbox();
  });
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeLightbox();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showImage(currentIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(currentIndex + 1);
    }
  });
  dialog.addEventListener('close', () => {
    dialog.classList.remove('is-original');
    document.body.classList.remove('lightbox-open');
  });
})();

const container = document.getElementById('scrollbar-area')!;
const header = document.getElementById('header')!;
const footer = document.getElementById('footer')!;

container.addEventListener('scroll', () => {
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight;
  const clientHeight = container.clientHeight;

  if (scrollTop === 0 || scrollTop + clientHeight >= scrollHeight) {
    footer.classList.add('visible');
    footer.classList.remove('hidden');
  } else {
    footer.classList.add('hidden');
    footer.classList.remove('visible');
  }
});

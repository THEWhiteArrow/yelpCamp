const loadDiv = document.querySelector('#load');

window.addEventListener('load', () => {

   loadDiv.style.opacity = '0';
   setTimeout(() => {
      loadDiv.remove();
   }, 500);
});
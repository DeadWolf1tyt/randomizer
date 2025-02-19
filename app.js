// регистрация serviceWorker 2 варианта
// вариант 1
// if ('serviceWorker' in navigator) { // это можно записать так if (navigator.serviceWorker)
//   navigator.serviceWorker.register('sw.js') // здесь мы регистрируем serviceWorker и указываем путь к файлу
//     .then(() => console.log("Service Worker зарегистрирован"))
//     .catch(() => console.log("Ошибка"));
// }

// вариант 2
// это можно записать через асинхронную функцию
window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('sw.js'); // пишем регистрацию через const для того чтобы в консоль вывесть обьект регистрации ServiceWorkerRegistration
      console.log('Зарегестрированно', reg);
    } catch (e) {
      console.log('Ошибка');
    }
  }
  // await loadPosts(); // для запуска дополнительного контента не из стаичных файлов, таких ка index.html
})


// вариант 3
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('sw.js')
//     .then(event => {
//       console.log('Service worker registered', event); //event вернет в консоль объект ServiceWorkerRegistration
//     });
// }

//дальнейший код приведен в качестве примера, он не обязяательный, используется если контент добовляется из другого места не из index.html
// async function loadPosts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11');
//   const data = await res.json();

//   const container = document.querySelector('#posts');
//   container.innerHTML = data.map(toCard).join('\n');
// }


// function toCard(post) {
//   return `
//     <div class="card">
//       <div class="card-title">
//         ${post.title}
//       </div>
//       <div class="card-body">
//         ${post.body}
//       </div>
//     </div>
//   `
// }
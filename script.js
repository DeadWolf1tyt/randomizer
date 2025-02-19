//рандомайзер

const cardContainer = document.getElementById('card-container'); 
      const startButton = document.getElementById('startButton');
      const participantsModal = document.getElementById('participantsModal'); 
      const cardsModal = document.getElementById('cardsModal');
      const participantsSubmit = document.getElementById('participantsSubmit');
      const cardsSubmit = document.getElementById('cardsSubmit');
      const numParticipantsInput = document.getElementById('numParticipants'); 
      const numVictimsInput = document.getElementById('numVictims');
      const numLuckyInput = document.getElementById('numLucky');
      let numParticipants = 0;
      let numVictims = 0;
      let numLucky = 0; 
      
      // Функция для отображения модального окна
      function showModal(modal) {
        modal.style.display = 'flex'; 
      }
      
      // Функция для скрытия модального окна 
      function hideModal(modal) { 
        modal.style.display = 'none'; 
      }
      
      // Обработчик для кнопки "Начать" 
      startButton.addEventListener('click', () => { showModal(participantsModal); });
      
      // Обработчик для кнопки "Подтвердить" в модальном окне участников
      participantsSubmit.addEventListener('click', () => { numParticipants = parseInt(numParticipantsInput.value); 
        if (isNaN(numParticipants) || numParticipants <= 0) { 
          alert('Пожалуйста, введите корректное количество участников.'); 
          return; 
        } 
        hideModal(participantsModal); 
        showModal(cardsModal); 
      });
      
      // Обработчик для кнопки "Подтвердить" в модальном окне карт 
      cardsSubmit.addEventListener('click', () => { 
        numVictims = parseInt(numVictimsInput.value);
        numLucky = parseInt(numLuckyInput.value);
        if (isNaN(numVictims) || isNaN(numLucky) || numVictims < 0 || numLucky < 0) { 
          alert('Пожалуйста, введите корректное количество карт.');
          return;
        }
        if (numVictims + numLucky !== numParticipants) { 
          alert('Сумма карт "Жертва" и "Счастливчик" должна быть равна количеству участников.');
          return;
        }
        hideModal(cardsModal); 
        generateCards();
      });
      // Функция для генерации карт 
      function generateCards() {
        cardContainer.innerHTML = '';
        // Очищаем контейнер
        const cardTypes = [];
        for (let i = 0; i < numVictims; i++) {
          cardTypes.push('Жертва');
        }
        for (let i = 0; i < numLucky; i++) {
          cardTypes.push('Счастливчик');
        } 
        
        // Перемешиваем массив типов карт 
        shuffleArray(cardTypes);
        for (let i = 0; i < numParticipants; i++) {
          const card = document.createElement('div');
          card.classList.add('card');
          const cardFront = document.createElement('div'); 
          cardFront.classList.add('card-front');
          cardFront.textContent = '?';
          const cardBack = document.createElement('div'); 
          cardBack.classList.add('card-back'); 
          cardBack.textContent = cardTypes[i];
          
          // Назначение типа карты 
          card.appendChild(cardFront);
          card.appendChild(cardBack); 
          card.addEventListener('click', () => { 
            card.classList.add('revealed');
          });
           cardContainer.appendChild(card);
        }
      }
      
      // Функция для перемешивания массива (Fisher-Yates shuffle)
      function shuffleArray(array) { 
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      
      // При загрузке страницы показываем первое модальное окно 
      showModal(participantsModal);
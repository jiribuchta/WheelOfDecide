const wheel = document.querySelector('.wheel');
const spinButton = document.getElementById('spin-button');
const resultElement = document.getElementById('result');
const segments = document.querySelectorAll('.segment');
const numSegments = segments.length;
const degreesPerSegment = 360 / numSegments;
let spinning = false;

spinButton.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    resultElement.textContent = '';

    // Generuj náhodné otočení (více otáček + náhodný úhel)
    const extraSpins = 3; // Počet celých otočení
    const randomDegree = 241 + Math.random()*58;
    const totalDegrees = extraSpins * 360 + randomDegree;

    // Nastav přechod pro animaci
    wheel.style.transition = 'transform 5s cubic-bezier(0.1, 0.7, 0.1, 1)';

    // Otoč kolo
    wheel.style.transform = `rotate(${totalDegrees}deg)`;

    // Po skončení animace urči výsledek
    setTimeout(() => {
        wheel.style.transition = 'none'; // Odstraň přechod pro okamžité nastavení do finální pozice
        const finalRotation = totalDegrees % 360;
        const winningSegmentIndex = (Math.floor((360 - finalRotation) / degreesPerSegment) % numSegments)-1;
        const winningSegmentText = segments[winningSegmentIndex].textContent;
        handleWin(winningSegmentText); // Zavolej funkci pro zobrazení výhry
        spinning = false;

        // TODO vyřeš co se stane po konci točení a přidej konfety

    }, 5000); // Doba trvání animace (musí odpovídat CSS přechodu)
});

const winNotification = document.getElementById('winNotification');

function showWinNotification(itemName) {
  winNotification.classList.add('show');
  // Volitelně přidat třídu pro animaci obsahu
  setTimeout(() => {
    document.querySelector('.popup-content').classList.add('show');
    shootConfetti();
  }, 50);
}

function hideWinNotification() {
  winNotification.classList.remove('show');
  document.querySelector('.popup-content').classList.remove('show');
}

// Příklad, jak zobrazit notifikaci s názvem výhry
// Tuto funkci zavolej ve svém kódu, když uživatel něco vyhraje
function handleWin(wonItem) {
  showWinNotification(wonItem);
}

function shootConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
  
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
  
      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }
  
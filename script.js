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
        resultElement.textContent = `Vyhrál jsi: ${winningSegmentText}!`;
        spinning = false;

        // TODO vyřeš co se stane po konci točení a přidej konfety

    }, 5000); // Doba trvání animace (musí odpovídat CSS přechodu)
});
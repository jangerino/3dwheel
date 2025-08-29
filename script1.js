// let container = document.querySelector(".container");
// let spinBtn = document.getElementById("spin");
// let result = document.getElementById("result");




// // Призы и их вероятности
// const prizes = [
//     { name: "Приз 1", chance: 10 },
//     { name: "Приз 2", chance: 10 },
//     { name: "Приз 3", chance: 10 },
//     { name: "Приз 4", chance: 10 },
//     { name: "Ничего", chance: 0 }
// ];

// let rotationDegrees = 0;

// // Создание секторов колеса
// function createSectors() {
//     const numPrizes = prizes.length;
//     const angle = 360 / numPrizes;
//     let currentAngle = 0;

//     prizes.forEach((prize) => {
//         const sector = document.createElement("div");
//         sector.classList.add("sector");
//         sector.style.transformOrigin = "50% 100%";
//         sector.style.transform = `rotate(${currentAngle}deg)`;
//         sector.style.width = '100%';
//         sector.style.height = '50%';
//         sector.style.position = 'absolute';
//         sector.style.top = '0';
//         sector.style.left = '0';
//         sector.style.textAlign = 'center';
//         sector.style.lineHeight = '150px';

//         const prizeText = document.createElement("span");
//         prizeText.textContent = prize.name;

//         if (prize.name === "Приз 2" || prize.name === "Приз 3") {
//             prizeText.style.transform = "rotate(180deg)";
//             prizeText.style.display = "inline-block";
//         }

//         sector.appendChild(prizeText);

//         const hue = (currentAngle / 360) * 360;
//         sector.style.backgroundColor = `hsl(${hue})`;

//         container.appendChild(sector);
//         currentAngle += angle;
//     });
// }

// // Выбор приза на основе вероятностей
// function choosePrize() {
//     const randomNumber = Math.random() * 100;
//     let cumulativeChance = 0;

//     for (let i = 0; i < prizes.length; i++) {
//         cumulativeChance += prizes[i].chance;
//         if (randomNumber <= cumulativeChance) {
//             return prizes[i];
//         }
//     }
//     return prizes[prizes.length - 1];
// }

// // Функция вращения колеса
// function spinWheel() {
//     spinBtn.disabled = true;
//     const winningPrize = choosePrize();
//     const numPrizes = prizes.length;
//     const winningIndex = prizes.findIndex(prize => prize.name === winningPrize.name);
//     const anglePerPrize = 360 / numPrizes;

//     const stopAngle = 360 * 5 + (360 - winningIndex * anglePerPrize) - anglePerPrize / 2 + (Math.random() * anglePerPrize);

//     container.style.transition = 'transform 5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//     container.style.transform = `rotate(${stopAngle}deg)`;

//     setTimeout(() => {
//         container.style.transition = 'none';
//         container.style.transform = `rotate(${stopAngle % 360}deg)`;
//         result.textContent = "";
//         alert(`Вы выиграли: ${winningPrize.name}`);

     

//         // Запрещаем повторный запуск
//         spinBtn.disabled = false;
//     }, 5000);
// }



//     spinBtn.addEventListener('click', spinWheel);

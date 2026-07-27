// // 01c5f08129a6474d9b865906262707


// fetch(`https://api.weatherapi.com/v1/current.json?key=${"01c5f08129a6474d9b865906262707"}&q=${"jammu"}&aqi=no`)

// .then(function(raw){
//     if(!raw.ok){
//         throw new error("failed");
//     }
//     return raw.json();
// })
// .then(function(data){
//     console.log(data);
// }).catch(function(error){
//     console.log(error);
// })
let dashboard = document.querySelector(".dashboard");
let rightbar=document.createElement("div");
let form = document.querySelector("#form");
let search = document.querySelector("#search");
let city = document.querySelector("#city");
search.addEventListener("click", function (e) {


    e.stopPropagation();
    form.classList.toggle("open");

})
document.querySelector("body").addEventListener("click", function (e) {
    if (!form.contains(e.target) && e.target !== search && form.classList.contains("open")) {
        form.classList.toggle("open")
    }
})

form.addEventListener("submit", function (dets) {
    dets.preventDefault();
    console.log(city.value);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${"01c5f08129a6474d9b865906262707"}&q=${city.value}&aqi=no`)
        .then(function (raw) {
            if (!raw.ok) {
                throw new error("fuck off");
            }
            return raw.json();
        })
        .then((data) => {
            
            console.log(data);
            rightbar.innerHTML="";
            
            // Simple version - plain document.createElement, line by line, no functions

            // ---------- Aside container ----------
            const aside = document.createElement('aside');
            aside.className = 'rightbar';
            

            // ---------- Current weather card ----------
            const currentCard = document.createElement('div');
            currentCard.className = 'current-card';

            // Location line with pin icon
            const location = document.createElement('p');
            location.className = 'current-card__location';

            const pinSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            pinSvg.setAttribute('viewBox', '0 0 24 24');
            pinSvg.setAttribute('fill', 'none');
            pinSvg.setAttribute('stroke', 'currentColor');
            pinSvg.setAttribute('stroke-width', '1.8');
            pinSvg.setAttribute('stroke-linecap', 'round');
            pinSvg.setAttribute('stroke-linejoin', 'round');

            const pinPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pinPath.setAttribute('d', 'M12 21s7-6.6 7-12a7 7 0 10-14 0c0 5.4 7 12 7 12z');

            const pinCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pinCircle.setAttribute('cx', '12');
            pinCircle.setAttribute('cy', '9');
            pinCircle.setAttribute('r', '2.3');

            pinSvg.appendChild(pinPath);
            pinSvg.appendChild(pinCircle);

            location.appendChild(pinSvg);
            location.appendChild(document.createTextNode(`${data.location.name},${data.location.region}`));

            // Temperature
            const temp = document.createElement('p');
            temp.className = 'current-card__temp';
            temp.appendChild(document.createTextNode(`${data.current.temp_c}`));

            const tempUnit = document.createElement('span');
            tempUnit.textContent = '°C';
            temp.appendChild(tempUnit);

            // Stats row (wind, rain chance, wind again)
            const stats = document.createElement('div');
            stats.className = 'current-card__stats';

            // Stat 1: wind icon + 19 mph
            const stat1 = document.createElement('span');
            const windSvg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            windSvg1.setAttribute('viewBox', '0 0 24 24');
            windSvg1.setAttribute('fill', 'none');
            windSvg1.setAttribute('stroke', 'currentColor');
            windSvg1.setAttribute('stroke-width', '1.8');
            windSvg1.setAttribute('stroke-linecap', 'round');
            const windPath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            windPath1.setAttribute('d', 'M3 8h11a3 3 0 10-3-3M3 16h14a3 3 0 11-3 3M3 12h9');
            windSvg1.appendChild(windPath1);
            stat1.appendChild(windSvg1);
            stat1.appendChild(document.createTextNode(`${data.current.wind_mph}mph`));

            // Stat 2: raindrop icon + 40%
            const stat2 = document.createElement('span');
            const dropSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            dropSvg.setAttribute('viewBox', '0 0 24 24');
            dropSvg.setAttribute('fill', 'none');
            dropSvg.setAttribute('stroke', 'currentColor');
            dropSvg.setAttribute('stroke-width', '1.8');
            dropSvg.setAttribute('stroke-linecap', 'round');
            dropSvg.setAttribute('stroke-linejoin', 'round');
            const dropPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            dropPath.setAttribute('d', 'M12 2.5s6 7.2 6 11.5A6 6 0 016 14C6 9.7 12 2.5 12 2.5z');
            dropSvg.appendChild(dropPath);
            stat2.appendChild(dropSvg);
            stat2.appendChild(document.createTextNode(`${data.current.chance_of_rain}%`));

            // Stat 3: wind icon (same as stat 1) + 15km/h
            const stat3 = document.createElement('span');
            const windSvg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            windSvg2.setAttribute('viewBox', '0 0 24 24');
            windSvg2.setAttribute('fill', 'none');
            windSvg2.setAttribute('stroke', 'currentColor');
            windSvg2.setAttribute('stroke-width', '1.8');
            windSvg2.setAttribute('stroke-linecap', 'round');
            const windPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            windPath2.setAttribute('d', 'M3 8h11a3 3 0 10-3-3M3 16h14a3 3 0 11-3 3M3 12h9');
            windSvg2.appendChild(windPath2);
            stat3.appendChild(windSvg2);
            stat3.appendChild(document.createTextNode(`${data.current.wind_kph} KM/Hr`));

            stats.appendChild(stat1);
            stats.appendChild(stat2);
            stats.appendChild(stat3);

            currentCard.appendChild(location);
            currentCard.appendChild(temp);
            currentCard.appendChild(stats);

            // ---------- City list ----------
            // const cityList = document.createElement('ul');
            // cityList.className = 'city-list';

            // // --- City 1: North Jakarta ---
            // const city1 = document.createElement('li');
            // city1.className = 'city-card';
            // city1.setAttribute('data-city', 'North Jakarta');

            // const city1Info = document.createElement('div');
            // city1Info.className = 'city-card__info';

            // const city1Country = document.createElement('p');
            // city1Country.className = 'city-card__country';
            // city1Country.textContent = 'Indonesia';

            // const city1Name = document.createElement('p');
            // city1Name.className = 'city-card__name';
            // city1Name.textContent = 'North Jakarta';

            // const city1Desc = document.createElement('p');
            // city1Desc.className = 'city-card__desc';
            // city1Desc.textContent = 'Mostly Sunny';

            // city1Info.appendChild(city1Country);
            // city1Info.appendChild(city1Name);
            // city1Info.appendChild(city1Desc);

            // const city1Temp = document.createElement('div');
            // city1Temp.className = 'city-card__temp';
            // city1Temp.appendChild(document.createTextNode('12° '));

            // const city1Svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            // city1Svg.setAttribute('class', 'w-icon');
            // city1Svg.setAttribute('viewBox', '0 0 24 24');
            // city1Svg.setAttribute('fill', 'currentColor');

            // const city1Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            // city1Circle.setAttribute('cx', '8');
            // city1Circle.setAttribute('cy', '8');
            // city1Circle.setAttribute('r', '3');
            // city1Circle.setAttribute('opacity', '0.9');

            // const city1Path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // city1Path.setAttribute('d', 'M9 19a5 5 0 01-.5-9.98A6 6 0 0120 10a4.3 4.3 0 01-1 9H9z');

            // city1Svg.appendChild(city1Circle);
            // city1Svg.appendChild(city1Path);
            // city1Temp.appendChild(city1Svg);

            // city1.appendChild(city1Info);
            // city1.appendChild(city1Temp);

            // // --- City 2: Bandung ---
            // const city2 = document.createElement('li');
            // city2.className = 'city-card city-card--alt';
            // city2.setAttribute('data-city', 'Bandung');

            // const city2Info = document.createElement('div');
            // city2Info.className = 'city-card__info';

            // const city2Country = document.createElement('p');
            // city2Country.className = 'city-card__country';
            // city2Country.textContent = 'Indonesia';

            // const city2Name = document.createElement('p');
            // city2Name.className = 'city-card__name';
            // city2Name.textContent = 'Bandung';

            // const city2Desc = document.createElement('p');
            // city2Desc.className = 'city-card__desc';
            // city2Desc.textContent = 'Cloudy';

            // city2Info.appendChild(city2Country);
            // city2Info.appendChild(city2Name);
            // city2Info.appendChild(city2Desc);

            // const city2Temp = document.createElement('div');
            // city2Temp.className = 'city-card__temp';
            // city2Temp.appendChild(document.createTextNode('10° '));

            // const city2Svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            // city2Svg.setAttribute('class', 'w-icon');
            // city2Svg.setAttribute('viewBox', '0 0 24 24');
            // city2Svg.setAttribute('fill', 'currentColor');

            // const city2Path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // city2Path.setAttribute('d', 'M7 18a5 5 0 01-.6-9.96A6 6 0 0118 10a4.5 4.5 0 01-1 8H7z');

            // city2Svg.appendChild(city2Path);
            // city2Temp.appendChild(city2Svg);

            // city2.appendChild(city2Info);
            // city2.appendChild(city2Temp);

            // // --- City 3: South Jakarta ---
            // const city3 = document.createElement('li');
            // city3.className = 'city-card';
            // city3.setAttribute('data-city', 'South Jakarta');

            // const city3Info = document.createElement('div');
            // city3Info.className = 'city-card__info';

            // const city3Country = document.createElement('p');
            // city3Country.className = 'city-card__country';
            // city3Country.textContent = 'Indonesia';

            // const city3Name = document.createElement('p');
            // city3Name.className = 'city-card__name';
            // city3Name.textContent = 'South Jakarta';

            // const city3Desc = document.createElement('p');
            // city3Desc.className = 'city-card__desc';
            // city3Desc.textContent = 'Sunny';

            // city3Info.appendChild(city3Country);
            // city3Info.appendChild(city3Name);
            // city3Info.appendChild(city3Desc);

            // const city3Temp = document.createElement('div');
            // city3Temp.className = 'city-card__temp';
            // city3Temp.appendChild(document.createTextNode('14° '));

            // const city3Svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            // city3Svg.setAttribute('class', 'w-icon');
            // city3Svg.setAttribute('viewBox', '0 0 24 24');
            // city3Svg.setAttribute('fill', 'currentColor');

            // const city3Path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // city3Path.setAttribute('d', 'M7 18a5 5 0 01-.6-9.96A6 6 0 0118 10a4.5 4.5 0 01-1 8H7z');

            // city3Svg.appendChild(city3Path);
            // city3Temp.appendChild(city3Svg);

            // city3.appendChild(city3Info);
            // city3.appendChild(city3Temp);

            // // Add all three cities to the list
            // cityList.appendChild(city1);
            // cityList.appendChild(city2);
            // cityList.appendChild(city3);

            // ---------- Put it all together ----------
            aside.appendChild(currentCard);
            

            // Finally, add it to the page
            rightbar.appendChild(aside);
            dashboard.append(rightbar);


        })
        .catch((error) => {

        })
})

let dashboard = document.querySelector(".dashboard");
let main = document.querySelector("main")
let sec = document.getElementById("sec")
let rightbar = document.createElement("div");
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
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${"01c5f08129a6474d9b865906262707"}&q=${city.value}&days=3&alerts=yes`)

        .then(function (raw) {
            if (!raw.ok) {
                throw new error("fuck off");
            }
            return raw.json();
        })
        .then((data) => {



            console.log(data);
            sec.innerHTML = "";
            const cond = data.forecast.forecastday;
            // Namespace required for SVG elements to render properly
            const svgNS = "http://www.w3.org/2000/svg";

            // ==========================================
            // 1. HERO SECTION
            // ==========================================
            const hero = document.createElement("section");
            hero.className = "hero";

            const badge = document.createElement("span");
            badge.className = "badge";
            badge.textContent = "Weather Forecast";

            const heroTitle = document.createElement("h1");
            heroTitle.className = "hero__title";
            heroTitle.innerHTML = data.current.condition.text;

            const heroDesc = document.createElement("p");
            heroDesc.className = "hero__desc";
            heroDesc.textContent = yo(data);

            hero.appendChild(badge);
            hero.appendChild(heroTitle);
            hero.appendChild(heroDesc);
            sec.appendChild(hero);


            // ==========================================
            // 2. FORECAST STRIP SECTION
            // ==========================================
            const forecastStrip = document.createElement("section");
            forecastStrip.className = "forecast-strip";
            forecastStrip.setAttribute("aria-label", "Six day temperature overview");

            // --- Sunday ---
            const sunItem = document.createElement("div");
            sunItem.className = "forecast-item";
            sunItem.setAttribute("data-day", "Sunday");
            let cd1 = sunItem.getAttribute("data-day");

            const sunTemp = document.createElement("span");
            sunTemp.className = "forecast-item__temp";

            sunTemp.textContent = forecastchecktemp(cd1, data);

            // const sunSvg = document.createElementNS(svgNS, "svg");
            // sunSvg.setAttribute("class", "w-icon");
            // sunSvg.setAttribute("viewBox", "0 0 24 24");
            // sunSvg.setAttribute("fill", "currentColor");

            // const sunPath = document.createElementNS(svgNS, "path");
            // sunPath.setAttribute("d", "M7 18a5 5 0 01-.6-9.96A6 6 0 0118 10a4.5 4.5 0 01-1 8H7z");
            sunItem.appendChild(sunTemp);
            if(icon(data,cd1)) {

                sunItem.appendChild(icon(data,cd1));
            }

            // sunSvg.appendChild(sunPath);
            forecastStrip.appendChild(sunItem);

            // --- Monday ---
            const monItem = document.createElement("div");
            monItem.className = "forecast-item";
            monItem.setAttribute("data-day", "Monday");
            let cd2 = monItem.getAttribute("data-day");

            const monTemp = document.createElement("span");
            monTemp.className = "forecast-item__temp";
            monTemp.textContent = forecastchecktemp(cd2, data);

            const monSvg = document.createElementNS(svgNS, "svg");
            monSvg.setAttribute("class", "w-icon");
            monSvg.setAttribute("viewBox", "0 0 24 24");
            monSvg.setAttribute("fill", "currentColor");

            const monPath = document.createElementNS(svgNS, "path");
            monPath.setAttribute("d", "M7 18a5 5 0 01-.6-9.96A6 6 0 0118 10a4.5 4.5 0 01-1 8H7z");

            monSvg.appendChild(monPath);
            monItem.appendChild(monTemp);
            if(icon(data,cd2)) {

                monItem.appendChild(icon(data,cd2));
            }
            // monItem.appendChild(monSvg);
            forecastStrip.appendChild(monItem);

            // --- Tuesday ---
            const tueItem = document.createElement("div");
            tueItem.className = "forecast-item";
            tueItem.setAttribute("data-day", "Tuesday");
            let cd3 = tueItem.getAttribute("data-day");

            const tueTemp = document.createElement("span");
            tueTemp.className = "forecast-item__temp";
            tueTemp.textContent = forecastchecktemp(cd3, data);

            // const tueSvg = document.createElementNS(svgNS, "svg");
            // tueSvg.setAttribute("class", "w-icon");
            // tueSvg.setAttribute("viewBox", "0 0 24 24");
            // tueSvg.setAttribute("fill", "currentColor");

            // const tueCircle = document.createElementNS(svgNS, "circle");
            // tueCircle.setAttribute("cx", "8");
            // tueCircle.setAttribute("cy", "8");
            // tueCircle.setAttribute("r", "3.2");
            // tueCircle.setAttribute("opacity", "0.9");

            // const tuePath = document.createElementNS(svgNS, "path");
            // tuePath.setAttribute("d", "M9 19a5 5 0 01-.5-9.98A6 6 0 0120 10a4.3 4.3 0 01-1 9H9z");

            // tueSvg.appendChild(tueCircle);
            // tueSvg.appendChild(tuePath);
            tueItem.appendChild(tueTemp);
            if(icon(data,cd3)) {

                tueItem.appendChild(icon(data,cd3));
            }
            // tueItem.appendChild(tueSvg);
            forecastStrip.appendChild(tueItem);

            // --- Wednesday (Active) ---
            const wedItem = document.createElement("div");
            wedItem.className = "forecast-item forecast-item--active";
            wedItem.setAttribute("data-day", "Wednesday");
            let cd4 = wedItem.getAttribute("data-day");

            const wedTemp = document.createElement("span");
            wedTemp.className = "forecast-item__temp";
            wedTemp.textContent = forecastchecktemp(cd4, data);

            // const wedSvg = document.createElementNS(svgNS, "svg");
            // wedSvg.setAttribute("class", "w-icon");
            // wedSvg.setAttribute("viewBox", "0 0 24 24");

            // const wedPath1 = document.createElementNS(svgNS, "path");
            // wedPath1.setAttribute("d", "M7 14a5 5 0 01-.6-9.96A6 6 0 0118 6a4.5 4.5 0 01-.5 8.9");
            // wedPath1.setAttribute("fill", "none");
            // wedPath1.setAttribute("stroke", "currentColor");
            // wedPath1.setAttribute("stroke-width", "1.6");
            // wedPath1.setAttribute("stroke-linecap", "round");
            // wedPath1.setAttribute("stroke-linejoin", "round");

            // const wedPath2 = document.createElementNS(svgNS, "path");
            // wedPath2.setAttribute("d", "M13 13l-3 5h3l-2 4 5-6h-3l2-3z");
            // wedPath2.setAttribute("fill", "currentColor");

            // wedSvg.appendChild(wedPath1);
            // wedSvg.appendChild(wedPath2);
            wedItem.appendChild(wedTemp);
            if(icon(data,cd4)) {

                wedItem.appendChild(icon(data,cd4));
            }
            forecastStrip.appendChild(wedItem);

            // --- Thursday ---
            const thuItem = document.createElement("div");
            thuItem.className = "forecast-item";
            thuItem.setAttribute("data-day", "Thursday");
            let cd5 = thuItem.getAttribute("data-day");


            const thuTemp = document.createElement("span");
            thuTemp.className = "forecast-item__temp";
            thuTemp.textContent = forecastchecktemp(cd5, data);;
            // let b=forecastchecktemp(cd,data);




            // const thuSvg = document.createElementNS(svgNS, "svg");
            // thuSvg.setAttribute("class", "w-icon");
            // thuSvg.setAttribute("viewBox", "0 0 24 24");
            // thuSvg.setAttribute("fill", "none");
            // thuSvg.setAttribute("stroke", "currentColor");
            // thuSvg.setAttribute("stroke-width", "1.7");
            // thuSvg.setAttribute("stroke-linecap", "round");

            // const thuCircle = document.createElementNS(svgNS, "circle");
            // thuCircle.setAttribute("cx", "12");
            // thuCircle.setAttribute("cy", "12");
            // thuCircle.setAttribute("r", "4.3");
            // thuCircle.setAttribute("fill", "currentColor");
            // thuCircle.setAttribute("stroke", "none");

            // const thuPath = document.createElementNS(svgNS, "path");
            // thuPath.setAttribute("d", "M12 2.5v2.6M12 18.9v2.6M4.5 4.5l1.8 1.8M17.7 17.7l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.5 19.5l1.8-1.8M17.7 6.3l1.8-1.8");

            // thuSvg.appendChild(thuCircle);
            // thuSvg.appendChild(thuPath);
            thuItem.appendChild(thuTemp);
            if(icon(data,cd5)) {

                thuItem.appendChild(icon(data,cd5));
            }
            // thuItem.appendChild(thuSvg);
            forecastStrip.appendChild(thuItem);

            // --- Friday ---
            const friItem = document.createElement("div");
            friItem.className = "forecast-item";
            friItem.setAttribute("data-day", "Friday");
            let cd6 = friItem.getAttribute("data-day");

            const friTemp = document.createElement("span");
            friTemp.className = "forecast-item__temp";
            friTemp.textContent = forecastchecktemp(cd6, data);

            // const cloudy = document.createElementNS(svgNS, "svg");
            // cloudy.setAttribute("class", "w-icon");
            // cloudy.setAttribute("viewBox", "0 0 24 24");
            // cloudy.setAttribute("fill", "currentColor");

            // const friPath = document.createElementNS(svgNS, "path");
            // friPath.setAttribute("d", "M7 18a5 5 0 01-.6-9.96A6 6 0 0118 10a4.5 4.5 0 01-1 8H7z");

            // cloudy.appendChild(friPath);
            friItem.appendChild(friTemp);
            // friItem.appendChild(frisvgs);
            if(icon(data,cd6)) {

                friItem.appendChild(icon(data,cd6));
            }
            forecastStrip.appendChild(friItem);

            sec.appendChild(forecastStrip);


            // ==========================================
            // 3. GRAPH SECTION
            // ==========================================
            const graphDiv = document.createElement("div");
            graphDiv.className = "graph";
            graphDiv.setAttribute("aria-hidden", "true");

            const graphSvg = document.createElementNS(svgNS, "svg");
            graphSvg.setAttribute("viewBox", "0 0 1000 170");
            graphSvg.setAttribute("preserveAspectRatio", "none");

            const graphWave = document.createElementNS(svgNS, "path");
            graphWave.setAttribute("class", "graph__wave");
            graphWave.setAttribute("d", "M0,95 C90,40 180,40 265,95 C345,145 400,150 435,150 C465,150 480,105 500,65 C555,10 645,10 700,65 C760,120 815,145 875,110 C925,85 965,68 1000,60");

            const graphBolt = document.createElementNS(svgNS, "path");
            graphBolt.setAttribute("class", "graph__bolt");
            graphBolt.setAttribute("d", "M508,0 L492,68 L516,74 L470,158 L494,104 L458,170");

            const graphSpark = document.createElementNS(svgNS, "circle");
            graphSpark.setAttribute("class", "graph__spark");
            graphSpark.setAttribute("cx", "470");
            graphSpark.setAttribute("cy", "158");
            graphSpark.setAttribute("r", "5");

            graphSvg.appendChild(graphWave);
            graphSvg.appendChild(graphBolt);
            graphSvg.appendChild(graphSpark);
            graphDiv.appendChild(graphSvg);

            sec.appendChild(graphDiv);


            // ==========================================
            // 4. FOOTER DAYS ROW
            // ==========================================

            const footer = document.createElement("footer");
            footer.className = "days-row";

            const sunSpan = document.createElement("span");
            sunSpan.textContent = "Sunday";

            const monSpan = document.createElement("span");
            monSpan.textContent = "Monday";

            const tueSpan = document.createElement("span");
            tueSpan.textContent = "Tuesday";

            const wedSpan = document.createElement("span");
            wedSpan.className = "is-active";
            wedSpan.textContent = "Wednesday";

            const thuSpan = document.createElement("span");
            thuSpan.textContent = "Thursday";

            const friSpan = document.createElement("span");
            friSpan.textContent = "Friday";

            footer.appendChild(sunSpan);
            footer.appendChild(monSpan);
            footer.appendChild(tueSpan);
            footer.appendChild(wedSpan);
            footer.appendChild(thuSpan);
            footer.appendChild(friSpan);

            // document.body.appendChild(footer);
            sec.appendChild(footer);
            //





            rightbar.innerHTML = "";

            // Simple version - plain document.createElement, line by line, no functions
            // document.querySelector(".aside").innerHTML="";
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
            stat3.appendChild(document.createTextNode(`${data.current.wind_kph}Kph`));

            stats.appendChild(stat1);
            stats.appendChild(stat2);
            stats.appendChild(stat3);

            currentCard.appendChild(location);
            currentCard.appendChild(temp);
            currentCard.appendChild(stats);


            // ---------- Put it all together ----------
            aside.appendChild(currentCard);


            // Finally, add it to the page
            main.append(sec);
            rightbar.appendChild(aside);
            dashboard.append(document.querySelector("main"));
            dashboard.append(rightbar);


        })
        .catch((error) => {

        })
})

function yo(data) {
    const current = data.current;
    const todayForecast = data.forecast.forecastday[0].day;

    const temp = current.temp_c;
    const maxTemp = todayForecast.maxtemp_c;
    const conditionText = current.condition.text.toLowerCase();
    const rainChance = todayForecast.daily_chance_of_rain;
    const uv = current.uv;

    let summary = `Currently ${Math.round(temp)}°C and ${conditionText}. `;

    // Temperature context
    if (temp >= 30) {
        summary += `It's a hot day with highs near ${Math.round(maxTemp)}°C—stay hydrated! `;
    } else if (temp >= 20) {
        summary += `It's pleasantly warm out, reaching up to ${Math.round(maxTemp)}°C. `;
    } else if (temp >= 10) {
        summary += `It's a bit cool today, peaking at ${Math.round(maxTemp)}°C. A light jacket is recommended. `;
    } else {
        summary += `It's chilly today with highs around ${Math.round(maxTemp)}°C. Bundle up! `;
    }

    // Additional context (Rain or Sun)
    if (rainChance > 50) {
        summary += `Don't forget an umbrella (${rainChance}% chance of rain).`;
    } else if (uv >= 6) {
        summary += `UV index is high (${uv}), so grab some sunscreen.`;
    }

    return summary;
}
function day(data) {
    let date = new Date(data.replace(/-/g, "/"));

    let day = date.toLocaleDateString('en-us', { weekday: "long" });
    return day;
}
function daymatcher(codeday, data) {
    let date = data.forecast.forecastday;
    let d1 = day(date[0].date);
    let d2 = day(date[1].date);
    let d3 = day(date[2].date);
    // console.log(d1);

    if (codeday === d1) {
        return "match1";
    }
    else if (codeday === d2) {
        return "match2";
    }
    else if (codeday === d3) {
        return "match3";

    }
    else return "--°";
}
function forecastchecktemp(codeday, data) {
    let date = data.forecast.forecastday;
    let t1 = date[0].day.avgtemp_c;
    let t2 = date[1].day.avgtemp_c;
    let t3 = date[2].day.avgtemp_c;
    let d1 = day(date[0].date);
    let d2 = day(date[1].date);
    let d3 = day(date[2].date);
    // console.log(d1);

    if (codeday === d1) {
        return `${t1}°`;
    }
    else if (codeday === d2) {
        return `${t2}°`;
    }
    else if (codeday === d3) {
        return `${t3}°`;

    }
    else return "--°";
}
function icon(data, cd) {
    const svgNS = "http://www.w3.org/2000/svg";
    let cond = data.forecast.forecastday;
    //fri
    let cloudy = document.createElementNS(svgNS, "svg");
    cloudy.setAttribute("class", "w-icon");
    cloudy.setAttribute("viewBox", "0 0 24 24");
    cloudy.setAttribute("fill", "currentColor");

    const cloudypath = document.createElementNS(svgNS, "path");
    cloudypath.setAttribute("d", "M7 18a5 5 0 01-.6-9.96A6 6 0 0118 10a4.5 4.5 0 01-1 8H7z");

    cloudy.append(cloudypath);

    //thu
    const sunny = document.createElementNS(svgNS, "svg");
    sunny.setAttribute("class", "w-icon");
    sunny.setAttribute("viewBox", "0 0 24 24");
    sunny.setAttribute("fill", "none");
    sunny.setAttribute("stroke", "currentColor");
    sunny.setAttribute("stroke-width", "1.7");
    sunny.setAttribute("stroke-linecap", "round");

    const sunCircle = document.createElementNS(svgNS, "circle");
    sunCircle.setAttribute("cx", "12");
    sunCircle.setAttribute("cy", "12");
    sunCircle.setAttribute("r", "4.3");
    sunCircle.setAttribute("fill", "currentColor");
    sunCircle.setAttribute("stroke", "none");

    const sunPath = document.createElementNS(svgNS, "path");
    sunPath.setAttribute("d", "M12 2.5v2.6M12 18.9v2.6M4.5 4.5l1.8 1.8M17.7 17.7l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.5 19.5l1.8-1.8M17.7 6.3l1.8-1.8");

    sunny.appendChild(sunCircle);
    sunny.appendChild(sunPath);



    //wed
    const thunder = document.createElementNS(svgNS, "svg");
    thunder.setAttribute("class", "w-icon");
    thunder.setAttribute("viewBox", "0 0 24 24");

    const thunpath = document.createElementNS(svgNS, "path");
    thunpath.setAttribute("d", "M7 14a5 5 0 01-.6-9.96A6 6 0 0118 6a4.5 4.5 0 01-.5 8.9");
    thunpath.setAttribute("fill", "none");
    thunpath.setAttribute("stroke", "currentColor");
    thunpath.setAttribute("stroke-width", "1.6");
    thunpath.setAttribute("stroke-linecap", "round");
    thunpath.setAttribute("stroke-linejoin", "round");

    const thunpath1 = document.createElementNS(svgNS, "path");
    thunpath1.setAttribute("d", "M13 13l-3 5h3l-2 4 5-6h-3l2-3z");
    thunpath1.setAttribute("fill", "currentColor");

    thunder.appendChild(thunpath);
    thunder.appendChild(thunpath1);

    //tuesday
    const partly = document.createElementNS(svgNS, "svg");
    partly.setAttribute("class", "w-icon");
    partly.setAttribute("viewBox", "0 0 24 24");
    partly.setAttribute("fill", "currentColor");

    const parCircle = document.createElementNS(svgNS, "circle");
    parCircle.setAttribute("cx", "8");
    parCircle.setAttribute("cy", "8");
    parCircle.setAttribute("r", "3.2");
    parCircle.setAttribute("opacity", "0.9");

    const parPath = document.createElementNS(svgNS, "path");
    parPath.setAttribute("d", "M9 19a5 5 0 01-.5-9.98A6 6 0 0120 10a4.3 4.3 0 01-1 9H9z");

    partly.appendChild(parCircle);
    partly.appendChild(parPath);




    if (daymatcher(cd, data) === "match1") {
        let text = cond[0].day.condition.text.toLowerCase();
        if (text.includes('thunder')) {
            return thunder;
        }

        else if (text.includes('partly')) {
            return partly;
        }

        else if (text.includes('sunny') || text.includes('clear')) {
            return sunny;
        }
        else return cloudy;
    }
    else if (daymatcher(cd, data) === "match2") {
        let text = cond[1].day.condition.text.toLowerCase();
        if (text.includes('thunder')) {
            return thunder;
        }

        else if (text.includes('partly')) {
            return partly;
        }

        else if (text.includes('sunny') || text.includes('clear')) {
            return sunny;
        }
        else return cloudy;
    }
    else if (daymatcher(cd, data) === "match3") {
        let text = cond[2].day.condition.text.toLowerCase();
        if (text.includes('thunder')) {
            return thunder;
        }

        else if (text.includes('partly')) {
            return partly;
        }

        else if (text.includes('sunny') || text.includes('clear')) {
            return sunny;
        }
        else return cloudy;
    }
    else return null;


}
// after DOM loads
async function applyBaliNow() {
  try {
    // Replace with your weather endpoint (e.g., OpenWeather)
    const data = await fetch('/bali-weather.json').then(r => r.json());
    const { condition, sunrise, sunset } = data; // normalize server response
    const now = new Date();
    const isNight = now < new Date(sunrise) || now > new Date(sunset);

    // Map API conditions to your classes
    const map = { Clear:'sunny', Clouds:'cloudy', Rain:'rainy', Thunderstorm:'stormy', Drizzle:'rainy', Mist:'misty' };
    const scene = isNight ? 'night' : (map[condition] || 'sunny');
    document.body.className = scene === 'stormy' ? 'stormy-active rainy-active' :
                              scene === 'meteor' ? 'meteor-active night-active' :
                              `${scene}-active`;

    // optional: re-create particles based on intensity
    // createAllParticles({ rainIntensity: data.rain_mm, windKph: data.wind_kph });
  } catch { /* fallback to your changeScenery() */ }
}
applyBaliNow();
setInterval(applyBaliNow, 60_000);

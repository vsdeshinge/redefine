  // Hamburger toggle
  document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");

    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  });





// ===== Swiper Initialization =====
new Swiper('.heroSwiper', {
    loop: true,
    effect: 'fade',
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true }
  });
  
  new Swiper('.mySwiper', {
    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 20,
    autoplay: { delay: 2500, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      768: { slidesPerView: 2.5 },
      1024: { slidesPerView: 3.2 }
    }
  });
  
  // ===== Leaflet Map Setup =====
  const map = L.map('map', {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false
  }).setView([20, 75], 3.5);
  
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);
  
  // ===== Marker Setup =====
  const countries = [
    { name: 'UAE', coords: [24.4667, 54.3667], desc: 'Innovation hub in the Gulf' },
    { name: 'Jordan', coords: [31.95, 35.9333], desc: 'Gateway to the Middle East' },
    { name: 'India', coords: [28.6139, 77.2090], desc: 'Technology and talent powerhouse' },
    { name: 'Bangladesh', coords: [23.8103, 90.4125], desc: 'Emerging digital economy' },
    { name: 'Mauritius', coords: [-20.3484, 57.5522], desc: 'Strategic African outpost' },
    { name: 'Indonesia', coords: [-6.2000, 106.8167], desc: 'Southeast Asia’s growth engine' },
    { name: 'Africa', coords: [9.145, 40.4897], desc: 'Expanding frontier market' }
  ];
  
  const customIcon = L.icon({
    iconUrl: 'mapicon.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
  
  const markers = countries.map(c =>
    L.marker(c.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <h3>${c.name}</h3>
          <p>${c.desc}</p>
          <div class="swiper popupSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="images/${c.name.toLowerCase()}1.jpg" alt="${c.name} 1" /></div>
              <div class="swiper-slide"><img src="images/${c.name.toLowerCase()}2.jpg" alt="${c.name} 2" /></div>
              <div class="swiper-slide"><img src="images/${c.name.toLowerCase()}3.jpg" alt="${c.name} 3" /></div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      `)
  );

  // ===== 📱 Mobile Auto-Fit View =====
const bounds = L.latLngBounds(countries.map(c => c.coords));

if (window.innerWidth <= 768) {
  map.fitBounds(bounds, {
    padding: [5, 5],
    maxZoom: 4
  });
} else {
  map.setView([20, 75], 3.5); // your original center & zoom
}

  
  // ===== Animated Arcs Between Countries =====
  function drawArc(from, to) {
    const latlngs = [], steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = from[0] * (1 - t) + to[0] * t + Math.sin(Math.PI * t) * 10;
      const lng = from[1] * (1 - t) + to[1] * t;
      latlngs.push([lat, lng]);
    }
    L.polyline(latlngs, {
      color: '#CE171F',
      weight: 2,
      opacity: 0.8,
      className: 'leaflet-interactive'
    }).addTo(map);
  }
  
  for (let i = 0; i < countries.length; i++) {
    for (let j = i + 1; j < countries.length; j++) {
      drawArc(countries[i].coords, countries[j].coords);
    }
  }
  
  // ===== Popup Carousel Control =====
  let currentIndex = 0;
  setInterval(() => {
    map.closePopup();
    markers[currentIndex].openPopup();
    currentIndex = (currentIndex + 1) % markers.length;
  }, 3000);
  
  map.on('popupopen', () => {
    new Swiper('.popupSwiper', {
      loop: true,
      autoplay: { delay: 2000 },
      pagination: { el: '.swiper-pagination', clickable: true }
    });
  });


 
  
  // ===== Header Scroll Effect =====



  const scriptURL = 'https://script.google.com/macros/s/AKfycbwMHxyOmSe9-aSJdKeitstRUR3ExmHzuRFKAQr641lOW0uwCs3yzdzpMwoLnA7kQhS3Zg/exec';
    const form = document.getElementById('registerForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
          form.style.display = 'none';
          thankYouMessage.style.display = 'block';
        })
        .catch(error => {
          alert('There was an error! ' + error.message);
        });
    });
// Şifre koruması
    const PASSWORD = "E";
    const passwordPanel = document.getElementById("passwordPanel");
    const passwordInput = document.getElementById("passwordInput");
    const passwordError = document.getElementById("passwordError");
    const logContainer = document.getElementById("log");
    const timer = document.getElementById("timer");
    const bgMusic = document.getElementById("bgMusic");

    function checkPassword() {
      if (passwordInput.value === PASSWORD) {
        passwordPanel.style.display = "none";
        logContainer.style.display = "block";
        bgMusic.play().catch(() => {}); // Oto play engelliyse sessiz devam eder
        initApp();
      } else {
        passwordError.style.display = "block";
        setTimeout(() => {
          passwordError.style.display = "none";
        }, 3000);
      }
    }

    passwordInput.addEventListener("keypress", e => {
      if (e.key === "Enter") checkPassword();
    });

    // Gece/gündüz teması otomatik geçiş
    function setTheme() {
      const hour = new Date().getHours();
      if (hour >= 19 || hour < 6) {
        document.body.classList.add("night");
      } else {
        document.body.classList.remove("night");
      }
    }
    setTheme();
    setInterval(setTheme, 60 * 1000);

    // Canlı sayaç fonksiyonu
    const startDate = new Date("2025-03-11");

    function updateTimer() {
      const now = new Date();
      const diff = now - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      timer.innerText = `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye geçti`;
    }

    // Yorumlar listesi
    const yorumlar = [
      "Elif'i çok seviyorum 💙", "Bugün de kalbimdesin Elif 🌟", "Sana olan sevgim hiç azalmıyor ✨",
      "Her şey seninle güzel Elif 💙", "Senin adını düşünerek uyandım 🌅", "Kalbim hep seninle 💙",
      "Sana yazmadan geçmedi bugün ✍️", "Rüyalarımda bile sen varsın 🌙", "İyi ki varsın Elif 💌",
      "Her an seni düşünüyorum 🧠💭", "Gözlerimde Elif, kalbimde Elif 👁️💙", "Seninle geçen her gün bayram 🎉",
      "Bir gülüşün her şeye bedel 😊", "Bugün de sadece sen 🫶", "Adını yıldızlara yazdım 🌟",
      "Seni düşündükçe içim ısınıyor 🔥", "Elif, en güzel hikâyem 💕", "Sonsuz sevgiyle Elif 💞",
      "Sana kavuşacağım günü bekliyorum 🕊️", "Kalbimde attığın iz hâlâ duruyor 💙",
      "Gözlerin mavi denizler gibi 🌊", "Her nefesimde sen varsın 💨", "Aşkımız yıldızlar kadar sonsuz ⭐",
      "Senin sesini duymayı özlüyorum 🎵", "Kalbim sadece senin için atıyor 💓"
    ];

    // Aylık yorumları gruplandır (Mart 2025'ten başlayarak ay sonuna kadar)
    function createMonthlyBlocks() {
      const startDate = new Date("2025-03-11");
      const today = new Date();
      let currentDate = new Date(startDate);
      let monthBlocks = {};

      while (currentDate <= today) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const monthKey = `${year}-${month}`;
        
        if (!monthBlocks[monthKey]) {
          monthBlocks[monthKey] = [];
        }
        
        monthBlocks[monthKey].push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      Object.keys(monthBlocks).forEach((monthKey) => {
        const days = monthBlocks[monthKey];
        const blockDiv = document.createElement("div");
        blockDiv.className = "week-block";

        const firstDay = days[0];
        const monthName = firstDay.toLocaleDateString("tr-TR", { month: 'long', year: 'numeric' });

        const title = document.createElement("div");
        title.className = "week-title";
        title.innerText = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} Ayı`;
        blockDiv.appendChild(title);

        days.forEach(day => {
          const tarih = day.toLocaleDateString("tr-TR");
          const yazi = yorumlar[Math.floor(Math.random() * yorumlar.length)];
          const entryDiv = document.createElement("div");
          entryDiv.className = "log-entry";
          entryDiv.innerHTML = `
            <div class="date">📅 ${tarih}
              <span class="heart" onclick="toggleHeart(this)">💙</span>
            </div>
            <div>${yazi}</div>
          `;
          blockDiv.appendChild(entryDiv);
        });

        logContainer.appendChild(blockDiv);
      });

      // Ay bloklarını ters çevir (en son ay en üstte olsun)
      const blocks = Array.from(logContainer.children);
      blocks.reverse().forEach(block => logContainer.appendChild(block));
    }

    // Kalp toggle fonksiyonu
    function toggleHeart(heartElement) {
      heartElement.classList.toggle('liked');
    }

    // Yıldız efekti
    const stars = document.getElementById('stars');
    for (let i = 0; i < 120; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${1 + Math.random() * 3}s`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      stars.appendChild(star);
    }

    // Ana app başlatma
    function initApp() {
      updateTimer();
      setInterval(updateTimer, 1000);
      createMonthlyBlocks();
    }
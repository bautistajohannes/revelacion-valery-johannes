document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const cfg = INVITACION;

  document.documentElement.style.setProperty("--cream", cfg.tema.crema);
  document.documentElement.style.setProperty("--paper", cfg.tema.papel);
  document.documentElement.style.setProperty("--gold", cfg.tema.dorado);
  document.documentElement.style.setProperty("--gold-light", cfg.tema.doradoClaro);
  document.documentElement.style.setProperty("--ink", cfg.tema.texto);

  $("sonogram").src = cfg.ecografia;
  $("whatsappBtn").href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(cfg.mensajeWhatsApp)}`;
  $("mapsBtn").href = cfg.mapsUrl;

  $("openInvitation").addEventListener("click", async () => {
    $("invitation").classList.remove("hidden");
    $("invitation").scrollIntoView({behavior:"smooth"});
    try { await $("music").play(); $("musicToggle").textContent = "♫"; } catch {}
  });

  const audio = $("music");
  audio.src = cfg.musica;
  $("musicToggle").addEventListener("click", async () => {
    if (audio.paused) {
      try { await audio.play(); $("musicToggle").textContent = "♫"; }
      catch { alert("Agrega un archivo de música en la carpeta music y vuelve a intentarlo."); }
    } else {
      audio.pause(); $("musicToggle").textContent = "♪";
    }
  });

  const target = new Date(cfg.fechaISO).getTime();
  function tick() {
    let remaining = target - Date.now();
    if (remaining < 0) remaining = 0;
    const values = [
      Math.floor(remaining / 86400000),
      Math.floor(remaining / 3600000) % 24,
      Math.floor(remaining / 60000) % 60,
      Math.floor(remaining / 1000) % 60
    ];
    ["days","hours","minutes","seconds"].forEach((id,i) => $(id).textContent = String(values[i]).padStart(2,"0"));
  }
  tick(); setInterval(tick,1000);
  setTimeout(() => $("loader").classList.add("hide"), 850);
});

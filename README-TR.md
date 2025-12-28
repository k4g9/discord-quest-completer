<p align="center">
  👉 <a href="README.md"><strong>for English README.md click here</strong></a> 👈
</p>

# Better Quest Completer

**Vencord / Equicord** için hafif ve gelişmiş bir Discord görev tamamlama eklentisi.  
Gerekli aktivite türlerini simüle ederek desteklenen Discord görevlerini otomatik olarak tamamlar.

---

## ✨ Özellikler

- **Tamamlanmamış ve aktif görevleri** otomatik olarak tamamlar
- Birden fazla görev türünü destekler:
  - 📺 WATCH_VIDEO
  - 🎮 PLAY_ON_DESKTOP
  - 📡 STREAM_ON_DESKTOP
  - 🕹️ PLAY_ACTIVITY
  - **(Tüm görev türleri için çalışır)**
- Sağ üste görevi eforsuz tamamlamak için bir buton ekler
- Sizin için faydalı bildirimler gösterir
- Masaüstü istemcisi & tarayıcı algılama
- Temiz ve kullanışlı üst bar butonu entegrasyonu
- Hafif ve minimal yapı

![Better Quest Completer](button.png)
---

## 🧩 Desteklenen İstemciler

- **Vencord**
- **Equicord**
- **Equicord gibi diğer Vencord fork’ları**

> ⚠️ Harici eklentiler **kaynak koddan** kurulmalıdır.

---

## 📦 Kurulum (Genel Bakış)

> Detaylı kurulum adımları **resmî dokümantasyonda** bulunmaktadır.  
> Lütfen aşağıdaki bağlantılara göz atın.

Genel adımlar:
1. **Vencord** veya **Equicord**’u kaynak koddan kurun  
   **(Bu adım çok önemlidir ve yapılması oldukça kolaydır)**
2. Repoyu, `Vencord (veya Equicord)/src/userplugins` klasörünün içine klonlayın  
   (Eğer `userplugins` klasörü yoksa kendiniz oluşturun)
3. İsterseniz `readme` ve `button.png` dosyalarını silebilirsiniz, gerekli değiller
4. Eklenti dosyalarını `userplugins` klasörüne kopyalayın. Yapı şu şekilde olmalıdır:  
   `Vencord (veya Equicord)/src/userplugins/better-quest-completer/index.tsx, style.css`  
   (`index.tsx` ve `style.css` aynı klasörde, `better-quest-completer` adlı klasör içinde olmalıdır)
5. Dokümantasyonda yazdığı gibi tekrar `pnpm build` ve `pnpm inject` komutlarını çalıştırın
6. Discord’u yeniden yükleyin ve **Plugins** bölümünden eklentiyi aktif edin


📚 **Kaynak koddan kurulum / build için resmî dokümantasyon:**
- Vencord: *(https://docs.vencord.dev/installing)*
- Equicord: *(https://docs.equicord.org/building-from-source)*

---

## 🚀 Kullanım

1. Discord’u açın
2. Üst bardaki (sağ üst) **Better Quest Completer** butonuna tıklayın
3. Eklenti:
   - Aktif bir görevi algılar
   - Görevi otomatik olarak tamamlar
   - Süreç boyunca bildirimler gösterir

Eğer aktif bir görev bulunamazsa, size bir bildirim gösterilir.

---

## ⚙️ Ayarlar

- **Bildirimleri Etkinleştir**  
  Görev ilerleme ve tamamlanma bildirimlerini açıp kapatır.

---

## ❗ Bilinen Kısıtlamalar

- Bazı görevler **Discord Masaüstü İstemcisi** gerektirir
- Yayın (stream) görevleri için ses kanalında **en az 1 başka kullanıcı** bulunmalıdır
- Tarayıcı desteği yalnızca video görevleri ile sınırlıdır

---

## 📄 Lisans

Bu proje **MIT lisansı** ile lisanslanmıştır.

---

## ❤️ Katkıda Bulunanlar

- Eklenti geliştiricisi: **[k4g9](https://discord.com/users/848987722751410206)**
- Vencord / Equicord eklenti ekosistemi için geliştirilmiştir


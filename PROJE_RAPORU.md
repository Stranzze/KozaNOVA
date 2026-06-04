# KozaNOVA Gayrimenkul — Proje Raporu

## 1. Müşteri Tanıtımı ve İhtiyaç Analizi

**Müşteri:** KozaNOVA Gayrimenkul, Kocaeli (Darıca) merkezli bir gayrimenkul danışmanlık firmasıdır. 2024 yılında kurulmuş olup Kocaeli ve İstanbul bölgelerinde satılık/kiralık prestijli gayrimenkuller için danışmanlık hizmeti sunmaktadır.

**İhtiyaçlar:**
- Kurumsal bir web sitesi ile dijital varlık oluşturmak
- Satılık/kiralık ilanları sergilemek
- Müşterilerin iletişim formu üzerinden firma ile kolayca iletişime geçebilmesi
- Çift dil desteği (Türkçe/İngilizce) ile geniş kitleye ulaşmak
- Mobil uyumlu, modern bir tasarım
- Kolay güncellenebilir, harici bağımlılığı olmayan bir yapı

---

## 2. Tasarım Kararları

### Renk Paleti

| Renk | Kodu | Kullanım Yeri |
|------|------|---------------|
| Krem | `#f8f5f0` | Arka plan, genel zemin |
| Lacivert | `#1a1a2e` | Metin, koyu alanlar |
| Altın | `#c9a84c` | Vurgular, butonlar, aksanlar |
| Bronz | `#8b7355` | İkincil vurgular |

Seçim gerekçesi: Gayrimenkul sektöründe lüks ve güven algısı oluşturmak için sıcak krem zemin üzerinde lacivert metin ve altın vurgular tercih edildi. Koyu modda bu renkler tersine çevrilerek gece kullanımına uygun hale getirildi.

### Tipografi

- **Başlıklar:** Playfair Display (serif) — lüks ve prestij hissi
- **Gövde metni:** Plus Jakarta Sans (sans-serif) — okunabilirlik ve modern görünüm

### Yerleşim (Layout)

- **CSS Grid** kullanıldı: sayfa bölümleri (property-grid, services-grid, team-grid, testimonial-grid, footer-grid)
- **Flexbox** kullanıldı: navigasyon, hero alanı, kart içi hizalamalar
- **Responsive breakpoint'ler:** 1024px, 900px, 768px, 600px, 480px
- Maksimum container genişliği: 1240px

---

## 3. Teknik Kararlar

### Neden Bootstrap Kullanılmadı?

Proje tamamen **vanilla CSS** ile geliştirildi. Bootstrap kullanılmamasının nedenleri:
- Proje küçük ölçekli olduğu için framework şişkinliğine gerek yoktu
- CSS Grid ve Flexbox modern tarayıcılarda tam destek alıyor (%98+)
- Özel tasarım (renk paleti, animasyonlar) Bootstrap varsayılanlarını ezmeyi gerektirecekti
- Harici bağımlılık olmaması, sitenin yüklenme hızını artırdı

### Neden Flexbox + CSS Grid?

- **CSS Grid:** 2 boyutlu düzenler için (ilanlar grid'i, hizmet kartları, ekip grid'i, footer)
- **Flexbox:** 1 boyutlu düzenler ve hizalama için (nav, buton grupları, kart içi düzen)
Her iki teknoloji birlikte kullanılarak esnek ve duyarlı bir layout elde edildi.

### Diğer Teknik Kararlar

- **Intersection Observer API:** Scroll animasyonları için (lazy reveal efekti)
- **CSS Custom Properties (değişkenler):** Tema yönetimi için (aydınlık/karanlık mod)
- **localStorage:** Tema ve dil tercihlerinin kalıcılığı için
- **Netlify Forms:** İletişim formu için (spam koruması + yönetim paneli)
- **Yandex Haritalar:** Konum göstermek için (iframe entegrasyonu)
- **Clamp():** Duyarlı tipografi için

---

## 4. Karşılaşılan Zorluklar ve Çözümleri

| Zorluk | Çözüm |
|--------|-------|
| Netlify Forms statik sitelerde çalışmıyor | Forma `data-netlify="true"` eklendi, Netlify botu otomatik algılıyor |
| Mobil navigasyon menüsü | Hamburger menü ile fixed nav, `transform: translateY(-120%)` ile açılıp kapanıyor |
| Çoklu dil yönetimi | `js/translations.js` ile tüm metinler tek dosyada toplandı, `data-i18n` attribute'leri ile DOM üzerinden güncelleme |
| Karanlık modda renk tutarlılığı | CSS değişkenleri ile iki tema arasında sorunsuz geçiş, `[data-theme="dark"]` altında tüm renkler yeniden tanımlandı |
| Scroll animasyonlarının performansı | Intersection Observer kullanıldı, throttling gerektirmedi |

---

## 5. AI Asistan Kullanımı

Proje geliştirme sürecinde **Claude AI (opencode)** asistan olarak kullanıldı.

| Görev | Kullanılan Prompt/Yaklaşım | Sonuç |
|-------|---------------------------|-------|
| Proje iskeleti oluşturma | *"Kocaeli merkezli bir gayrimenkul danışmanlık firması için 5 sayfalık kurumsal web sitesi hazırla. HTML/CSS/JS ile tamamen statik, responsive ve modern bir yapı kur."* | 5 sayfalık statik site iskeleti, navigasyon yapısı ve footer dahil oluşturuldu |
| Renk paleti ve tipografi | *"Gayrimenkul sektörüne uygun, lüks ve güven hissi uyandıran bir renk paleti ve tipografi seçimi yap. Açık/koyu temaya uyumlu olsun."* | Krem (#f8f5f0), lacivert (#1a1a2e), altın (#c9a84c) paleti; Playfair Display + Plus Jakarta Sans font çifti belirlendi |
| Responsive tasarım | *"Tüm sayfalarda tutarlı çalışan bir grid sistemi kur. Masaüstü (1240px), tablet (768px) ve mobil (480px) için breakpoint'ler tanımla."* | CSS Grid + Flexbox ile 5 farklı breakpoint'te çalışan responsive layout oluşturuldu |
| Çoklu dil sistemi | *"Türkçe ve İngilizce destekleyen bir çeviri sistemi geliştir. Dil geçişi localStorage'da saklansın ve sayfa yeniden yüklenmeden çalışsın."* | `js/translations.js` ile 100+ metin anahtarı, anlık dil değiştirme ve kalıcı tercih desteği eklendi |
| İletişim formu validasyonu | *"Netlify Forms ile uyumlu, istemci taraflı doğrulama yapan bir form sistemi oluştur. Hata mesajları seçili dile göre gösterilsin."* | Ad, e-posta, telefon ve ilgi alanı doğrulaması; dinamik hata mesajları ve gönderim durumu bildirimi eklendi |
| Karanlık mod | "CSS değişkenleri ile aydınlık/karanlık tema sistemi kur. Tüm renkler iki temada da okunabilir ve uyumlu olsun." | `[data-theme="dark"]` ile kapsamlı dark mode, localStorage kalıcılığı ve geçiş animasyonu eklendi |
| Footer hizmet bölgeleri | *"Footer'daki hizmet bölgeleri listesinden İzmir ve Ankara'yı kaldır, sadece Kocaeli ve İstanbul kalsın."* | 5 HTML dosyasında footer güncellendi, hizmet bölgeleri Kocaeli + İstanbul olarak sadeleştirildi |
| README dokümantasyonu | *"Projeyi tanıtan, dosya yapısını, kullanım talimatlarını ve iletişim bilgilerini içeren profesyonel bir README hazırla."* | Logo, proje görselleri, özellik listesi, dosya ağacı ve iletişim bilgilerini içeren kapsamlı README oluşturuldu |
| Proje raporu | *"Müşteri tanıtımı, tasarım/teknik kararlar, zorluklar ve AI kullanımını kapsayan bir proje raporu hazırla."* | 7 başlıklı, tablolar ve detaylı açıklamalar içeren profesyonel proje raporu PDF olarak teslim edildi |

**Değerlendirme:** AI asistan, tekrarlayan kod yazımını hızlandırdı ve tutarlı bir kod yapısı sağladı. Özellikle çeviri dosyalarının hazırlanması ve responsive medya sorgularının yazılmasında zaman kazandırdı. Tüm çıktılar manuel olarak incelenip projeye uyarlandı.

---

## 6. Skill ve Agent Kullanımı

Bu projede aşağıdaki opencode skill'leri kullanıldı:

| Skill | Amaç | Katkısı |
|-------|------|---------|
| **frontend-design** | Tasarım kalitesini artırmak için kullanıldı | Renk paleti, tipografi, gradientler ve layout kararlarında referans alındı. Özellikle lüks emlak sitesi görünümü için öneriler sağladı. |

Projeye özel bir `SKILL.md` veya `AGENTS.md` dosyası oluşturulmadı; tüm geliştirme süreci doğrudan AI asistan ile yürütüldü.

---

## 7. Lighthouse Skorları

> ⚠️ Lighthouse testleri canlı ortamda çalıştırılamamıştır. Aşağıdaki görsel, tarayıcı Lighthouse aracı ile alınacak ekran görüntüsü için yer tutucudur.

```
[Ekran görüntüsü eklenecek — Lighthouse Performans, Erişilebilirlik, 
 En İyi Uygulamalar ve SEO skorları]
```

Test için: Google Chrome → Sağ Üst Menü → Diğer Araçlar → Geliştirici Araçları → Lighthouse sekmesi

---

*Hazırlanma Tarihi: Haziran 2026*

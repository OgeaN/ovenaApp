# Ovena — tanıtım ve yasal sayfalar

Google Play'in zorunlu kıldığı **gizlilik politikası** ve **hesap silme**
sayfaları. Statik site: derleme adımı, bağımlılık, çerçeve yok — tarayıcıda
`index.html` açmak yeterli.

```
index.html        ana sayfa, diğer ikisine yönlendirir
gizlilik.html     gizlilik politikası
hesap-silme.html  hesap ve veri silme talebi   <- Play'e verilecek URL
style.css         ortak stil (uygulamanın renk paletiyle aynı)
lang.js           TR/EN dil değiştirme
```

Her sayfa Türkçe ve İngilizce içerir. Tarayıcı diline göre açılır, üstteki
düğmeyle değiştirilir ve tercih `localStorage`'da saklanır. İngilizce bilinçli
bir tercih: Play incelemesini İngilizce konuşan ekipler yapabiliyor.

## GitHub Pages ile yayınlama

```bash
cd D:/WebProject/ovenaApp
git init
git add -A
git commit -m "Ovena web sayfalari"
git branch -M main
git remote add origin https://github.com/<kullanici-adin>/ovena-web.git
git push -u origin main
```

Ardından GitHub'da: **Settings → Pages → Source: Deploy from a branch →
`main` / `(root)` → Save**. Birkaç dakika sonra site şu adreste yayında olur:

```
https://<kullanici-adin>.github.io/ovena-web/
```

## Play Console'a girilecek adresler

| Alan | URL |
|---|---|
| Gizlilik politikası | `.../ovena-web/gizlilik.html` |
| Hesap silme | `.../ovena-web/hesap-silme.html` |

Gizlilik politikası **Uygulama içeriği → Gizlilik politikası** altına,
hesap silme adresi **Uygulama içeriği → Veri güvenliği → Hesap silme**
altına girilir.

## Play'in hesap silme sayfasından beklediği üç şey

Üçü de `hesap-silme.html` içinde karşılanıyor:

1. **Uygulama veya geliştirici adına atıf** — sayfanın en üstünde "Ovena",
   `com.ovena.app` ve geliştirici adı yazılı
2. **Adımların belirgin gösterimi** — numaralı liste, ilk ekranda, vurgulu
   kart içinde
3. **Silinen/saklanan veri türleri ve süreler** — iki ayrı tablo; saklama
   tablosunda her satırın kendi süresi var (0 gün / 30 gün / 90 gün)

Ayrıca sayfa uygulama indirilmeden erişilebilir ve giriş gerektirmez.

## İçerik güncellenirken

Gizlilik politikasındaki veri tabloları uydurulmadı; uygulamanın gerçek
davranışından çıkarıldı:

| Kaynak | Ne veriyor |
|---|---|
| `src/domain/types.ts` | toplanan alanların tam listesi |
| `firebase/firestore.rules` | sunucuda ne tutuluyor, kim erişebiliyor |
| `src/data/sync.ts` | sunucuya **ne gönderiliyor** |
| `app.json` | istenen izinler |

Uygulamada veri modeli değişirse bu tabloları da güncelle — yanlış bir
gizlilik politikası, politikasızlıktan daha kötüdür.

İki nokta özellikle doğrulandı:

- **Profil fotoğrafı cihazdan çıkmaz.** Yalnızca yerel dosya yolu
  (`avatarUri`) senkronlanır, görüntünün kendisi yüklenmez.
- **Reklam SDK'sı, analitik SDK'sı veya üçüncü taraf takip yok.** Yalnızca
  Firebase (Google) kullanılıyor.

## Bilinen eksik

Uygulamadaki **"Tüm verileri sil"** şu an yalnızca telefondaki SQLite'ı
temizliyor; Firestore'daki `users/{uid}` ağacı ve Firebase Auth hesabı
kalıyor. Bu yüzden sayfalarda sunucu tarafı silme **e-posta talebi** olarak
anlatıldı ve talepler elle işlenmeli:

1. Firebase Console → Authentication → kullanıcıyı sil
2. Firebase Console → Firestore → `users/{uid}` dokümanını sil

Uygulama içi gerçek hesap silme eklenirse bu sayfalar da güncellenmeli.

# Condex

**Condex** (Condition Executor), HTML öğelerinin görünürlüğünü belirli kurallara ve koşullara göre dinamik olarak yönetmenizi sağlayan hafif, esnek ve güçlü bir JavaScript kütüphanesidir. Form alanları ve diğer kullanıcı arayüz bileşenlerinde koşullu mantık akışlarını basitleştirmek amacıyla tasarlanmıştır. `Condex`, koşul bazlı görünürlük ve etkileşim kontrolü için kapsamlı ve esnek bir çözüm sunar.

## Özellikler

- **Koşul Tabanlı Görünürlük:** Belirtilen koşullara göre HTML öğelerini gösterir veya gizler.
- **Esnek Mantıksal Operatörler:** `and` ve `or` mantıksal operatörleri ile birden fazla koşulu birleştirir.
- **Çeşitli Karşılaştırma Kuralları:** `is`, `not`, `contains`, `greater_than`, `less_than` gibi kapsamlı koşul desteği ile gelişmiş mantık akışları sağlar.
- **Kolay Entegrasyon:** Kütüphaneyi HTML öğelerine minimal `data-attribute` yapılandırmalarıyla entegre edin.
- **Select2 ve Diğer Bileşenlerle Uyumlu:** Select2 gibi özel bileşenlerde olay dinleyicileriyle uyumlu çalışır.

## Kurulum

`Condex` kütüphanesini projenize dahil etmek için, aşağıdaki adımları izleyin:

```html
<script src="condex.min.js"></script>
```

## Kullanım

Condex, belirli data-attribute özelliklerine göre HTML öğelerini izler. data-condition-field niteliği, koşul değişikliklerini dinler ve data-condition niteliğine göre hedef öğelerin görünürlüğünü dinamik olarak ayarlar.

## Örnek Kullanım
Aşağıda `Condex` kütüphanesinin basit bir örneği yer almaktadır:

```html
<input type="text" name="age" data-condition-field />

<div data-condition="age:greater_than(18)">
    Bu içerik yalnızca 18 yaşından büyükler içindir.
</div>
```
Bu örnekte, age alanına girilen değerin 18'den büyük olup olmadığı kontrol edilir. Eğer koşul sağlanırsa div öğesi görünür olur.

## API ve Koşul Kuralları
Condex kütüphanesi şu koşul kurallarını destekler:

- **is:** Alan değeri belirtilen değere eşitse (`age:is(18)`).
- **not:** Alan değeri belirtilen değerden farklıysa (`age:not(18)`).
- **contains:** Alan değeri belirtilen değeri içeriyorsa (`username:contains(admin)`).
- **greater_than:** Alan değeri belirtilen değerden büyükse (`age:greater_than(18)`).
- **less_than:** Alan değeri belirtilen değerden küçükse (`age:less_than(18)`).

## Mantıksal Operatör Kullanımı
Birden fazla koşul tanımlayabilir ve `data-condition-operator` niteliği ile bu koşulları `and` veya `or` olarak değerlendirebilirsiniz.

**Örneğin:**
```html
<input type="text" name="age" data-condition-field />
<select name="country" data-condition-field>
    <option value="">Ülke Seçin</option>
    <option value="Turkey">Türkiye</option>
    <option value="USA">Amerika</option>
</select>

<div data-condition="age:greater_than(18), country:is(Turkey)" data-condition-operator="and">
    Bu içerik yalnızca 18 yaşından büyük ve Türkiye'de yaşayanlar içindir.
</div>
```

Bu örnekte `age` ve `country` koşulları, `and` operatörü ile birleştirilmiştir. Her iki koşul da sağlandığında içerik görünür hale gelir.

## Diğer Kullanım Örnekleri
**Checkbox ile Koşullu Görünürlük**
Checkbox işaretlendiğinde belirli bir öğenin görünmesini sağlama.

```html
<label>
    <input type="checkbox" name="subscribe" value="yes" data-condition-field /> Abone Ol
</label>

<div data-condition="subscribe:is(yes)">
    Abonelik bilgilerinizi girebilirsiniz.
</div>
```

**Birden Fazla Koşul ve or Operatörü**
Yaş `18`’den büyük veya rol `admin` olduğunda içerik gösterilecek.

```html
<input type="text" name="age" data-condition-field />
<select name="role" data-condition-field>
    <option value="">Rol Seçin</option>
    <option value="admin">Yönetici</option>
    <option value="user">Kullanıcı</option>
</select>

<div data-condition="age:greater_than(18), role:is(admin)" data-condition-operator="or">
    Bu içerik ya 18 yaşından büyük ya da yönetici olanlar içindir.
</div>
```
## Katkıda Bulunun
Condex açık kaynak bir projedir ve katkılarınızı bekler! İlgili sorunları bildirmek veya yeni özellikler eklemek için lütfen bir issue oluşturun veya pull request gönderin.

## Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.

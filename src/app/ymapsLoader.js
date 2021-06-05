const DEFAULT_API_URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

export default (placemarkDatas) => new Promise((resolve, reject) => {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = DEFAULT_API_URL;
  script.onload = resolve;
  script.onerror = (e) => reject(e);

  document.body.append(script);
})
  .then(() => {
    if (!global.ymaps) {
      throw new Error('ymaps object does not exist in global scope');
    }
    if (typeof global.ymaps.ready !== 'function') {
      throw new Error('ymaps object has invalid format');
    }

    return global.ymaps.ready();
  })
  .then((maps) => {
    const myMap = new maps.Map('ymap', {
      center: [59.94, 30.32],
      zoom: 11,
      controls: ['zoomControl'],
      behaviors: ['drag'],
    });

    placemarkDatas.forEach(({ latitude, longitude, hintContent }) => {
      const myPlacemark = new maps.Placemark(
        [latitude, longitude],
        {
          hintContent,
          balloonContent: `
            <div class="map__balloon">
              <svg class="map__balloon-img">
                <use xlink:href="img/sprite.svg#logo"></use>
              </svg>
              <span>${hintContent}</span>
            </div>
          `,
        },
        {
          iconLayout: 'default#image',
          iconImageHref: 'img/map-marker.svg',
          iconImageSize: [46, 57],
        },
      );

      myMap.geoObjects.add(myPlacemark);
    });
  });

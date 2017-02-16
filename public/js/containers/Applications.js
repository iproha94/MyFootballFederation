import React from 'react';

export default React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col s12 m12">
                    <div className="card horizontal">
                        <div className="card-image">
                            <img className="application-image"
                                 src="/img/referee.jpg"/>
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <p>
                                    Приложение для судьи,
                                    позволяющее видеть результаты судейства матча онлайн.
                                </p>
                            </div>
                            <div className="card-action">
                                <a href="/applications/Referee-1.1.2.apk">Скачать</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col s12 m12">
                    <div className="card horizontal">
                        <div className="card-image">
                            <img className="application-image"
                                 src="/img/larix.png"/>
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <p>
                                    Larix Broadcaster — бесплатное приложение для iOS, Android
                                    и Windows Phone, способное транслировать на медиа-сервер
                                    живой видео- и/или аудио-контент.
                                </p>
                            </div>
                            <div className="card-action">
                                <a href="https://play.google.com/store/apps/details?id=com.wmspanel.larix_broadcaster&hl=ru">Скачать</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

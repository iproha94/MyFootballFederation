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
                                <p><b>Мобильный судья</b> Android приложение, которое помогает судить матчи.</p>
                                <p><b>Версия:</b> 1.1.3</p>
                                <p><b>Платформа:</b> Android 5.0 и выше</p>
                            </div>
                            <div className="card-action">
                                <a href="/applications/Referee-1.1.3.apk">Скачать</a>
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
                                <p><b>Larix Broadcaster</b> приложение, которое позволяет для своей федерации провести видеотрансляцию со своего смартфона.</p>
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

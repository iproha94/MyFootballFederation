import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    componentDidMount: function () {
        var script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js";
        document.body.appendChild(script);
        var self = this;
        script.onload = function () {
            $('.js-form-search').submit(function (event) {
                    event.preventDefault();
            });
            $('input.autocomplete').autocomplete({
                source: '/api/',
                method: "POST",
                select: function (event, ui) {
                    self.props.history.push('/federation/' + ui.item.value);
                },
                open: function (event, ui) {
                    $(".ui-menu-item-wrapper").replaceWith(function(index, oldHTML){
                        return $("<a>").html(oldHTML)
                            .addClass("collection-item ui-menu-item-wrapper green-text text-darken-1");
                    });
                    $(".ui-autocomplete:visible").css({top:"+=5"});
                },
                create: function(event, ui) {
                    $(".ui-autocomplete").addClass("collection z-depth-1");
                }
            });
        };
    },
    render: function () {
       return (
           <div>
               <link href="/css/main.css" type="text/css" rel="stylesheet" media="screen,projection"/>
               <div className="nav-search light-green darken-1 content-flex fullscreen nav-search-background">

                   <h4 className="center white-text header_item__margin">Платформа для проведения футбольных турниров</h4>

                   <div className="header_item__margin">
                       <h6 className="center white-text search_item_margin">Можете воспользоваться поиском что бы найти федерацию:</h6>
                       <nav className="light-green darken-2">
                           <div className="nav-wrapper">
                               <form className="js-form-search">
                                   <div className="input-field">
                                       <input id="search" type="search" className="autocomplete" autocomplete="off" required/>
                                           <label for="search"><i className="material-icons">search</i></label>
                                           <i className="material-icons">close</i>
                                   </div>
                               </form>
                           </div>
                       </nav>
                   </div>

                   <h6 className="center white-text search_item_margin">
                       Или можете создать свою свою федерацию:
                   </h6>
                   <div className="center-align">
                       <Link to="/federation/create" className="waves-effect waves-light btn-large light-green darken-2">Создать свою федерацию</Link>
                   </div>

               </div>
               <div className="container">
                   <p>
                       Футбо́л (от англ. foot — ступня, ball — мяч) —
                       командный вид спорта, в котором целью является забить
                       мяч в ворота соперника ногами или другими частями тела
                       (кроме рук) большее количество раз, чем команда соперника.
                       В настоящее время самый популярный и массовый вид спорта
                       в мире.
                   </p>
                   <p>
                       ФИФА и Международный олимпийский комитет используют «футбол» как официальное международное название игры.
                       Полное англоязычное название игры, «association football» («футбол по правилам Ассоциации»), было выбрано после создания английской Футбольной ассоциации в 1863 году, чтобы отличать эту игру от других разновидностей футбола, существовавших в то время, например регби-футбол («rugby football», «футбол по правилам Школы Рагби»), где была разрешена игра руками. Со временем длинные названия вариантов игры стали сокращаться в повседневной речи и печати. Сначала в Англии было распространено сокращение «assoc.», затем в 1880-х годах от него образовался термин «соккер» (англ. soccer) путём добавления к сокращению «-soc-» суффикса «-er» на оксфордский манер[en] (по аналогии регби-футбол сокращённо назывался «раггер» (англ. rugger))[4]. В периодике термин «соккер» используется по крайней мере с 1892 года[5].
                   </p>
                   <p>
                       В наши дни название «соккер» распространено в ряде англоязычных стран, где исторически продолжают пользоваться популярностью другие разновидности футбола. Например, в Австралии и Новой Зеландии футболом исторически называют австралийский футбол или регбилиг. В Ирландии термин «футбол» относится к гэльскому футболу, поэтому «соккер» употребляется в прессе[6][7]. В ЮАР игра в большинстве известна как «соккер», что выразилось в названии чемпионата ЮАР, «Премьер соккер лига», и стадиона «Соккер Сити», на котором проходил финал ЧМ-2010. В США и Канаде употребляется термин «соккер», так как футболом называют американский футбол и канадский футбол. В Англии название «соккер» устарело и новые поколения болельщиков теперь считают его пренебрежительным.
                   </p>
                   <p>
                       В других языках название игры является:
                       либо заимствованием английского слова football, как в русском языке — «футбол», в португальском — futebol;
                       либо калькой слова football, как например в немецком — Fußball, греческом — ποδόσφαιρο, финском — jalkapallo, иврите — כדורגל, карельском — jalgamiäččy и адыгейском — лъэпэеу;
                       либо производными от слов «пинать», «нога» и т. п., как в итальянском — calcio, хорватском — nogomet.
                   </p>
               </div>
           </div>
       );
   } 
});
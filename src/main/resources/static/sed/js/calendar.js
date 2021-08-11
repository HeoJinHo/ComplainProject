$(function(){
    var now = moment().format("YYYY-MM-DD");

    $('#calendar').fullCalendar({
        header: {
            left: 'today',
            center: 'prev,title, next',
            right: ''
        },
        defaultDate: now,
        editable: false,
        eventLimit: 3,
        fixedWeekCount: false,
        height: 730,
        locale:	'ko',

        eventRender: function (event, element) {
            if (event.price) {
                element.find('.fc-content')
                    .append("<a class='calendar_pop'></a><span class='fc-case'>"+ moneyFormat(event.cnt) +"<small>건</small>"+"</span><br style='clear:both'/><span class='fc-desc'>" + moneyFormat(event.price) +"<small>원</small>"+"</div>");
            }
        },

        eventClick: function (event, element) {
          // alert ("이벤트 클릭!");
        },
        events: function(start, end, timezone, callback) {

            var s2 = moment(start);

            if (s2.date() !== 1)
                s2.add(1, 'M');

            var url = "/se/dashboard/" + selectMode + "/" + s2.year() + "/" + (s2.month() + 1);

            $.ajax ({
                type: "get",
                url: url,
                dataType: 'json',
                success: function (data, textStatus)
                {
                    var i = 0;
                    callback(data);

                    if (selectMode === "ad") {
                        var adCompleteCnt = 0;
                        var adCompletePrice = 0;
                        var adReadyCnt = 0;
                        var adReadyPrice = 0;

                        for (i = 0; i < data.length; i++) {
                            if (data[i].className === "cal_type1") {
                                adCompleteCnt += data[i].cnt;
                                adCompletePrice += data[i].price;
                            } else if (data[i].className === "cal_type2") {
                                adReadyCnt += data[i].cnt;
                                adReadyPrice += data[i].price;
                            }
                        }

                        $("#adReadyCnt").text(moneyFormat(adReadyCnt));
                        $("#adReadyPrice").text(moneyFormat(adReadyPrice));
                        $("#adCompleteCnt").text(moneyFormat(adCompleteCnt));
                        $("#adCompletePrice").text(moneyFormat(adCompletePrice));
                    }
                    else if (selectMode === "pay") {
                        var payCompleteCnt = 0;
                        var payCompletePrice = 0;
                        var payCancelCnt = 0;
                        var payCancelPrice = 0;
                        var payRequestCnt = 0;
                        var payRequestPrice = 0;

                        for (i = 0; i < data.length; i++) {
                            if (data[i].className === "pay_type1") {
                                payCompleteCnt += data[i].cnt;
                                payCompletePrice += data[i].price;
                            }
                            else if (data[i].className === "pay_type2") {
                                payRequestCnt += data[i].cnt;
                                payRequestPrice += data[i].price;
                            }
                            else if (data[i].className === "pay_type3") {
                                payCancelCnt += data[i].cnt;
                                payCancelPrice += data[i].price;
                            }
                        }

                        $("#payCompleteCnt").text(moneyFormat(payCompleteCnt));
                        $("#payCompletePrice").text(moneyFormat(payCompletePrice));
                        $("#payRequestCnt").text(moneyFormat(payRequestCnt));
                        $("#payRequestPrice").text(moneyFormat(payRequestPrice));
                        $("#payCancelCnt").text(moneyFormat(payCancelCnt));
                        $("#payCancelPrice").text(moneyFormat(payCancelPrice));
                    }
                },
                error: function (xhr, textStatus)
                {
                    alert ("[ERR] : " + xhr.status);
                }

            });
        }
    });
});

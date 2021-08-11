"use strict";

/**
 * datepicker 적용
 */
var setDatepicker = function () {
    for(var i = 0; i < arguments.length; i++) {
        $("#"+arguments[i]).datepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            dateFormat: 'yy-mm-dd',
            beforeShow: function() {
                setTimeout(function(){
                    $('.ui-datepicker').css('z-index', 1200);
                }, 0);
            }
        })
    }
};

var setDatepicker2 = function () {
    for(var i = 0; i < arguments.length; i++) {
        $("#"+arguments[i]).datepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            dateFormat: 'yy-mm-dd',
            minDate: 0,
            beforeShow: function() {
                setTimeout(function(){
                    $('.ui-datepicker').css('z-index', 1200);
                }, 0);
            }
        })
    }
};



/**
 * 날짜 범위 세팅
 * @param s 시작날짜 id
 * @param e 종료날짜 id
 * @param d 날짜
 * @param t 타입 (day, week, month)
 */
var setDateRange = function (s, e, d, t) {
  var start = $("#"+s);
  var end = $("#"+e);

  if(d == null) {
      start.val("");
      end.val("");
  } else {
      start.val(moment().add(d, t).format("YYYY-MM-DD"));
      end.val(moment().format("YYYY-MM-DD"));
  }
};

/**
 * 날짜 format 데이터 얻기
 * @param addCount
 * @param dateType
 * @param format
 */
var getDateFormat = function (addCount, dateType, format) {
    return moment().add(addCount, dateType).format(format);
};

/**
 * 분기별 데이트 얻기 (YYYY-MM-DD)
 * @param q (1,2,3,4)
 * @param year
 * @returns {{startDate: *, endDate: *}}
 */
function getQuarterDate(q, year) {
    var quarterStartDate = moment(year).quarter(q).endOf('month').format('YYYY-MM-01');
    var quarterEndDate = moment(year).quarter(q).endOf('month').add(2,'month').format('YYYY-MM-DD');

    return {
        startDate : quarterStartDate,
        endDate : quarterEndDate
    }
}




;(function(win, doc){

  var datepicker = {};

  // 生成日期的数据
  datepicker.monthData = function(year, month) {
    var ret = []; // 日期数据
    // 如果没有传参
    var today = new Date();
    if (!year || !month) {
      year = today.getFullYear(); // 当前年
      month = today.getMonth() + 1;  // 当前月
    }

    // SY 参数越界自动进退位 
    // new Date(year, month, 0) 这个月的最后一天
    // new Date(year, month, 1) 这个月的第一天 因为月是0开始的 因为上面加了1 所以这里减 1

    var firstDay = new Date(year, month - 1, 1); // 当月第一天
    var firstDayWeekDay = firstDay.getDay(); // 1号是周几
    
    // 把周日变成7
    if (firstDayWeekDay === 0) firstDayWeekDay = 7;

    year = firstDay.getFullYear();
    month = firstDay.getMonth() + 1;

    // 上个月最后一天
    var lastDayLastMonth = new Date(year, month - 1, 0);
    var lastDayCount = lastDayLastMonth.getDate();

    // 上个月有几天显示在第一行
    var preMonthDayCount = firstDayWeekDay - 1;
    
    // 当月月的最后一天
    var currLastDay = new Date(year, month, 0);
    var currDate = currLastDay.getDate(); // 当月最后一天是几号 知道有多少天

    // 循环计算每天的日期信息
    for (var i = 0; i < 42; i++) {
      // 表示 
      var date = i + 1 - preMonthDayCount;

      // showDate 是显示的日期 1号
      var showDate = date;
      var thisMonth = month;
   
      // 如果date是负数 表示上一个月的
      if (date <= 0) {
        thisMonth = month - 1;
        showDate = showDate + lastDayCount;
      } else if (date > currDate) {
        // 下个月数据
        thisMonth = month + 1;
        showDate = date - currDate;
      }

      // 处理月份
      if (thisMonth == 0) {
        thisMonth = 12; 
      }
      
      if (thisMonth == 13) {
        thisMonth = 1;
      }

      ret.push({
        month: thisMonth, // 当月
        date: date,
        showDate: showDate,
      });
    }

    // 返回一个包含年 月 日 的对象 日期主要是 days的数组数据
    return {
      year: year,
      month: month,
      today: today.getFullYear() + '' + (today.getMonth() + 1) + today.getDate(),
      days: ret
    };
  };

  win.datepicker = datepicker;

}(this, document));

;(function(win){

  var datepicker = win.datepicker;
  // 当前日期对象数据
  var monthData;
  var $wapper;
  var isOpen;

  // 在datepicker里面加一个构建界面的方法 因为这里要多次渲染
  datepicker.buildUI = function(year, month) {
    monthData = this.monthData(year, month);
    var html =  '<div class="datepicker-header">' +
                  '<a href="#" class="datepicker-btn datepicker-prev">&lt;</a>' + 
                '<a href="#" class="datepicker-btn datepicker-next">&gt;</a>' +
                '<span class="datepicker">' + monthData.year + '-' + monthData.month +'</span></div>' + 
                '<div class="datepicker-body"><table cellspacing="0" cellpadding="0"><thead><tr>' +
                '<th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr></thead><tbody>';

        for (var i = 0; i < monthData.days.length; i++) {
          var date = monthData.days[i];
          // 第一行是tr
          if (i%7 === 0) {
            html += '<tr>';
          }

          // 如果是上月
          if (date.month < monthData.month) {
            className = 'prev-month';
          } else if (date.month === monthData.month) {
            // 如果是当月
            className = 'availabel';
            if ((monthData.year + '' + date.month + date.showDate) === monthData.today) {
              className += ' today';
            }
          } else {
            // 如果是下个月
            className = 'next-month';
          }

          html += '<td><div class="' + className +'">' + date.showDate + '</div></td>';

          // 最后一行
          if (i%7 === 6) {
            html += '</tr>';
          }
        }

        html += '</tbody></table></div></div>';
        
        return html;
  };

  // 负责渲染 参数 上月 下月切换
  datepicker.render = function(direction) {
    var year, month;
    
    // 第一次渲染没有数据
    if (monthData) {
      year = monthData.year;
      month = monthData.month;
    }

    if (direction === 'prev') month--;
    if (direction === 'next') month++;

    var html = datepicker.buildUI(year, month);

    if (!$wapper) {
      $wapper = document.createElement('div');
      $wapper.className = 'datepicker-wapper';
    }
    $wapper.innerHTML = html;

  }

  // 初始化第一次渲染
  datepicker.init = function(input) {
    this.render();

    // 绘制粗来
    document.body.appendChild($wapper);
    var $input = document.querySelector(input);
    // 是否显示日期组件
    isOpen = false;
    $input.addEventListener('click', function(e){
      var $target = e.target;
      // 如果目标对象没有样式
      if (!isOpen) {
        $wapper.classList.add('datepicker-wapper-show');
        
        var left = $input.offsetLeft;
        var top = $input.offsetTop;
        var height = $input.offsetHeight; 

        $wapper.style.top = top + height + 2 + 'px';
        $wapper.style.left = left + 'px'

        isOpen = true;
      }
    }, false);

    // 切换上下月份的
    $wapper.addEventListener('click', function(e){
      var $target = e.target;
      var nodeList = document.querySelector('div');
      console.log(nodeList);
      if ($target.nodeName.toLowerCase() == 'div') {
        // 给选择的值标记一下
        if ($target.classList.contains('curr')) {
          // 如果包含就不变 隐藏
          $wapper.classList.remove('datepicker-wapper-show');
          isOpen = false;
        } else {
          // 清除所有的
        }
      }

      // 如果不包含按钮
      if (!$target.classList.contains('datepicker-btn')) {
        return;
      }
      if ($target.classList.contains('datepicker-prev')) {
        datepicker.render('prev');
      }
      if ($target.classList.contains('datepicker-next')) {
        datepicker.render('next');
      }  
    
    }, false);
  };

}(this));

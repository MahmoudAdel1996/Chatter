$(document).ready(function () {
    $('html').niceScroll({
        cursorcolor: '#067e7e',
        cursorborder: 'none',
        cursorborderradius: '2px',
        scrollspeed: '200'
    });
    $('.chat-area').niceScroll({
        cursorcolor: '#067e7e' ,
        cursorborder: 'none',
        cursorborderradius: '2px',
        scrollspeed:'100'
    });
    $('.content-left').niceScroll({
        cursorcolor: '#067e7e',
        cursorborder: 'none',
        cursorborderradius: '2px',
        scrollspeed: '200'

    });
    $('textarea').niceScroll({
        cursorcolor: '#067e7e',
        cursorborder: 'none',
        cursorborderradius: '2px',
        scrollspeed: '200',
    });
    
    
    $('.user').click(function () {
        $('.user').removeClass('active');
        $(this).addClass('active');
        $('#username').html($(this).find('h5').html());
    });
    
    function getdata(){
        $('.chat').load(document.URL + ' .chat-area');
    }
    setInterval(getdata, 10000);
    $('.chat').scrollTop($('.chat').height());
    function ajaxfunc() {
      $.ajax({
          method: 'POST',
          url: '/AddMessage',
          datatype:'json',
          data:{
              'message': $('textarea').val(),
              'botname': $('#username').html(),
              'username': $('.user-name').html(),
          },
          beforeSend: function(xhr){
            xhr.setRequestHeader('x-CSRFToken',csrf_token)
          },
          success: function(data) {
            var msg = (data.message).replace(/\>/g, '&gt;').replace(/\</g, '&lt;');
            $('.chat-area').append('<div class="me"><i class="fa fa-caret-left"></i><span>' + data.username + ' : ' + '</span>' + msg + '</div>');
            $('.chat').scrollTop($('.chat').height());
          }
      });
    };


    $('textarea').keydown(function (event) {
        var msg = $('textarea').val();
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13 && msg != '') {
            if (keyCode.preventDefault)
                keyCode.preventDefault();
            ajaxfunc();
            //$('.chat-area').append('<div class="me"><i class="fa fa-caret-left"></i><span>' + $('.user-name').html() + ' : ' + '</span>' + msg + '</div>');
            $('textarea').val('');
            return false;
            
        }
        if (keyCode == 13 && msg == '') {
            if (keyCode.preventDefault)
                keyCode.preventDefault();
            return false;
        }
    });

    $('.send').click(function (e) {
        e.preventDefault();
        var msg = $('textarea').val()
        if (msg != '') {
            ajaxfunc();
            $('textarea').val('');
        }
    });

    $('.content-left .user').first().addClass('active');



});

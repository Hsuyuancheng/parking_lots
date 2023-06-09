sessionStorage.setItem('member_id', 1)
var memberid = sessionStorage.getItem('member_id')
// modal區
var modal = document.getElementsByClassName("date_modal")
$('#typeChoose .container .date1_btn').on('click', function () {
    modal_block($('#dateModal'))
    maskOn()
})
$('#typeChoose div div div button').on('click', function () {
    modal_block($('#locationModal'))
    maskOn()
})
$('#typeChoose div button:first-child+button').on('click', function () {
    modal_block($('#TradetypeModal'))
    // modal_block($(".loc1_btn"))
    maskOn()
})
$('.close').on('click', function () {
    closeModal()
    maskOff()
})
window.onclick = function (event) {
    if ($(event.target).hasClass('mask_on') == true) {
        closeModal()
        maskOff()
    }
}
function closeModal() {
    $('.data_modal').removeClass("modal_block");
    $('.data_modal').addClass("modal_none");
}
function maskOn() {
    $(".mask_gray").removeClass('mask_off')
    $(".mask_gray").addClass('mask_on')
}
function maskOff() {
    $(".mask_gray").removeClass('mask_on')
    $(".mask_gray").addClass('mask_off')
}
function modal_none(x) {
    x.removeClass("modal_block");
    x.addClass("modal_none");
}
function modal_block(x) {
    x.removeClass("modal_none");
    x.addClass("modal_block");
}

// modal按鈕CSS
$('.form_btn button').on('click', function () {
    if ($(this).hasClass("checked_btn") == true) {
        $(this).removeClass("checked_btn")
    } else {
        $(this).addClass("checked_btn")
    }
})



$.ajax({
    url: `http://localhost:3000/select/member`,
    type: "post",
    data: { id: memberid }
}).done(function (x) {
    var datafromS = JSON.parse(x);
    var member_money = datafromS[0].member_money
    console.log(datafromS)
    $('#money').text(member_money)
    $.ajax({
        url: `http://localhost:3000/select/traderecord/${memberid}`,
        type: "GET"
    }).done(function (x) {
        var traderecord = JSON.parse(x)
        // console.log(traderecord)
        for (i = 0; i < traderecord.length; i++) {
            var type
            switch (traderecord[i].tr_type) {
                case 0: type = '儲值'; break;
                case 1: type = '提領'; break;
                case 2: type = '繳費'; break;
            }
            $('#traderecord_data').append(`
                <div class="col-12 row traderecord_data" datadate="${traderecord[i].tr_date}" datatype="${traderecord[i].tr_type}">
                    <div class="col-6">
                        <h1>${traderecord[i].tr_counterparty}</h1>
                        <p style="color: gray;">Carparking${type}</p>
                        <p style="color: gray">${traderecord[i].tr_date} ${traderecord[i].tr_time}</p>
                    </div>                            
                    <hr>
                </div>
            `)
        }
    })

})
$('#dateChoose').on('click', function () {
    console.log($($('div[datadate]')[1]).attr('datadate'))
    for (i = 0; i < $('div[datadate]').length; i++) {
        var cd = new Date($($('div[datadate]')[i]).attr('datadate'))
        if (isDuringDate(cd)) {
        }
        else {
            $($('div[datadate]')[i]).addClass("Data_off")
            closeModal()
            maskOff()
        }
    }
    closeModal()
    maskOff()
})

$('#trTypeChoose').on('click', function () {
    var datalist = [0, 1, 2]
    if ($($('button[datatypechoose]')[0]).hasClass('checked_btn')) {
        datalist = datalist.filter(data => data != 0)
    }
    if ($($('button[datatypechoose]')[1]).hasClass('checked_btn')) {
        datalist = datalist.filter(data => data != 1)
    }
    if ($($('button[datatypechoose]')[2]).hasClass('checked_btn')) {
        datalist = datalist.filter(data => data != 2)
    }
    datalist.forEach((x) => {
        // console.log($($('div[datatype]')[i]).attr('datatype') == x)
        for (i = 0; i < $('div[datatype]').length; i++) {
            if ($($('div[datatype]')[i]).attr('datatype') == x) {
                $($('div[datatype]')[i]).addClass("Data_off")
                closeModal()
                maskOff()
            }
        }
    })
    closeModal()
    maskOff()
})

function isDuringDate(cd) {
    var d1 = new Date($('input[name=date1]').val())
    var d2 = new Date($('input[name=date2]').val())
    console.log(cd)
    if (cd >= d1 && cd <= d2) {
        return true;
    } else {
        return false;
    };

}
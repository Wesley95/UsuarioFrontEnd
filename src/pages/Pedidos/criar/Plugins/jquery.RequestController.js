import $ from 'jquery';
import './jquery.dpNumberPicker-1.0.1-min.js';

$(document).on("click", ".btn-add-request", function (e) {
    var button = $(this);
    const id = $(this).attr("id");
    e.preventDefault();

    var request_item = $(".request-item[data-id='" + id + "']");

    if (!$(request_item).length) {

        // alert($(".request-item[data-id='1']").html());
        $.ajax({
            url: "http://localhost:3003/sistema/produtos/" + id,
            method: "GET",
            dataType: "JSON",
            contentType: "application/json",
            success: function (data) {

                var price = (parseFloat(data.preco).toFixed(2) + "").replace(".", ",");

                const appendTo = "<div class='request-item' data-id='" + data.id + "'>" +
                    "<div class='line-divider small-box'>" +
                    "<div class='product-name-price'>" +
                    data.nome +
                    "</div>" +
                    "<div class='cancel-request'>" +
                    "<button class='cancel-request-button'>x</button>" +
                    "</div>" +
                    "</div>" +
                    "<div class='line-divider small-box'>" +
                    "<div class='product-name-price'>" +
                    "<div class='price'>" +
                    "R$" + price +
                    "</div>" +
                    "<div class='price-count'>" +
                    "R$" + price + " x 1" +
                    "</div>" +
                    "</div>" +
                    "<div class='total-product'>" +
                    "<div id='number-picker'></div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";


                if (!$(".request-field .request-item[data-id='" + data.id + "']").length) {


                    $(".request-field").append(appendTo);

                    $(button).parents("tr").css({ display: "none" });

                    $(".request-item[data-id='" + data.id + "']").find("div.total-product div#number-picker").dpNumberPicker({
                        min: 1,// Minimum value.
                        max: 15,// Maximum value.
                        value: 1,// Initial value
                        step: 1,// Incremental/decremental step on up/down change.
                        format: false,
                        editable: false,
                        addText: "+",
                        subText: "-",
                        formatter: function (val) { return val; },
                        beforeIncrease: function () { },
                        afterIncrease: function () { },
                        beforeDecrease: function () { },
                        afterDecrease: function () { },
                        beforeChange: function () { },
                        afterChange: function () { },
                        onMin: function () { },
                        onMax: function () { }
                    })

                    $(button).prop("disabled", true);
                }else
                alert("existe");

            },
            error: function () {
                alert("Error");
            }
        });
    }
    else alert("existe");
});

$(document).on("click", ".cancel-request", function () {
    const id = $(this).parents(".request-item").attr("data-id");
    $("tr#" + id).css({ display: "table-row" });
    $("button.btn-add-request#" + id).prop("disabled", false);
    $("button.btn-add-request[data-id='" + id + "']").prop("disabled", false);
    $(this).parents(".request-item[data-id='" + id + "']").remove();
});

$(document).on("click",".confirm-requests",function(){

    let all = {ObjRequest:[]};

    $(".request-field .request-item").each(function(index,element){
        var newvalue = {
            id:$(this).attr("data-id"),
            total:$(this).find(".total-product .dp-numberPicker-input").val(),
            clientId:$(".client-name option:selected").val()
        };

        all["ObjRequest"].push(newvalue);
    });

    var jsonConverted = JSON.stringify(all);
    console.log(jsonConverted);
})
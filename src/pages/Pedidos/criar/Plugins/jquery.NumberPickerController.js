import $ from 'jquery';

buttonClick(".dp-numberPicker-sub");
buttonClick(".dp-numberPicker-add");

function buttonClick(button) {
    $(document).on("click", button, function () {
        var total = $(this).parent().find(".dp-numberPicker-input").val();
        var price_name = $(this).parents(".line-divider").find(".product-name-price");
        var price = parseFloat($(price_name).find(".price").text().replace(",",".").replace("R$","")).toFixed(2);

        $(price_name).find(".price-count").html("R$" + (parseInt(total) * price).toFixed(2) + " x " + total);  
    });
}


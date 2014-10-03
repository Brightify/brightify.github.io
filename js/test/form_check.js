$(document).ready(function() {
    $("input").keyup(function() {
        var filled = true;
        $(".inputs input").each(function() {
            if ($(this).val() === "") {
                filled = false;
            }
        });
        if (filled) {
            $("input[type=submit]").removeAttr("disabled");
        } else {
            $("input[type=submit]").attr("disabled", "disabled");
        }
    });
});

function ChangeImage(image) {
    var source = image.src;
    document.getElementById("main_img").src = source;
}

function SetDetailImage(image) {
    var source = image.src;
    document.getElementById("detail-img").src = source;
}

function PlusQuantity(e) {
    var a = e.previousElementSibling;
    if (parseInt(a.value) < 10) {
        a.value = parseInt(a.value) + 1;
    }

}
function SubQuantity(e) {
    var a = e.nextElementSibling;
    if (parseInt(a.value) > 1) {
        a.value = parseInt(a.value) - 1;
    }
}
function CheckQuantity(e) {
    if(!Number.isInteger(e.value))
    {
        alert("Vui lòng nhập số");
        e.value = 1
        location.reload();
    }
    else if (parseInt(e.value) <= 0 || parseInt(e.value) > 10) {
        alert("Số lượng không hợp lệ.");
        e.value = 1
        location.reload();
    }
    
}


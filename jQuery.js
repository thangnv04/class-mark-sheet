$(document).ready(function() {

    // validate form
    $("#form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            toan: {
                required: true,
                number: true,
                min: 0,
                max: 10
            },
            ly: {
                required: true,
                number: true,
                min: 0,
                max: 10
            },
            hoa: {
                required: true,
                number: true,
                min: 0,
                max: 10
            }
            
        },
        messages: {
            name: {
                required: "Mời bạn nhập tên",
                minlength: "Tối thiểu 2 ký tự",
                min: "Điểm không hợp lệ",
                max: "Điểm không hợp lệ"
            },
            toan: {
                required: "Không được bỏ trống",
                number: "Bạn phải nhập số",
                min: "Điểm không hợp lệ",
                max: "Điểm không hợp lệ"
            },
            ly: {
                required: "Không được bỏ trống",
                number: "Bạn phải nhập số",
                min: "Điểm không hợp lệ",
                max: "Điểm không hợp lệ"
            },
            hoa: {
                required: "Không được bỏ trống",
                number: "Bạn phải nhập số",
                min: "Điểm không hợp lệ",
                max: "Điểm không hợp lệ"
            }
        }
    });

    var listData = [];

    // nhap thong tin
    var index = 0;
    $("#nhap-btn").click(function() {

        // lay du lieu nhap
        if ($("#form").valid()) {
            var hoTen = $("#ho-ten").val();
            var diemToan = $("#diem-toan").val();
            var diemLy = $("#diem-ly").val();
            var diemHoa = $("#diem-hoa").val();

            var testCore = {
                "hoTen": hoTen,
				"diemToan": diemToan,
				"diemLy": diemLy,
				"diemHoa": diemHoa
            };
            listData.push(testCore);

            // Ghi du lieu ra bang
            index++;
            $("#my-table > tbody").append(
                `<tr>
                    <td>${index}</td>
                    <td>${hoTen}</td>
                    <td>${diemToan}</td>
                    <td>${diemLy}</td>
                    <td>${diemHoa}</td>
                    <td>?</td>
                    <td><button class="edit-btn">Edit</button></td>
                    <td><button class="delete-btn">Delete</button></td>
                </tr>`
            )
            //rs o nhap du lieu
            $("#ho-ten").val("");
            $("#diem-toan").val("");
            $("#diem-ly").val("");
            $("#diem-hoa").val("");
        }
    });

    // tinh diem trung binh
    $("#avg").click(function() {
        $("tbody tr").each(function() {
            var toan = $(this).children("td").eq(2).html();
            var ly = $(this).children("td").eq(3).html();
            var hoa = $(this).children("td").eq(4).html();
            var avg = ((parseFloat(toan) + parseFloat(ly) + parseFloat(hoa)) / 3).toFixed(1);
            $(this).children("td").eq(5).html(avg);
        });
    });

    // tim hoc sinh gioi
    $("#hoc-sinh-gioi").click(function() {
        $("tbody tr").each(function() {
            var diemTrungBinh = parseFloat($(this).children("td").eq(5).html());
            if (diemTrungBinh >= 8.0) {
                //set background mau do neu thoa man diemTrungBinh >= 8.0
                $(this).css("color", " red");
            }
        });
    });

    // sap xep hoc sinh theo ten
    var flag = 0;
    $("#my-table th").click(function() {

        // bien flag chan thi sap xep tang dan
        if (flag % 2 === 0) {
            $("tbody tr").sort(sortBy).appendTo("tbody");
            function sortBy(a, b) {
                var x = $(a).children("td:eq(1)").text().toLowerCase();
                var y = $(b).children("td:eq(1)").text().toLowerCase();
                return x === y ? 0 : x > y ? 1 : -1;
            }
        }

        // bien flag le thi sap xep giam dan
        if (flag % 2 === 1) {
            $("tbody tr").sort(sort_by).appendTo("tbody");
            function sort_by(a, b) {
                var x = $(a).children("td:eq(1)").text().toLowerCase();
                var y = $(b).children("td:eq(1)").text().toLowerCase();
                return x === y ? 0 : x < y ? 1 : -1;
            }
        }
        flag += 1;

        // danh lai so thu tu
        var inx = 1;
        $("tbody tr").each(function() {
            $(this).children("td").eq(0).text(inx);
            inx++;
        });
    });

    // sua thong tin hoc sinh
    var in_edit;
    $("#my-table tbody").on("click",".edit-btn", function() {
        var tr_this = $(this).closest("tr");
        var tr_ten =  tr_this.find("td").eq(1).text();
        var tr_toan =  tr_this.find("td").eq(2).text();
        var tr_ly =  tr_this.find("td").eq(3).text();
        var tr_hoa =  tr_this.find("td").eq(4).text();

        in_edit = tr_this.find("td").eq(0).text() - 1;
        console.log(in_edit)

        $("#ho-ten").val(tr_ten);
        $("#diem-toan").val(tr_toan);
        $("#diem-ly").val(tr_ly);
        $("#diem-hoa").val(tr_hoa);
    });

    // update thong tin sau khi sua
    $("#update-btn").click(function() {
        for (var i = 0; i < listData.length; i++) {
            if (i === in_edit) {
                if (document.getElementById("ho-ten").value != "") {
                    listData[i].hoTen = document.getElementById("ho-ten").value;
                }
                if (document.getElementById("diem-toan").value != "") {
                    listData[i].diemToan = document.getElementById("diem-toan").value;
                }
                if (document.getElementById("diem-ly").value != "") {
                    listData[i].diemLy = document.getElementById("diem-ly").value;
                } 
                if (document.getElementById("diem-hoa").value != "") {
                    listData[i].diemHoa = document.getElementById("diem-hoa").value;
                }
            }
        }
        // xoa bang
        $("#bodytable").text("");
       
        // xoa thong tin o trong input
        $("#ho-ten").val("");
        $("#diem-toan").val("");
        $("#diem-ly").val("");
        $("#diem-hoa").val("");

        showListData();
    });

    // xoa hoc sinh
    $("#my-table tbody").on("click",".delete-btn", function() {
        $(this).closest("tr").remove();

        // danh lai so thu tu
        var inx = 1;
        $("tbody tr").each(function() {
            $(this).children("td").eq(0).text(inx);
            inx++;
        });
        index = inx - 1;
        // xoa phan tu trong mang
        listData.splice(index, 1);
    });
    
    // ghi thong tin ra bang
    function showListData() {
        // ghi du lieu ra bang
        for (let i = 0; i < listData.length; i++) {
            document.getElementById("bodytable").innerHTML += 
            `<tr>
                <td>${i+1}</td>
                <td>${listData[i].hoTen}</td>
                <td>${listData[i].diemToan}</td>
                <td>${listData[i].diemLy}</td>
                <td>${listData[i].diemHoa}</td>
                <td>?</td>
                <td><button class="edit-btn" onclick="editMark(${i})">Edit</button></td>
                <td><button class="delete-btn" onclick="deleteMark(${i})">Delete</button></td>
            </tr>`;
        }
    }
});
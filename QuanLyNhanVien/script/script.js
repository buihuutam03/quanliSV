const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const initData = [
  {
    id: 0,
    username: "nguyenvan",
    fullname: "An",
    email: "annguyen@gmail.com",
    workingDay: 12,
    possition: "Sếp",
    luongCB: 1200000,
    workingtime: 200,
    totalSalary: 2002000,
    ranking: "Nhân viên giỏi",
  },
  {
    id: 1,
    username: "nguyenan",
    fullname: "An",
    email: "annguyen12@gmail.com",
    workingDay: 12,
    possition: "Sếp",
    luongCB: 1000000,
    workingtime: 200,
    totalSalary: 2000000,
    ranking: "Nhân viên xuất sắc",
  },
  {
    id: 1,
    username: "nguyenan",
    fullname: "An",
    email: "annguyen12@gmail.com",
    workingDay: 12,
    possition: "Sếp",
    luongCB: 1000000,
    workingtime: 80,
    totalSalary: 2000000,
    ranking: "Nhân viên trung bình",
  },
];

function renderTable(data) {
  const table = $("#tableDanhSach");
  const html = data.map((item) => {
    return `
        <tr>
        <td>${item.username}</td>
        <td>${item.fullname}</td>
        <td>${item.email}</td>
        <td>${item.workingDay}</td>
        <td>${item.possition}</td>
        <td>${item.totalSalary}</td>
        <td>${item.ranking}</td>
        <td class="d-flex">
          <button data-id="${item.id}" class="btn btn-edit btn-success"  data-toggle="modal"
          data-target="#myModal">Sửa</button>
          <button data-id="${item.id}" class="btn btn-remove btn-danger">Xóa</button>
        </td>
        </tr>
        `;
  });
  table.innerHTML = html.join("");
  // handle edit
  const editBtn = $("#btnCapNhat");

  const edit = $$(".btn-edit");
  edit.forEach((item) => {
    item.onclick = () => {
      console.log(item.dataset.id);
      const user = initData.find((data) => data.id === Number(item.dataset.id));
      console.log(user);
      const username = ($("#tknv").value = user.username);
      const fullname = ($("#name").value = user.fullname);
      const email = ($("#email").value = user.email);
      const password = ($("#password").value = user.password);
      const luongCB = ($("#luongCB").value = user.luongCB);
      const workingDay = ($("#datepicker").value = user.workingDay);
      const possition = ($("#chucvu").value = user.possition);
      const workingtime = ($("#gioLam").value = user.workingtime);
      addUser(editBtn, user);
    };
  });
  const remove = $$(".btn-remove");
  remove.forEach((item) => {
    item.onclick = () => {
      const index = initData.findIndex(
        (data) => data.id === Number(item.dataset.id)
      );
      console.log(index);
      console.log(item.dataset.id);
      initData.splice(index, 1);
      renderTable(initData);
    };
  });
}

function addUser(add, user) {
  add.onclick = (e) => {
    const username = $("#tknv").value;
    const fullname = $("#name").value;
    const email = $("#email").value;
    const password = $("#password").value;
    const luongCB = $("#luongCB").value;
    const workingDay = $("#datepicker").value;
    const possition = $("#chucvu").value;
    const workingtime = $("#gioLam").value;
    // rengex
    const regexName = /[a-zA-Z0-9]/;
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
    const regexMail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    // user
    if (username === "") {
      showMess("tbTKNV", "Vui lòng nhập tên username", true);
    } else if (username.length < 4 || username.length > 6) {
      showMess(
        "tbTKNV",
        "Vui lòng nhập tên username lớn hơn 4 và nhỏ hơn 6 ký tự",
        true
      );
    } else {
      showMess("tbTKNV", "", false);
    }
    // name
    if (fullname === "") {
      showMess("tbTen", "Vui lòng nhập tên nhân viên", true);
    } else if (!regexName.test(fullname)) {
      showMess("tbTen", "Tên nhân viên phải là chữ", true);
    } else {
      showMess("tbTen", "", false);
    }
    // email
    if (email === "") {
      showMess("tbEmail", "Vui lòng nhập email", true);
    } else if (!regexMail.test(email)) {
      showMess("tbEmail", "Vui lòng nhập đúng email", true);
    } else {
      showMess("tbEmail", "", false);
    }
    // password
    if (password === "") {
      showMess("tbMatKhau", "Vui lòng nhập password", true);
    } else if (!regexPass.test(password)) {
      showMess(
        "tbMatKhau",
        "Mật khẩu từ sáu đến tám ký tự, ít nhất một chữ hoa, một chữ thường và một số",
        true
      );
    } else {
      showMess("tbMatKhau", "", false);
    }
    // password
    if (luongCB === "") {
      showMess("tbLuongCB", "Vui lòng nhập lương cơ bản", true);
    } else if (luongCB < 1000000 || luongCB > 10000000) {
      showMess(
        "tbLuongCB",
        "Lương cơ bản phải từ 1.000.000đ đến 10.000.000đ",
        true
      );
    } else {
      showMess("tbLuongCB", "", false);
    }
    // possition
    if (possition === "") {
      showMess("tbChucVu", "Vui lòng chọn chức vụ", true);
    } else {
      showMess("tbChucVu", "", false);
    }
    // datepicker tbNgay
    if (workingDay === "") {
      showMess("tbNgay", "Vui lòng chọn ngày làm", true);
    } else {
      showMess("tbNgay", "", false);
    }
    // workingtime
    if (workingtime === "") {
      showMess("tbGiolam", "Vui lòng nhập giờ làm", true);
    } else if (workingtime < 80 || workingtime > 200) {
      showMess("tbGiolam", "Lương cơ bản phải từ 80 đến 200", true);
    } else {
      showMess("tbGiolam", "", false);
    }
    // end validate
    const notify = $$(".sp-thongbao");
    const isError = Array.from(notify).every((item) => item.innerHTML === "");
    console.log(isError);
    if (!isError) return;
    const formData = {
      id: initData.length + 1,
      username,
      fullname,
      email,
      workingDay,
      possition,
      luongCB,
      workingtime,
      totalSalary: computedSalary(possition, luongCB),
      ranking: computedRanking(workingtime),
    };
    if (!user) {
      initData.push(formData);
      renderTable(initData);
      return;
    }
    user.username = username;
    user.email = email;
    user.workingDay = workingDay;
    user.fullname = fullname;
    user.luongCB = luongCB;
    user.possition = possition;
    user.workingtime = workingtime;
    user.totalSalary = computedSalary(possition, luongCB);
    user.ranking = computedRanking(workingtime);
    renderTable(initData);
  };
}

// methods computed total salary
function computedSalary(possition, luong) {
  console.log(luong);
  switch (possition) {
    case "Sếp":
      return Number(luong) * 3;
    case "Trưởng phòng":
      return Number(luong) * 2;
    default:
      return Number(luong);
  }
}
// methods computed ranking
function computedRanking(time) {
  console.log(time);
  if (time >= 192) {
    return "Nhân viên xuất sắc";
  } else if (time >= 176) {
    return "Nhân viên giỏi";
  } else if (time >= 160) {
    return "Nhân viên khá";
  } else {
    return "Nhân viên trung bình";
  }
}
// show mess
function showMess(span, mess, isShow) {
  if (isShow) {
    const sp = $(`#${span}`);
    sp.style.display = "block";
    sp.innerHTML = mess;
  } else {
    const sp = $(`#${span}`);
    sp.style.display = "none";
    sp.innerHTML = "";
  }
}
// filter with ranking
function handleFilter() {
  $$(".filterRanking").forEach((item) => {
    item.onclick = () => {
      console.log(item.innerText);
      const newData = initData.filter(
        (data) => data.ranking === item.innerText
      );
      renderTable(newData);
    };
  });
}
const addBtn = $("#btnThemNV");
handleFilter();
addUser(addBtn);
renderTable(initData);

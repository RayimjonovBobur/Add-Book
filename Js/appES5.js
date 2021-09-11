const kitobNomi = document.getElementById("kitobNomi");
const container = document.querySelector(".main-Container");
const mualifi = document.getElementById("mualif");
const sana = document.getElementById("sana");
const formKitob = document.querySelector("form");
const kitobRoyxati = document.querySelector(".kitob-royxati");

//consturctor function
function Kitob(nomi, yozuvchi, sana) {
  (this.nomi = nomi), (this.yozuvchi = yozuvchi), (this.sana = sana);
}

// UI conustractor
function UI() {}

// prototaype
UI.prototype.kitobQosh = function (kitob) {
  // create table row
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${kitob.nomi}</td>
  <td>${kitob.yozuvchi}</td>
  <td>${kitob.sana}</td>
    <td>
    <i class="ochirish fas fa-times"></i>
    </td>
  `;
  kitobRoyxati.appendChild(row);
};

UI.prototype.xabarKorsat = function (xabar, classList) {
  //div
  const div = document.createElement("div");
  div.classList.add("alert_info");

  div.innerHTML = `
    <div class="alert alert-${classList}" role="alert">
  ${xabar}
   </div>
    `;

  container.insertBefore(div, formKitob);
  setTimeout(function () {
    document.querySelector(".alert_info").remove();
  }, 3000);
};

// tozalash
UI.prototype.inputTozalsh = function () {
  kitobNomi.value = "";
  sana.value = "";
  mualifi.value = "";
};

//event listener
formKitob.addEventListener("submit", (e) => {
  e.preventDefault();

  const kitob = new Kitob(kitobNomi.value, mualifi.value, sana.value);

  // kitob qo'shmoq
  const ui = new UI();

  // input bosh bolganda
  if (kitobNomi.value == "" || mualifi.value == "" || sana.value == "") {
    ui.xabarKorsat("Hech narsa kiritilmadi", "danger");
  } else {
    // Qo'shish
    ui.xabarKorsat("Kitob qo'shildi !", "primary");

    // kITOB QOSHISH
    ui.kitobQosh(kitob);

    // INPUT TOZALASH
    ui.inputTozalsh();
  }
});

kitobRoyxati.addEventListener("click", function (e) {
  const item = e.target;
  if (e.target.classList[0] == "ochirish") {
    const parentItem = item.parentElement.parentElement;
    new UI().xabarKorsat("Kitob o'chirish !", "info");
    parentItem.remove();
  }
});

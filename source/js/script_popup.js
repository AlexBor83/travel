const main = document.querySelector(".main")

    const openedModalBuys = document.querySelectorAll(".button__buy");
    const modalBuy = document.querySelector(".modal-buy");
    const forms = modalBuy.querySelectorAll(".form")
    const modalClouse = document.querySelectorAll(".button__clouse");
    const telModal = modalBuy.querySelector(".modal-buy__input--tel");
    const mailModal = modalBuy.querySelector(".modal-buy__input--mail");
    const buttonForm = document.querySelectorAll(".button__form")
    const modalOk = document.querySelector(".modal-ok")

    openedModalBuys.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        modalBuy.classList.add("modal-buy--active");
        telModal.value = localStorage.getItem("tel");
        mailModal.value = localStorage.getItem("mail");
        telModal.focus();


      })
    });

    buttonForm.forEach(item => {
      item.addEventListener("click", function (e) {
        if (!telModal.value || !mailModal.value) {
          e.preventDefault();
        } else {
          e.preventDefault();
          localStorage.setItem("tel", telModal.value);
          localStorage.setItem("mail", mailModal.value);
          modalOk.classList.add("modal-ok--active")
        }
      })
    });


    modalClouse.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        modalBuy.classList.remove("modal-buy--active");
        modalOk.classList.remove("modal-ok--active");
      })

    });


    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 27) {
        e.preventDefault();
        modalBuy.classList.remove("modal-buy--active");
        modalOk.classList.remove("modal-ok--active");
      }
    });


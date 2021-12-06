const btn = document.querySelector(".add_size_btn");
let sizes = [];
let sizeFull = false;

btn.addEventListener("click", () => {
    btn.insertAdjacentHTML("beforeBegin",
        `<div class="select_box">
    <button class="btn_Remove" type="button"></button> 
    <select name="" class="added">
        <option selected disabled>Choose size</option>
        <option value="xs">Extra small</option>
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
        <option value="xl">Extra Large</option>
    </select>
    <input type="number" name="" placeholder="Quantity" min="1" disabled>
    </div>`);
    btn.disabled = true;

    const selector = document.querySelector(".added");
    const optionEl = Array.from(selector.children);

    optionEl.forEach((el) => {
        for (size of sizes) {
            if (size === el.value) el.disabled = true;
        }
    });

    selector.addEventListener("change", function() {
        this.setAttribute("name", "size-" + this.value);
        this.nextElementSibling.setAttribute("name", "qty-" + this.value);
        this.nextElementSibling.removeAttribute("disabled");
        this.nextElementSibling.value = 1;

        this.disabled = true;
        btn.disabled = false;

        sizes.push(this.value);
        if (sizes.length === optionEl.length - 1) {
            btn.disabled = true
            sizeFull = true
        }
    });

    document.querySelector(".added").classList.remove("added");

    const btnRemoves = document.querySelectorAll(".btn_Remove");

    btnRemoves.forEach((btnR) => {
        if (!btnR.hasAttribute("eventListener")) {
            btnR.setAttribute("eventListener", true);
            btnR.addEventListener("click", function() {
                this.parentElement.remove();
                if (this.nextElementSibling.hasAttribute("disabled")) {
                    sizes = sizes.filter((size) => {
                        if (size !== this.nextElementSibling.value) return size
                    })
                }
                if (!sizes.length) btn.disabled = false;
                if (sizeFull && sizes.length < optionEl.length - 1) {
                    btn.disabled = false;
                    sizeFull = false;
                }
            })
        }
    })
});
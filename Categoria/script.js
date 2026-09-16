const btnAdicionar = document.getElementById("btnAdicionar");
const lista = document.getElementById("items");
btnAdicionar.addEventListener("click", async () => {
    const name = prompt("Nome do item:");
    if (!name) return;

    const desc = prompt("Descrição do item:");
    if (!desc) return;

    const image = prompt("URL da imagem:");
    if (!image) return;

    await criarItem(name, desc, image);

    lista.innerHTML = "";
    await render();
});

async function criarItem(name, desc, image) {
    const { data, error } = await supabaseClient.from('items')
        .insert({
            name,
            desc,
            image
        })
        .select();

    if (error) {
        console.log("Erro!");
        return;
    }
    console.log("Item criado")

};

async function render() {
    const { data, error } = await supabaseClient.from('items').select("*");

    if (data) {
        const items = await data;
        items.forEach(item => {
            const el = document.createElement("div");
            el.classList.add("item");
            el .innerHTML = `
                <div class="imagem">
                    <img src="${item.image}" alt="" loading="lazy">
                </div>
                <div class="informacoes">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <p>${item.id}</p>
                </div>
            `
            lista.appendChild(el);
        });
    }

    if(error) {
        console.log("Error", error);
    }
}

render()
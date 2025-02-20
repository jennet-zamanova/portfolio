console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

let pages = [
	{url: "", title: "Homes"},
	{url: "projects/", title: "Projects"},
    {url: "contact/", title: "Contact"},
	{url: "resume/", title: "Resume"},
    {url: "https://github.com/jennet-zamanova", title: "Github"}
];

let nav = document.createElement("nav");
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains("home");


for (let p of pages) {
	let url = p.url;
    let title = p.title;

    if (!ARE_WE_HOME && !url.startsWith("http")) {
        url = "../" + url;
    }    

    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    a.target = a.host !== location.host ? "_blank" : "_self";
    
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }
    
    nav.append(a);
}

document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme">
		Theme:
		<select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
		</select>
	</label>`
);

let select = document.querySelector("select");
select.addEventListener("input", function (event) {
	console.log("color scheme changed to", event.target.value);
    localStorage.colorScheme = event.target.value;
    document.documentElement.style.setProperty("color-scheme", event.target.value);
});

if (localStorage.colorScheme) {
	document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
	select.value = localStorage.colorScheme;
}


let form = document.querySelector("form");

form?.addEventListener("submit", function (event) {
	event.preventDefault();
    let data = new FormData(form);
    let url = form.action + "?";
    for (let [name, value] of data) {
        url += (name + "=" + encodeURIComponent(value) + "&");
    }
    console.log("the url: ", url);
    location.href = url;
})

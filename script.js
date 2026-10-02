const searchInput=document.getElementById("searchInput");
const cards=[...document.querySelectorAll(".doc-card")];
const resultCount=document.getElementById("resultCount");
const noResults=document.getElementById("noResults");

function filterDocs(){
  const query=searchInput.value.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const text=`${card.innerText} ${card.dataset.search||""}`.toLowerCase();
    const match=!query||text.includes(query);
    card.hidden=!match;
    if(match) visible++;
  });
  resultCount.textContent=query?`${visible} найдено`:`${cards.length} разделов`;
  noResults.hidden=visible!==0;
}
searchInput.addEventListener("input",filterDocs);

document.addEventListener("keydown",event=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){
    event.preventDefault();searchInput.focus();searchInput.select();
  }
});

document.querySelector(".brand").addEventListener("click",event=>{
  event.preventDefault();window.location.href="index.html";
});

// Initial theme follows the device. Manual choice lasts for this page session.
const themeButton=document.getElementById("themeButton");
const themeIcon=document.getElementById("themeIcon");
const themeMenu=document.getElementById("themeMenu");
const themeOptions=[...themeMenu.querySelectorAll("[data-theme]")];
const prefersLight=window.matchMedia("(prefers-color-scheme: light)");

function deviceTheme(){return prefersLight.matches?"light":"dark";}
function setTheme(theme){
  document.body.classList.remove("light","space");
  if(theme==="light")document.body.classList.add("light");
  if(theme==="space")document.body.classList.add("space");
  const icons={dark:"☾",light:"☀",space:"✦"};
  themeIcon.textContent=icons[theme];
  themeButton.setAttribute("aria-label",`Тема: ${theme==="space"?"космос":theme==="light"?"светлая":"тёмная"}`);
}
setTheme(deviceTheme());
prefersLight.addEventListener("change",()=>{if(!document.body.dataset.manualTheme)setTheme(deviceTheme());});

themeButton.addEventListener("click",event=>{
  event.stopPropagation();
  themeMenu.classList.toggle("open");
  themeButton.setAttribute("aria-expanded",themeMenu.classList.contains("open"));
});
themeOptions.forEach(option=>{
  option.addEventListener("click",()=>{
    document.body.dataset.manualTheme="true";
    setTheme(option.dataset.theme);
    themeMenu.classList.remove("open");
    themeButton.setAttribute("aria-expanded","false");
  });
});
document.addEventListener("click",event=>{
  if(!event.target.closest(".theme-picker")){
    themeMenu.classList.remove("open");
    themeButton.setAttribute("aria-expanded","false");
  }
});

// Support/Login are intentionally unavailable for now.
const toast=document.getElementById("toast");
const toastClose=document.getElementById("toastClose");
let toastTimer;
function showDevelopmentToast(){
  clearTimeout(toastTimer);
  toast.classList.add("show");
  toastTimer=setTimeout(()=>toast.classList.remove("show"),4300);
}
toastClose.addEventListener("click",()=>{
  clearTimeout(toastTimer);toast.classList.remove("show");
});


// Every unavailable navigation action opens the same animated development notice.
document.querySelectorAll(".action-button, .action-card").forEach(element => {
  element.addEventListener("click", showDevelopmentToast);
  if (element.classList.contains("action-card")) {
    element.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showDevelopmentToast();
      }
    });
  }
});

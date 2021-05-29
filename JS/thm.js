function changeThm() {

    switch (drop.value) {
        case "thm1": document.getElementsByTagName("link").style.href = "style/sidepages.css";
            return localStorage.setItem("result", "style/sidepages.css");
            break;
        case "thm2": document.getElementsByTagName("link").style.href = "style/sidepages_2.css";
            return localStorage.setItem("result", "style/sidepages_2.css");
            break;
        case "thm3": document.getElementsByTagName("link").style.href = "style/sidepages_3.css";
            return localStorage.setItem("result", "style/sidepages_3.css");
            break;
        default: localStorage.setItem("result", "style/sidepages_3.css");

    }
}
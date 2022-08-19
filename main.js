let userInput = document.querySelector(".input");
let button = document.querySelector(".button");
let reposResult = document.querySelector(".repos");

reposResult.textContent = "No data to show";
reposResult.style = "opacity:.9;color:767676;font-size:14px";

button.onclick = () => getRepos();
userInput.onkeydown = (e) => {
  if (e.code == "Enter") {
    getRepos();
  }
};

getRepos = () => {
  if (userInput.value == "") {
    reposResult.textContent = "No data";
  } else {
    reposResult.textContent = "";
    reposResult.style = "";
    fetch(`https://api.github.com/users/${userInput.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        result.forEach((repo) => {
          let div = document.createElement("div");
          let h3 = document.createElement("h3");
          h3.classList.add("title");
          let h3Text = document.createTextNode(repo.name);
          h3.append(h3Text);
          div.append(h3);

          let visit = document.createElement("a");
          visit.classList.add("visit");
          visit.setAttribute("href", repo.html_url);
          visit.setAttribute("target", "_blank");
          let visitText = document.createTextNode("Visit");
          visit.append(visitText);
          div.append(visit);
          let numberOfStars = document.createElement("p");
          numberOfStars.classList.add("stars");
          let numberOfStarsText = document.createTextNode(
            repo.stargazers_count
          );
          numberOfStars.append(numberOfStarsText);
          div.append(numberOfStars);
          if (repo.fork == false) {
            let download = document.createElement("a");
            download.classList.add("download");
            download.setAttribute(
              "href",
              `https://github.com/${userInput.value}/${repo.name}/archive/refs/heads/main.zip`
            );
            let downloadText = document.createTextNode("Download");
            download.append(downloadText);
            div.append(download);
          }
          if (repo.has_pages) {
            let demo = document.createElement("a");
            demo.setAttribute(
              "href",
              `https://${repo.owner.login.toLowerCase()}.github.io/${repo.name}`
            );
            demo.setAttribute("target", "_blank");
            demo.classList.add("demo");
            let demotext = document.createTextNode("View Demo");
            demo.append(demotext);
            div.append(demo);
          }

          reposResult.append(div);
        });
      });
  }
};

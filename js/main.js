  let $player = document.getElementById("player")
  let $play = document.querySelector(".playBtn")
  let $div = document.querySelector(".player")
  let $name = document.querySelector(".music_name")
  let $img = document.querySelector(".music__img")
  let $duration = document.querySelector(".duration");
  let $pause = document.querySelector(".puseBtn")
  let $prev = document.querySelector(".prevBtn")
  let $next = document.querySelector(".nextBtn")
  let $min = document.querySelector(".minut")
  let $sec = document.querySelector(".second")
  let $btnn = document.querySelector(".btn")
  let $progress = document.querySelector("#progress")
  let $volume = document.querySelector("#volume")
  let $musicVolume = document.querySelector(".musicVolume")
  let $musicLists = document.querySelector(".lists")
  let $musicSearch = document.querySelector(".searchInp")
  let $likeBtn = document.querySelector(".btnModal")
  let $likeList = document.querySelector(".header__btn")










  let $time = document.querySelector(".time")


  let musicplayers = [{
      name: "Har kun",
      img: "https://i.ytimg.com/vi/FRZ6ldGsD74/sddefault.jpg",
      music: "../music/mus-1.mp3",
    },
    {
      name: "Bolaligim",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/75/81/32/7581321c-2ae7-3ced-324c-7e66bb42d449/5059580616489_cover.jpg/600x600bf-60.jpg",
      music: "../music/mus-2.mp3",
    },
    {
      name: "Yurak",
      img: "https://i.ytimg.com/vi/4MCYhJ3YPTU/maxresdefault.jpg",
      music: "../music/mus-3.mp3",
    },
    {
      name: "Odamlar",
      img: "https://i.ytimg.com/vi/SoMVksY7Tbg/maxresdefault.jpg",
      music: "../music/mus-4.mp3",
    },
    {
      name: "Dunyo",
      img: "https://muzfm.tv/_ipx/q_85&fit_cover&f_webp&s_200x200/muzfm/uploads/images/people/2025/08/mashhur-muhammad_1754414544.jpg",
      music: "../music/mus-5.mp3",
    }

  ];


  let currentIndex = 0;


  function updatePlayer() {
    if (musicplayers[currentIndex]) {  
      $name.innerHTML = musicplayers[currentIndex].name;
      $img.src = musicplayers[currentIndex].img;
      $player.src = musicplayers[currentIndex].music;
    } else {
      console.error("❌ currentIndex noto‘g‘ri:", currentIndex);
    }
  }
  updatePlayer();
  $play.addEventListener("click", () => {

    $player.play()

  })
  $pause.addEventListener("click", () => {
    $player.pause()
  })

  $next.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= musicplayers.length) currentIndex = 0
    $player.src = musicplayers[currentIndex]

    updatePlayer();
    $player.play()
  })
  $prev.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) currentIndex = musicplayers.length - 1
    $player.src = musicplayers[currentIndex]
    updatePlayer();
    $player.play()
  })
  $player.addEventListener("timeupdate", () => {
    let currentTime = Math.floor($player.currentTime)
    $progress.value = ($player.currentTime / $player.duration) * 100;
    let minut = Math.floor(currentTime / 60)
    let second = currentTime % 60

    if (second < 10) second = "0" + second
    if (minut < 10) minut = "0" + minut
    $min.textContent = `${minut }`
    $sec.textContent = second
    if ($player.duration) {
      let musicMinuts = Math.floor($player.duration / 60)
      let musicSeconds = Math.floor($player.duration % 60)

      if (musicSeconds < 10) musicSeconds = "0" + musicSeconds;
      if (musicSeconds < 10) musicMinuts = "0" + musicMinuts;
      $duration.textContent = musicMinuts + ":" + musicSeconds
    }
  })
  $progress.addEventListener("input", () => {

    let newTime = ($progress.value / 100) * $player.duration;
    $player.currentTime = newTime

  })
  $player.addEventListener("ended", () => {
    currentIndex++;

    if (currentIndex >= musicplayers.length) currentIndex = 0
    $player.src = musicplayers[currentIndex]

    updatePlayer();
    $player.play()
  })
  $volume.addEventListener("input", () => {
    $player.volume = $volume.value / 100
    let ovoz = Math.round($volume.value)
    $musicVolume.innerText = "ovoz:" + ovoz + "%"

  })
  musicplayers.forEach((item, index) => {

    let $box = document.createElement("tr");
    $box.innerHTML = `
    <td class="musicBox"><h1>${item.name}</h1></td>
    <td class="musicBox"><img src="${item.img}" alt=""></td>
    <td class="musicBox"><button data-index="${index}">play</button></td>
    <td class="musicBox"><button class="likeBtn" data-id="${index}">💙</button></td>
  `;
    $musicLists.appendChild($box);

  });



$musicLists.addEventListener("click",(e)=>{
if(e.target.tagName.toLowerCase() === "button"){
let clickBtn = e.target.dataset.index;

currentIndex = clickBtn;

updatePlayer()

$player.play()
}
})
$musicSearch.addEventListener("keyup", (e) => {
  let searchValue = $musicSearch.value.toLowerCase().trim();
  if (searchValue === "") {
    showMusicList(musicplayers);
  } else {
    let result = musicplayers.filter(music =>
      music.name.toLowerCase().includes(searchValue)
      
     
    );
    if(e.target.tagName.toLowerCase() === "button"){
      let clickBtn = e.target.dataset.index;
      currentIndex = clickBtn;

      
      updatePlayer()
      
      $player.play()
      }


    if (result.length > 0) {
      showMusicList(result);
    } else {
      $musicLists.innerHTML =` <tr><td colspan="3">Qo‘shiq topilmadi 😢</td></tr>;`
    }
  }
});
function showMusicList(list) {
  $musicLists.innerHTML = "";
  list.forEach((item) => {
   
    let realIndex = musicplayers.findIndex(m => m.name === item.name);
  
    let $box = document.createElement("tr");
    $box.innerHTML = `
      <td class="musicBox"><h1>${item.name}</h1></td>
      <td class="musicBox"><img src="${item.img}" alt=""></td>
      <td class="musicBox">
        <button class="playBtn" data-index="${realIndex}" data-src="${item.music}">▶️ Play</button>
      </td>
    `;
    $musicLists.append($box);
  });
  

  let playBtns = document.querySelectorAll(".playBtn");
  playBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.src; 
      const data = btn.dataset.index;
  
      currentIndex = parseInt(data);  
      $player.src = src;
      $player.play();
  
      updatePlayer();
    });
  });
  
}


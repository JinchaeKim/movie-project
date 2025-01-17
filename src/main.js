//1. fetch 함수로 API 불러오기
//2. for문으로 데이터 하나씩 찍어내기
//2-1. Ul태그와 연결하기
//3. 검색 기능 만들기
//3-1. 검색 버튼에 이벤트리스너
//3-2. 데이터 가져오는 함수 / 뿌려주는 함수로 나누기
//4. 필터링 적용하기
//4-1. 버튼을 눌렀을 때, title에 입력한 값이 포함되어 있는지 필터링

const btn = document.querySelector(".btn");
const searchInput = document.querySelector("#searchInput");
const modal = document.querySelector(".modal");
// const close = document.querySelector(".close");
const baseImgUrl = "https://image.tmdb.org/t/p/w500";
const cardSection = document.querySelector(".cards");
const modalSection = document.querySelector(".modal-content");

let postArray = [];

// // console.log(postArray); // 빈 배열인 게 맞으며, 지금 수준에서는 확인하기 어려움
// import { fetchData } from "./api,js";

async function fetchData() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=e48a4be214cf8c1ba48dfde47aef4669&language=ko-KR&page=1"
    );
    const 결과 = await res.json();
    console.log(결과);

    postArray = 결과.results;
    // input : 객체 '결과' 중 results의 값 (배열)
    displayPost(postArray);
  } catch (errer) {
    cardSection.innerHTML = "오류가 발생했습니다!";
  }
}
fetchData();

// [메인화면 영화 카드 구현]
// input : 결과의 results만 담은 배열
function displayPost(posts) {
  temp_html = "";

  for (let i = 0; i < posts.length; i++) {
    temp_html += `
    <div data-id="${posts[i].id}" class="mvCard">
         <img id="poster" src="${
           baseImgUrl + posts[i].poster_path
         } class="card-img-top" alt="poster">
         <p class="cdtitle">${posts[i].title}</p>
         <p class="cdaver">🍿 ${
           posts[i].vote_average
         }<span id="mvaver"></span></p>
    </div>`;
  }
  cardSection.innerHTML = temp_html;
}

// [엔터키 검색 기능] start.
function searchMV() {
  const keyword = searchInput.value;

  const filterPosts = postArray.filter((영화) => {
    return 영화.title.includes(keyword);
  });
  console.log(filterPosts);
  displayPost(filterPosts);
}

function enterkey() {
  if (window.event.keyCode == 13) {
    searchMV();
  }
}
// 엔터키 end.

// [모달창 내용 함수]
function displayModal(info) {
  temp_modal = `<div data-id="${info.id}" class="modalCard">
         <img id="mdPoster" src="${
           baseImgUrl + info.poster_path
         } class="modal-img-top" alt="poster">
         <div class="bottomWrap">
         <h1 class="mdtitle">${info.title}</h1>
         <p class="mdcontent">${info.overview}</p>
         <h3>🍿 ${info.vote_average}<span id="mvaver"></span></h3>
         <span class="close">&times;</span>
         <button class="mdbookBtn">북마크 추가</button>
         </div>
    </div>`;

  modalSection.innerHTML = "";
  modalSection.insertAdjacentHTML("afterbegin", temp_modal);
}

// 로컬스토리지 bookmarklist 초기화
let bookmarkedList = localStorage.getItem("bookmarklist") || [];

//[모달창 이벤트리스너]
modal.addEventListener("click", (e) => {
  // 모달창 닫기
  e.target.classList.contains("close")
    ? ((modal.style.display = "none"),
      (document.body.style.overflow = "scroll"))
    : null;

  // 모달창 ID 로컬 스토리지에 추가 start-->
  const modalCard = e.target.closest(".modalCard");
  const modalID = modalCard.getAttribute("data-id");
  // <--end.

  e.target.classList.contains("mdbookBtn")
    ? swal("북마크에 추가되었습니다!")
    : null;
});

// [모달창 띄우기 및 내용 구성]
// data-id를 가져오기 (변수 선언)
// postArray의 id와 cardId 비교하기 (find메서드)
cardSection.addEventListener("click", (e) => {
  const mvCard = e.target.closest(".mvCard");
  if (!mvCard) {
    return;
  }

  const cardID = mvCard.getAttribute("data-id");
  console.log(cardID);

  const clickModal = postArray.find((postArray) => {
    return Number(postArray.id) === Number(cardID);
  });
  console.log(clickModal);
  displayModal(clickModal);

  const modalBookmarkBtn = document.querySelector(".mdbookBtn");

  // 모달창 내 북마크 버튼 클릭 시, 영화 정보 로컬스토리지 저장
  modalBookmarkBtn.addEventListener("click", () => {
    bookmarkedList.push(clickModal);
    localStorage.setItem("bookmarklist", JSON.stringify(bookmarkedList));
  });

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

// 북마크 보기 버튼 이벤트리스너
bookBtn.addEventListener("click", () => {
  function getBookmarks(modalID) {
    const localData = JSON.parse(localStorage.getItem(modalID));

    // 로컬스토리지에서 가져온 id로 api 넣기
    for (let i = 0; i < localStorage.length; i++) {
      displayPost(localData[i]);
    }
  }
});

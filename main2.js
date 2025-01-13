//1. fetch 함수로 API 불러오기
//2. for문으로 데이터 하나씩 찍어내기
//2-1. Ul태그와 연결하기
//3. 검색 기능 만들기
//3-1. 검색 버튼에 이벤트리스너
//3-2. 데이터 가져오는 함수 / 뿌려주는 함수로 나누기
//4. 필터링 적용하기
//4-1. 버튼을 눌렀을 때, title에 입력한 값이 포함되어 있는지 필터링

const moviesUl = document.querySelector("#movies");
const btn = document.querySelector(".btn");
const searchInput = document.querySelector("#searchInput");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

let postArray = [];
console.log(postArray);

function fetchData() {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=e48a4be214cf8c1ba48dfde47aef4669&language=ko-KR&page=1"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (결과) {
      console.log(결과);

      let postArray = 결과.results;
      displayPost(결과);
    });
}
fetchData();

function displayPost(posts) {
  emptyStr = "";

  for (let i = 0; i < posts.results.length; i++) {
    emptyStr += `<li class="item" data-id="${posts.results[i].id}">${posts.results[i].title}</li>`;
  }
  moviesUl.innerHTML = emptyStr;
}

btn.addEventListener("click", function () {
  const keyword = searchInput.value;

  const filterPosts = postArray.filter(function (영화) {
    return 영화.title.includes(keyword);
  });
  console.log(filterPosts);
  displayPost(filterPosts);
});

moviesUl.addEventListener("click", function (e) {
  console.log(e.target);

  // 새롭게 fetching 하는 로직(item 하나에 대해서)

  modal.style.display = "block";
});

close.addEventListener("click", function () {
  modal.style.display = "none";
});

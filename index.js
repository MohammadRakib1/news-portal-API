const loadCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();

    const categoryContainer = document.getElementById('category-bar-container');
    data.data.news_category.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button onclick='loadNews("${item.category_id}")' class="nav-btn">${item.category_name}</button>
        `;
        categoryContainer.appendChild(div);
    })
}

const loadNews = async (catId) => {
    // console.log(catId);

    document.getElementById('loading-spiner').style.display = 'block';

    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    const data = await res.json();
    // console.log(data)
    const allData = data.data;

    const newsContainer = document.getElementById('news-container');

    newsContainer.innerHTML = '';

    allData.forEach((item) => {

        document.getElementById('loading-spiner').style.display = 'none';

        const div = document.createElement('div');
        div.classList.add('singleNews');
        div.innerHTML = `
        <div class="news-photo">
        <img class="img"
          src=${item.image_url}
          alt=""
        />
      </div>
      <div class="news-info">
        <div class="news-header">
          <h4>${item.title}</h4>
          <p class="news-badge">${item.rating.badge}
          <sup> <h6 class="news-rating">${item.rating.number} </h6></sup>
          </p>
        </div>
        <p>
            ${item.details.slice(0, 200)}
        </p>

        <div class="news-footer">
          <div class="author">
            <div class="">
              <img
                class="author-img"
                src=${item.author.img}
                alt=""
              />
            </div>
            <div class="author-info">
              <h6>${item.author.name}</h6>
              <p>${item.author.published_date}</p>
            </div>
          </div>
          <div class="Views author">
            <img
              class="view-img"
              src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/view-icon.png"
              alt=""
            />
            <p>${item.total_view}</p>
          </div>
          <div class="details-btn-container">
            <button onclick="handleDetails()" class="details-btn">Details</button>
          </div>
      </div>
    </div>
        `;
        newsContainer.appendChild(div);
    });
}

const handleSearch = () => {
    const value = document.getElementById('search-box').value;

    if (value) {
        loadNews(value)
    }
    else {
        alert('Please Enter a valid Category Id')
    }
}



loadNews('01');

loadCategory();
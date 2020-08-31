import newsBg from '../images/news-id.svg';
import defImg from './../images/default.jpg';

function main() {

    //const baseUrl = "https://newsapi.org/v2";
    const baseUrl = "https://gnews.io/api/v3";
    const country = "country=id";
    const lang = "lang=id";
    //const apiKey = "apiKey=1054895aecda49198498ba73794c16c4";
    const apiKey = "token=3b0e06793d6a316e571646270bcdd2fa";
    //const pageSize = "pageSize=20";
    const modals = document.querySelector("#popModals");
    const newsBack = document.querySelector('#newsBack');
    
    newsBack.src = newsBg;

    const getNewsHeadline = async () => 
    {
        try 
        {
            const response = await fetch(`${baseUrl}/top-news?${country}&${apiKey}`);
            const responseJson = await response.json();
            const titleHeader = `Indonesia Headline News`;

            if (responseJson.error) 
            {
                showResponseMessage(responseJson.message);
            } 
            else 
            {
                renderAllNews(responseJson.articles, titleHeader);
            }
        } 
        catch(error) 
        {
            showResponseMessage(error);
        }
    };

    const getNewsResult = async (article) => 
    {
        try 
        {
            const response = await fetch(`${baseUrl}/search?q=${article}&${apiKey}`);
            const responseJson = await response.json();
            let titleHeader;

            if (responseJson.error) 
            {
                showResponseMessage(responseJson.message);
            } 
            else 
            {
                if (responseJson.totalResults == 0) 
                {
                    titleHeader = `No articles found`;
                    modals.renderError(titleHeader);
                }
                else
                {
                    titleHeader = `Search Results for ${article} News`;
                }

                renderAllNews(responseJson.articles, titleHeader);
            }
        } 
        catch(error) 
        {
            showResponseMessage(error);
        }
    };


    const getNewsCategory = async (category) => 
    {
        try 
        {
            const response = await fetch(`${baseUrl}/topics/${category}?${country}&${apiKey}`);
            const responseJson = await response.json();
            const titleHeader = `Headline ${category} News`;

            if (responseJson.error) 
            {
                showResponseMessage(responseJson.message);
            } 
            else 
            {
                renderAllNews(responseJson.articles, titleHeader);
            }
        } 
        catch(error) 
        {
            showResponseMessage(error);
        }
    };

    const renderAllNews = (articles, titles) => {
        const titleContent = document.querySelector("#titleContent");
        const tes = document.querySelector("#tes");

        titleContent.innerHTML = `        
        <h2 class="content-header text-center bold mt-5 pt-3 mb-4"> ${titles} </h2>
            <div class="content-item">
                <div id="listNews" class="row justify-content-around mt-4 parent-reviews">
                </div>
            </div>
        `;

        const listNews = document.querySelector("#listNews");
        listNews.innerHTML = "";

        articles.forEach(article => {
            if(article.image == null) {
                article.image = defImg
            }
            listNews.innerHTML += `
            <a class="revs reviews my-3 mx-1" target="_blank" href="${article.url}">
                    <div class="reviews-content w-100">
                        <div class="reviews-icon">
                            <img src="${article.image}" alt="Image about ${article.title}">
                        </div>
                        <div class="reviews-text text-left pb-4">
                            <h4 class="bold">${article.title}</h4>
                            <p>${article.description}</p>
                        </div>
                    </div>
                    <br>
                    <p class="reviews-status">Published at ${article.publishedAt.substring(0, 10)} by ${article.source.name}</p>
                </a>
            `;
        });

        titleContent.scrollIntoView();
    };

    const showResponseMessage = (message = "Please check your internet connection") => {
        modals.renderError(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const inputNews = document.querySelector("#inputSearch");
        const btnSearch = document.querySelector("#btnSearch");

        btnSearch.addEventListener("click", function () {
            const article = inputNews.value;
            if (article === "") 
            {
                modals.renderError("Topic Input Cannot Empty");
                inputNews.focus();
            }
            else
            {
                getNewsResult(article)
            }
        });

        getNewsResult("covid 19");
        //getNewsHeadline();

        const btnNav = document.querySelector("#searchNav");
        btnNav.addEventListener("click", event => {
            inputNews.focus();
        })

        const cekBox = document.querySelector("#menu_toggle");

        const btnCategory = document.querySelectorAll(".category");
        btnCategory.forEach(btnCat => {
            btnCat.addEventListener("click", event => {
                cekBox.checked = false;
                const categoryName = event.target.id;
                getNewsCategory(categoryName);
            })
        })

    });

}

export default main;
(this.webpackJsonpmovie8r=this.webpackJsonpmovie8r||[]).push([[0],[,,,,,,,,function(e,t,a){},,function(e,t,a){e.exports=a(17)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(9),s=a.n(i),c=(a(15),a(7),a(8),a(2)),l=a(3),o=a(1),u=a(5),m=a(4),d=(a(16),function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(c.a)(this,a),(r=t.call(this,e)).handleSearchButtonClick=r.handleSearchButtonClick.bind(Object(o.a)(r)),r.handleKeyPress=r.handleKeyPress.bind(Object(o.a)(r)),r}return Object(l.a)(a,[{key:"handleSearchButtonClick",value:function(){var e=document.querySelector("#search-input"),t=e.value;""!==t&&(e.value="",e.placeholder=t,e.blur(),this.props.newSearch(t))}},{key:"handleKeyPress",value:function(e){if("Enter"===e.key){var t=document.querySelector("#search-input"),a=t.value;t.value="",t.placeholder=a,t.blur(),this.props.newSearch(a)}}},{key:"render",value:function(){return n.a.createElement("div",{id:"search-container",className:"grid-x"},n.a.createElement("div",{className:"cell small-12"},n.a.createElement("input",{id:"search-input",className:"search","aria-label":"Search text input",type:"search",placeholder:"Search",onKeyPress:this.handleKeyPress}),n.a.createElement("button",{type:"button",id:"search-button",className:" button","aria-label":"search button",onClick:this.handleSearchButtonClick},n.a.createElement("i",{className:"fi-magnifying-glass"}))))}}]),a}(n.a.Component)),b=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(c.a)(this,a),(r=t.call(this,e)).handleChange=r.handleChange.bind(Object(o.a)(r)),r}return Object(l.a)(a,[{key:"handleChange",value:function(e){var t;switch(e.target.value){case"New Release":t=0;break;case"Action":t=28;break;case"Adventure":t=12;break;case"Animation":t=16;break;case"Comedy":t=35;break;case"Crime":t=80;break;case"Documentary":t=99;break;case"Drama":t=18;break;case"Family":t=10751;break;case"Fantasy":t=14;break;case"History":t=36;break;case"Horror":t=27;break;case"Music":t=10402;break;case"Mystery":t=9648;break;case"Romance":t=10749;break;case"Science Fiction":t=878;break;case"Thriller":t=53;break;case"War":t=10752;break;case"Western":t=37;break;default:t=0}this.props.genreChange(t)}},{key:"render",value:function(){return n.a.createElement("ul",{id:"genre-container",className:"menu"},n.a.createElement("li",null,n.a.createElement("select",{id:"genre-menu","aria-label":"genre menu",className:"browser-default",onChange:this.handleChange},n.a.createElement("option",{value:"",disabled:!0,hidden:!0},"Genre"),n.a.createElement("optgroup",null,n.a.createElement("option",{style:{fontWeight:"bold"}},"New Release"),n.a.createElement("option",null,"Action"),n.a.createElement("option",null,"Adventure"),n.a.createElement("option",null,"Animation"),n.a.createElement("option",null,"Comedy"),n.a.createElement("option",null,"Crime"),n.a.createElement("option",null,"Documentary"),n.a.createElement("option",null,"Drama"),n.a.createElement("option",null,"Family"),n.a.createElement("option",null,"Fantasy"),n.a.createElement("option",null,"History"),n.a.createElement("option",null,"Horror"),n.a.createElement("option",null,"Music"),n.a.createElement("option",null,"Mystery"),n.a.createElement("option",null,"Romance"),n.a.createElement("option",null,"Science Fiction"),n.a.createElement("option",null,"Thriller"),n.a.createElement("option",null,"War"),n.a.createElement("option",null,"Western")))))}}]),a}(n.a.Component),h=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(c.a)(this,a),(r=t.call(this,e)).handlePageChange=r.handlePageChange.bind(Object(o.a)(r)),r}return Object(l.a)(a,[{key:"handlePageChange",value:function(e){var t,a=document.querySelector("#page"),r=Number(a.innerHTML),n=e.target.id;if("forward-button"===n&&(t=r+1),"back-button"===n){if(1===r)return;t=r-1}this.props.pageChange(t),a.innerHTML=t}},{key:"render",value:function(){return n.a.createElement("div",{id:"pagination",className:"text-center"},n.a.createElement("button",{id:"back-button","aria-label":"page-back-button",onClick:this.handlePageChange},n.a.createElement("i",{className:"fi-arrow-left white-text"})),n.a.createElement("p",{id:"page"},this.props.page),n.a.createElement("button",{id:"forward-button","aria-label":"page-forward-button",onClick:this.handlePageChange},n.a.createElement("i",{className:"fi-arrow-right white-text"})))}}]),a}(n.a.Component),g=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(c.a)(this,a),(r=t.call(this,e)).state={APIKEY:"5dee9b99bfc124fbabfa815c9bb193ba",baseURL:"https://api.themoviedb.org/3/",popularPosterElements:[],movieElements:[],currentURL:"https://api.themoviedb.org/3/discover/movie?&api_key=5dee9b99bfc124fbabfa815c9bb193ba",nextURL:"",page:1,maxPage:1},r.handleMovieClick=r.handleMovieClick.bind(Object(o.a)(r)),r.newSearch=r.newSearch.bind(Object(o.a)(r)),r.genreChange=r.genreChange.bind(Object(o.a)(r)),r.pageChange=r.pageChange.bind(Object(o.a)(r)),r}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;(0,window.$)(document).foundation(),fetch(this.state.currentURL).then((function(e){return e.json()})).then((function(t){if(1===e.state.page){var a=document.querySelector("#back-button i");a.classList.remove("white-text"),a.classList.add("grey-text"),document.querySelector("#back-button").classList.add("disabled")}var r=t.total_pages,i=t.results,s=i.map((function(e){return n.a.createElement("li",{className:"is-active orbit-slide",key:1},n.a.createElement("figure",{className:"orbit-figure"},n.a.createElement("img",{className:"orbit-image",src:"https://image.tmdb.org/t/p/original".concat(e.backdrop_path),alt:"Space"})))})),c=i.map((function(t){return n.a.createElement("div",{className:"movie cell small-4 medium-3 large-2",key:t.id},n.a.createElement("img",{onClick:e.handleMovieClick,src:"https://image.tmdb.org/t/p/w200".concat(t.poster_path),id:t.original_title,alt:t.original_title}))}));e.setState({movieElements:c,maxPage:r,popularPosterElements:s})}))}},{key:"componentDidUpdate",value:function(){var e=this;this.state.nextURL!==this.state.currentURL&&""!==this.state.nextURL&&fetch(this.state.nextURL).then((function(e){return e.json()})).then((function(t){var a=t.total_pages;if(e.state.page===a){var r=document.querySelector("#forward-button i");r.classList.remove("white-text"),r.classList.add("grey-text"),document.querySelector("#forward-button").classList.add("disabled")}if(1===e.state.page){var i=document.querySelector("#back-button i");i.classList.remove("white-text"),i.classList.add("grey-text"),document.querySelector("#back-button").classList.add("disabled")}else{var s=document.querySelector("#back-button i");s.classList.remove("grey-text"),s.classList.add("white-text"),document.querySelector("#back-button").classList.remove("disabled")}var c=t.results,l=document.getElementById("error-callout");0===c.length&&(l.style.display="block");var o=c.map((function(t){return n.a.createElement("div",{className:"movie cell small-4 medium-3 large-2",key:t.id},n.a.createElement("img",{onClick:e.handleMovieClick,src:"https://image.tmdb.org/t/p/w200".concat(t.poster_path),id:t.original_title,alt:t.original_title}))}));e.setState({movieElements:o,currentURL:e.state.nextURL,maxPage:a})}))}},{key:"handleMovieClick",value:function(e){var t=e.target.id;t=(t=(t=t.toLowerCase()).replace(/:/g,"")).replace(/ /g,"-"),window.location.href="https://w1.123moviess.cc/"}},{key:"newSearch",value:function(e){document.querySelector("#forward-button i").classList.add("white-text"),document.querySelector("#forward-button").classList.remove("disabled"),document.querySelector("#genre-menu").getElementsByTagName("option")[0].selected="selected";var t=this.state.currentURL.substring(44),a="".concat(this.state.baseURL,"search/movie?").concat(t),r=a.search("&page=");if(-1!==r){r+=6;var n=a.substring(r).indexOf("&");n=r+n,a=a.substring(0,r)+"1"+a.substring(n)}else r=a.search("/movie?"),r+=7,a=a.substring(0,r)+"&page=1"+a.substring(r);var i=a.search("&query=");-1!==i?(i+=7,a=a.substring(0,i),a+=e):a+="&query=".concat(e);var s=a.search("with_genres=");if(-1!==s){var c=a.substring(s).indexOf("&");c=s+c,a=a.substring(0,s-1)+a.substring(c)}this.setState({nextURL:encodeURI(a),page:1})}},{key:"genreChange",value:function(e){document.querySelector("#forward-button i").classList.add("white-text"),document.querySelector(".search").placeholder="search";var t,a=this.state.currentURL;"https://api.themoviedb.org/3/search/movie?"===this.state.currentURL.substring(0,42)&&(a="https://api.themoviedb.org/3/discover/movie?"+a.substring(42));var r=a.search("&page=");if(-1!==r){r+=6;var n=a.substring(r).indexOf("&");n=r+n,t=a.substring(0,r)+"1"+a.substring(n)}else r=a.search("/movie?"),r+=7,t=a.substring(0,r)+"&page=1"+a.substring(r);if(0===e){var i=t.search("&with_genres=");if(-1!==i){i+=13;var s=t.substring(i).indexOf("&");s=i+s,t=t.substring(0,i-13)+t.substring(s)}else i=t.search("/movie?"),i+=7,t=t.substring(0,i)+t.substring(i)}else{var c=t.search("&with_genres=");if(-1!==c){c+=13;var l=t.substring(c).indexOf("&");l=c+l,t=t.substring(0,c)+e+t.substring(l)}else c=t.search("/movie?"),c+=7,t=t.substring(0,c)+"&with_genres="+e+t.substring(c)}var o=t.search("&query=");-1!==o&&(t=t.substring(0,o)),this.setState({nextURL:encodeURI(t),page:1})}},{key:"pageChange",value:function(e){if(e===this.state.maxPage+1){var t=document.querySelector("#forward-button i");return t.classList.remove("white-text"),t.classList.add("grey-text"),void document.querySelector("#forward-button").classList.add("disabled")}window.scrollTo(0,0);var a=document.querySelector("#forward-button i");a.classList.remove("grey-text"),a.classList.add("white-text"),document.querySelector("#forward-button").classList.remove("disabled");var r,n=this.state.currentURL,i=n.search("page=");if(-1!==i){i+=5;var s=n.substring(i).indexOf("&");s=i+s,r=n.substring(0,i)+e+n.substring(s)}else{var c=n.search("/movie?");c+=7,r=n.substring(0,c)+"&page="+e+n.substring(c)}this.setState({nextURL:encodeURI(r),page:e})}},{key:"getGenreID",value:function(e){var t=0;switch(e){case"Action":t=28;break;case"Adventure":t=12;break;case"Animation":t=16;break;case"Comedy":t=35;break;case"Crime":t=80;break;case"Documentary":t=99;break;case"Drama":t=18;break;case"Family":t=10751;break;case"Fantasy":t=14;break;case"History":t=36;break;case"Horror":t=27;break;case"Music":t=10402;break;case"Mystery":t=9648;break;case"Romance":t=10749;break;case"Science Fiction":t=878;break;case"Thriller":t=53;break;case"War":t=10752;break;case"Western":t=37;break;default:t=0}return t}},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"title-bar title-bar-show","data-responsive-toggle":"mobile-menu","data-hide-for":"medium"},n.a.createElement("div",{className:"title-bar-left"},n.a.createElement("a",{href:"/",id:"logo"},"Movie8r")),n.a.createElement("div",{className:"title-bar-right"},n.a.createElement("button",{className:"menu-icon",type:"button","data-toggle":"mobile-menu"}))),n.a.createElement("div",{className:"top-bar grid-x",id:"mobile-menu","data-animate":"hinge-in-from-top hinge-out-from-top"},n.a.createElement("div",{className:"cell small-1 medium-4 large-5 show-for-medium"},n.a.createElement("a",{href:"/",id:"logo"},"Movie8r")),n.a.createElement("div",{className:"cell small-12 medium-5 large-5"},n.a.createElement(d,{newSearch:this.newSearch})),n.a.createElement("div",{className:"cell small-12 medium-3 large-2"},n.a.createElement(b,{genreChange:this.genreChange,pageChange:this.pageChange}))),n.a.createElement("main",null,n.a.createElement("div",{className:"grid-container"},n.a.createElement("div",{className:"grid-x"},n.a.createElement("div",{className:"cell small-6 small-offset-3"},n.a.createElement("div",{id:"error-callout",className:"callout primary"},n.a.createElement("h1",null,"Whoops!"),n.a.createElement("p",null,"It looks like there's nothing here..."),n.a.createElement("button",{id:"error-button",className:"button"},"Back"))))),n.a.createElement("div",{className:"grid-container fluid"},n.a.createElement("div",{id:"movie-container",className:"grid-x grid-margin-x"},this.state.movieElements)),n.a.createElement(h,{pageChange:this.pageChange,page:this.state.page})))}}]),a}(n.a.Component);s.a.render(n.a.createElement(g,null),document.getElementById("root"))}],[[10,1,2]]]);
//# sourceMappingURL=main.00e84e75.chunk.js.map
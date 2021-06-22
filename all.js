const txt = document.querySelector(".txt");
const save = document.querySelector(".save");
const nav = document.querySelector(".nav");
const nav_all = document.querySelector(".nav_all");
const nav_uncomplete = document.querySelector(".nav_uncomplete");
const nav_complete = document.querySelector(".nav_complete");
const content = document.querySelector(".content");
const list = document.querySelector(".list");
const clearButton = document.querySelector(".clear");
const promptNum = document.querySelector(".promptNum");

let data = JSON.parse(localStorage.getItem("todolist"));

if(data===null){
    let data_base=[];
    localStorage.setItem("todolist",JSON.stringify('data_base));}                                                  

//初始化
function renderdata() {
    let ary = "";
    let count = 0;
    //無待辦事項關閉列表
    if (data.length == 0) {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
    //顯示全部事項
    if (nav_all.classList.length == 2) {
        data.forEach(function(item, index) {
            let uncompleteList = `<li><span data-num=${index} class="uncomplete-checkBar"></span><p >${item.content}</p><img class="cancel" data-num=${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="cancel"></li>`
            let completeList = `<li><span data-num=${index} class="complete-checkBar"></span><p class="done" >${item.content}</p><img class="cancel" data-num=${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="cancel"></li>`
            if (item.status == "uncomplete") {
                ary += uncompleteList;
            } else {
                ary += completeList;
            }
            if (item.status == "uncomplete") {
                count++;
            }
        })
        list.innerHTML = ary;
        promptNum.textContent = `${count}個待完成項目`;
    }
    //顯示待完成
    else if (nav_uncomplete.classList.length == 2) {
        data.forEach(function(item, index) {
            if (item.status == "uncomplete") {
                ary += `<li><span data-num=${index} class="uncomplete-checkBar"></span><p>${item.content}</p><img class="cancel" data-num=${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="cancel"></li>`
            }
            if (item.status == "uncomplete") {
                count++;
            }
        })
        list.innerHTML = ary;
        promptNum.textContent = `${count}個待完成項目`;
    }
    //顯示已完成
    else if (nav_complete.classList.length == 2) {
        data.forEach(function(item, index) {
            if (item.status == "complete") {
                ary += `<li><span data-num=${index} class="complete-checkBar"></span><p class="done" >${item.content}</p><img class="cancel" data-num=${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="cancel"></li>`
            }
            if (item.status == "uncomplete") {
                count++;
            }
        })
        list.innerHTML = ary;
        promptNum.textContent = `${count}個待完成項目`;
    }
}
renderdata();

//新增待辦事項功能
save.addEventListener("click", function(e) {
    if (txt.value == "") {
        alert("請輸入內容");
        return;
    }
    //空物件插入輸入項目
    let obj = { "content": txt.value, "status": "uncomplete" };
    data.push(obj);
    //新增項目導入暫存
    localStorage.setItem("todolist", JSON.stringify(data));
    txt.value = "";
    renderdata();
});


//代辦事項功能(刪除,切換)
list.addEventListener("click", function(e) {
    let num = e.target.getAttribute("data-num");
    //刪除事項
    if (e.target.getAttribute("class") == "cancel") {
        data.splice(num, 1);
    };
    //切換是否完成
    if (e.target.getAttribute("class") == "uncomplete-checkBar") {
        data[num].status = "complete";
    } else if (e.target.getAttribute("class") == "complete-checkBar") {
        data[num].status = "uncomplete";
    }
    //導入暫存
    localStorage.setItem("todolist", JSON.stringify(data));
    renderdata();
})

//清除已完成項目
clearButton.addEventListener("click", function(e) {
    let obj = [];
    // let data = JSON.parse(localStorage.getItem("todolist"));
    data.forEach(function(item, index) {
        if (item.status !== "complete") {
            obj.push(item);
        }
    })
    data = obj;
    //導入暫存
    localStorage.setItem("todolist", JSON.stringify(data));
    renderdata();
})

//篩選功能
nav.addEventListener("click", function(e) {
    if (e.target.textContent == "全部") {
        e.target.classList.add("active");
        nav_complete.classList.remove("active");
        nav_uncomplete.classList.remove("active");
    } else if (e.target.textContent == "待完成") {
        e.target.classList.add("active");
        nav_all.classList.remove("active");
        nav_complete.classList.remove("active");
    } else if (e.target.textContent == "已完成") {
        e.target.classList.add("active");
        nav_all.classList.remove("active");
        nav_uncomplete.classList.remove("active");
    }
    renderdata()
});

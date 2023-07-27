import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'
import { getDatabase, ref, push,onValue, remove } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js'


const appSettings = {
    databaseURL : 'https://shopping-list-yahid-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const db = getDatabase(app)
const shoppingListRef = ref(db, 'shopping-list')

const item = document.querySelector('#item')
const save = document.querySelector('#save')
const list = document.getElementById('cart')

save.addEventListener('click', () => {
    addToDB(item.value)
    item.value = ''
})

onValue(shoppingListRef, (snapshot) => {
    if(!snapshot.val()){

        list.innerHTML = "No items yet"

    } else { 

        let CartItems = Object.entries(snapshot.val())
        clearHTML()

        for(let i=0; i < CartItems.length ; i++){
            addToPage(CartItems[i])
        } 
    }
})


function addToPage(item) {
    let itemID = item[0]
    let itemName = item[1]

    let li = document.createElement('li')

    li.textContent = itemName

    li.addEventListener('click' ,function(){
        let location = ref(db, `shopping-list/${itemID}`)
        remove(location)
        console.log(itemID)
    })
    list.append(li)

}

function addToDB(item) {
    push(shoppingListRef,item)
}
function clearHTML(){
    list.innerHTML=""
}
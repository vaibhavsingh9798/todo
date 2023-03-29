
let add = document.getElementById('add')
add.addEventListener('click',addItem)

let remul = document.getElementById('remaining')
remul.addEventListener('click',doneFun)
remul.addEventListener('click',removeItem)
let complete = document.getElementById('done')
complete.addEventListener('click',removeItem)

function addInDom(item){
    let ul = document.getElementById('remaining')
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(`${item.todoName}  ${item.todoDes}`))
        let doneBtn = document.createElement('button')
        let delBtn = document.createElement('button')
        doneBtn.appendChild(document.createTextNode('✓'))
        delBtn.appendChild(document.createTextNode('x'))
        doneBtn.setAttribute('id',`${item._id}`)
        delBtn.setAttribute('id',`${item._id}`)
        delBtn.setAttribute('class','delbtn float-right m-1')
        doneBtn.setAttribute('class','done float-right m-1')
        li.appendChild(delBtn)
        if(!item.isDone){
        li.appendChild(doneBtn)
        ul.appendChild(li)
        }
        else{
            let ul = document.getElementById('done')
            ul.appendChild(li)
        }
}

function addItem(e){
    e.preventDefault();
    let todoName = document.getElementById('todoName').value;
    let todoDes = document.getElementById('todoDes').value;
    let objData = {todoName,todoDes,isDone:false}
    addInCrud(objData)
    addInDom(objData)
    document.getElementById('todoName').value=''
    document.getElementById('todoDes').value=''
}



let printTodo = async () =>{
  let todos = await getFromCrud()
   todos.map((item) =>addInDom(item))
}
window.addEventListener('DOMContentLoaded',printTodo)

function doneFun(e){
    if(e.target.getAttribute('class') == 'done float-right m-1')
    {
        let curNode = e.target.parentElement;
         let data = curNode.textContent.split('  ')
         let id = e.target.getAttribute('id')
         console.log('doneid',id)
         console.log('data--',data)
         console.log(e.target.getAttribute('class'))
         let li = document.createElement('li')
         let todoName = data[0]
         let todoDes = data[1].slice(0,-2)
         let objData = {todoName,todoDes,isDone:true}
         curNode.remove()
         addInDom(objData)
         updateCrud(objData,id)
    }
}

function removeItem(e){
    if(e.target.getAttribute('class') == 'delbtn float-right m-1'){
        let curNode = e.target.parentElement
        curNode.remove()
        let id = e.target.getAttribute('id')
        if(id)
       axios.delete(`https://crudcrud.com/api/956eed358c134b8880eef7674818b07d/todo/${id}`)
    }
}



// newtwork call 
let addInCrud = (objData) =>{
    axios.post('https://crudcrud.com/api/956eed358c134b8880eef7674818b07d/todo',objData)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

let getFromCrud = async () =>{
    try{
   let todo = await   axios.get('https://crudcrud.com/api/956eed358c134b8880eef7674818b07d/todo')
     return todo.data; 
    }
    catch(err){
        console.log(err)
    }
}

let updateCrud = (todoItem,id) =>{
   axios.put(`https://crudcrud.com/api/956eed358c134b8880eef7674818b07d/todo/${id}`,todoItem)
   .then(res => console.log(res))
   .catch(err => console.log(err))
}

let add = document.getElementById('add')
add.addEventListener('click',addItem)

let remul = document.getElementById('remaining') 
remul.addEventListener('click',doneFun)
remul.addEventListener('click',removeItem)
let complete = document.getElementById('done')
complete.addEventListener('click',removeItem)

let ul1 = document.getElementById('remaining')
let ul2 = document.getElementById('done')

function addInDom(item){
        let li = document.createElement('li')
        li.setAttribute('calss','item')
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
        console.log('iii',item.isDone)
         if(!item.isDone){
        li.appendChild(doneBtn)
        ul1.appendChild(li)
         }
         else{
            console.log('done1..',item)

            // delBtn.setAttribute('id',`${item._id}`)
            ul2.appendChild(li)
            console.log(ul2)
         }
}

function addItem(e){
    e.preventDefault();
    let todoName = document.getElementById('todoName').value;
    let todoDes = document.getElementById('todoDes').value;
    let objData = {todoName,todoDes,isDone:false}
    addInCrud(objData)
   // addInDom(objData)
    document.getElementById('todoName').value=''
    document.getElementById('todoDes').value=''
}

let printTodo = async () =>{
  let todos = await getFromCrud()
   todos.map((item) =>addInDom(item,ul1,ul2))
}
window.addEventListener('DOMContentLoaded',printTodo)

async function doneFun(e){
    if(e.target.getAttribute('class') == 'done float-right m-1')
    {
        console.log('done fun call')
        let curNode = e.target.parentElement;
        console.log(curNode)
         let data = curNode.textContent.split('  ')
         console.log('data',data)
         let id = e.target.getAttribute('id')
         console.log('done id',id)
         let li = document.createElement('li')
         let todoName = data[0]
         let todoDes = data[1].slice(0,-2)
         let objData = {todoName,todoDes,isDone:true}
         console.log('obj',objData)
         curNode.remove()
           updateCrud(objData,id)
                  addInDom(objData)
         
    }
}

async function removeItem(e){
    e.preventDefault();
    if(e.target.getAttribute('class') == 'delbtn float-right m-1'){
       
         let curNode = e.target.parentElement
        let id = e.target.getAttribute('id')
        console.log('rI....',curNode ,'---',id)
        try{
          axios.delete(`https://crudcrud.com/api/4d8057b79f11445bb75a42c22e8cfe54/todo/${id}`)
        }
        catch(e){
          console.log('del error',e)
        }
        curNode.remove()
    }
}

let addInCrud = async (objData) =>{
    try{
   let  res = await axios.post('https://crudcrud.com/api/4d8057b79f11445bb75a42c22e8cfe54/todo',objData)
      addInDom(res.data)
    }
    catch(e){
        console.log(e)
    }
}

let getFromCrud = async () =>{
    try{
   let todo = await   axios.get('https://crudcrud.com/api/4d8057b79f11445bb75a42c22e8cfe54/todo')
     return todo.data; 
    }
    catch(err){
        console.log(err)
    }
}

let updateCrud = async (todoItem,id) =>{
    console.log('updateCrud')
    console.log(id,'---',todoItem)
    try{
     axios.put(`https://crudcrud.com/api/4d8057b79f11445bb75a42c22e8cfe54/todo/${id}`,todoItem)
    }
    catch(e){
      console.log(e)
    }
}  
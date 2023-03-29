console.log('js')
let add = document.getElementById('add')
add.addEventListener('click',addItem)

let remul = document.getElementById('remaining')
remul.addEventListener('click',doneFun)
remul.addEventListener('click',removeItem)
let complete = document.getElementById('done')
complete.addEventListener('click',removeItem)

function addItem(e){
    e.preventDefault();
    let todoName = document.getElementById('todoName').value;
    let todoDes = document.getElementById('todoDes').value;
    console.log('submitted');
    console.log(todoName,todoDes)
    let ul = document.getElementById('remaining')
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(`${todoName}  ${todoDes}`))
    let doneBtn = document.createElement('button')
    let delBtn = document.createElement('button')
    doneBtn.appendChild(document.createTextNode('✓'))
    delBtn.appendChild(document.createTextNode('x'))
    doneBtn.setAttribute('id','done')
    delBtn.setAttribute('id','delete')
    doneBtn.setAttribute('style',' margin-left:70px')
    delBtn.setAttribute('style',' margin-left:10px')
    li.appendChild(doneBtn)
    li.appendChild(delBtn)
    ul.appendChild(li)
    let objData = {todoName,todoDes,isDone:false}
    addInCrud(objData)
    document.getElementById('todoName').value=''
    document.getElementById('todoDes').value=''
}



let printTodo = async () =>{
  let todos = await getFromCrud()
   todos.map((item) =>{
        let ul = document.getElementById('remaining')
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(`${item.todoName}  ${item.todoDes}`))
        let doneBtn = document.createElement('button')
        let delBtn = document.createElement('button')
        doneBtn.appendChild(document.createTextNode('✓'))
        delBtn.appendChild(document.createTextNode('x'))
        doneBtn.setAttribute('id','done')
        delBtn.setAttribute('id','delete')
        delBtn.setAttribute('class',`${item._id}`)
        doneBtn.setAttribute('style',' margin-left:100px')
        delBtn.setAttribute('style',' margin-left:10px')
        li.appendChild(doneBtn)
        li.appendChild(delBtn)
        ul.appendChild(li)

      //}
   })
}
window.addEventListener('DOMContentLoaded',printTodo)
function doneFun(e){
    if(e.target.getAttribute('id') == 'done')
    {
        let curNode = e.target.parentElement;
         let data = curNode.textContent.split('  ')
         console.log('data--',data)
         console.log(e.target.getAttribute('class'))
         let li = document.createElement('li')
         li.appendChild(document.createTextNode(`${data[0]}  ${data[1].slice(0,-2)}`))
        // let delBtn = document.createElement('button')
        // delBtn.appendChild(document.createTextNode('x'))
        // delBtn.setAttribute('id','delete')
        // delBtn.setAttribute('style',' margin-left:60px')
        // li.appendChild(delBtn)
        curNode.remove()
         let doneul = document.getElementById('done')   
         doneul.appendChild(li);
        // console.log(doneul)
         
       // curNode.remove();
    }
}

function removeItem(e){
    if(e.target.getAttribute('id') == 'delete'){
        let curNode = e.target.parentElement
        curNode.remove()
        let id = e.target.getAttribute('class')
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
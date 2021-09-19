const Todos=[
        {
            id: new Date(),
            todo:"This is a custom todo",
            category:"friends-color"
        }
    ]
        
localStorage.setItem("allTodos", JSON.stringify(Todos)) 

const allTodos=JSON.parse(localStorage.getItem("allTodos"))

function ShowAddTodo(){
    Swal.fire({
        title: 'Add new todo',
        html: `<textarea type="text" id="todoInput" class="swal2-textarea" placeholder="Add a todo" rows="3"></textarea>
        
        <select class="swal2-select" id="mySelectElement">
        <option value="" selected disabled>Select Category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="friends">Friends</option>
       </select>
        `,
        confirmButtonText: 'Add to list',
        focusConfirm: false,
        preConfirm: () => {
          const newTodo = Swal.getPopup().querySelector('#todoInput').value
          const category = Swal.getPopup().querySelector('#mySelectElement').value
          if (!newTodo || !category) {
            Swal.showValidationMessage(`Please enter a new todo and select category`)
          }
          return { newTodo: newTodo, category: category }
        }
      }).then((result) => {
          console.log(result)
          submitNewTodo(result.value)
      })  
}

function ShowEditTodo(x){
    console.log(allTodos[x])


    Swal.fire({
        title: 'Edit todo',
        html: `<textarea type="text" id="todoInput" class="swal2-textarea" placeholder="Add a todo" rows="3"></textarea>
        
        <select class="swal2-select" id="mySelectElement">
        <option value="" disabled>Select Category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="friends">Friends</option>
       </select>
        `,
        confirmButtonText: 'Submit changes',
        focusConfirm: false,
        preConfirm: () => {
          const editedTodo = Swal.getPopup().querySelector('#todoInput').value
          const editedCategory = Swal.getPopup().querySelector('#mySelectElement').value
          if (!editedTodo || !editedCategory) {
            Swal.showValidationMessage(`Please enter a valid todo and select category`)
          }
          return { todo: editedTodo, category: editedCategory }
        }
      }).then((result) => {
          console.log(result)
          allTodos[x]={
            id: new Date(),
            todo:result.value.todo,
            category:result.value.category+"-color"
        }
          localStorage.setItem("allTodos", JSON.stringify(allTodos)) 
                ShowTodos()
         
      })  
}

function submitNewTodo(x){

    allTodos[allTodos.length]={
        id: new Date(),
        todo:x.newTodo,
        category:x.category+"-color"
    }

        localStorage.setItem("allTodos", JSON.stringify(allTodos))
        
   ShowTodos()
}

function DeleteTodo(x){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            allTodos.splice(x,1)
			localStorage.setItem("allTodos", JSON.stringify(allTodos))
            ShowTodos()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}

function ShowTodos(){
    y= (allTodos.length)

    cont=""
    formDetails=""
    for(x=0; x<y; x++){

        cont+=`
                <div class="sample-todo">
                    <div class=${allTodos[x].category} id=${allTodos[x].id}></div>
                    <p>${allTodos[x].todo}</p>
                    <div class="todo-actions">
                        <i class="far fa-edit green" onclick="ShowEditTodo(${x})"></i>&nbsp; &nbsp;
                        <i class="far fa-trash-alt red" onclick="DeleteTodo(${x})"></i>
                    </div>
                </div><br/>`
    }
    document.getElementById("todos").innerHTML= `<h2>Your Todos</h2> ${cont}`

}
    ShowTodos()
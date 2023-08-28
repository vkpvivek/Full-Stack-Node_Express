
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const msg = document.querySelector('.msg');


var ItemList=document.getElementById('userDetail');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(nameInput.value === '' || emailInput.value === '' || phoneInput.value==='') {
      msg.innerHTML = 'Please enter all fields';

    } else {

        let myObj={
            name:nameInput.value,
            email:emailInput.value,
            phone: phoneInput.value
        };
        
        console.log(myObj);
        axios.post("http://localhost:3000/add-user",myObj)
            .then((response)=>{
                console.log(response.data.newUserDetails);
                showUser(response.data.newUserDetails)
            })
            .catch((err)=>{
                console.log(err);
            })
        //showUser(myObj);
       
    }  

};


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000/get-user")
        .then((response)=>{
            console.log(response.data.newUserDetails[1]);
            for( var i=0;i<response.data.newUserDetails.length;i++){
                showUser(response.data.newUserDetails[i]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
})



function showUser(obj){
    const parElem=document.getElementById('userDetail');
    const childElem=document.createElement('li');
    childElem.className='item';

    childElem.textContent=obj.name +" "+obj.email;  //add text to Li

    //create Delete Button to add in li
    var deleteBtn = document.createElement('button');
    deleteBtn.className ='delete';
    deleteBtn.style='float:right';
    deleteBtn.appendChild(document.createTextNode('delete'));

    deleteBtn.onclick=()=>{
        //localStorage.removeItem(obj.email);
        axios.delete(`http://localhost:3000/delete-user/${obj.id}`)
            .then(response => {
                console.log(`Deleted post with ID ${obj.id}`);
            })
            .catch(error => {
                console.log("......*...");
                //console.error(error);
            });
            
        parElem.removeChild(childElem);
    }
    childElem.appendChild(deleteBtn);    //add delete button Li

    //create Edit button to add in li
    
    var editBtn=document.createElement('button');
    editBtn.className='edit';
    editBtn.style='float:right';
    
    editBtn.appendChild(document.createTextNode('edit'));
    
    editBtn.onclick =()=>{
        //delete old details
        axios.delete(`http://localhost:3000/get-user/${obj.id}`)
            .then(response => {
                console.log(`Deleted post with ID ${obj._id}`);
            })
            .catch(error => {
                console.error(error);
            });
            
        parElem.removeChild(childElem);

        document.getElementById("name").value = obj.name;
        document.getElementById("email").value = obj.email;

        // axios.patch(`http://localhost:3000/get-user/${obj.id}`, {
        //     name: obj.name,
        //     email: obj.email
        //     })
        //     .then(response => console.log(response.data))
        //     .catch(error => console.error(error));

        // //add new details in input to edit
        // document.getElementById("name").value = obj.name;
        // document.getElementById("email").value = obj.email;
    }

    childElem.appendChild(editBtn);     //add edit button to child

    parElem.appendChild(childElem);

    console.log(parElem);
    console.log(ItemList.childElementCount);
}
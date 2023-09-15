const myForm = document.querySelector('#my-form');

const describeInput = document.querySelector('#describe');



myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(describeInput.value === '') {
      msg.innerHTML = 'Please enter all fields';

    } else {
        let myObj={
            book:describeInput.value,
        };
        console.log(myObj);

        axios.post("http://localhost:3000/add-book/",myObj)
            .then((response)=>{
                console.log(response.data.newOrderDetails);
                // showUser(response.data.newOrderDetails)
                location.reload();
            })
            .catch((err)=>{
                console.log(err);
            })
    }  
};


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000/get-books")
        .then((response)=>{
            console.log(response.data.newOrderDetails);
            for( var i=0;i<response.data.newOrderDetails.length;i++){
                // showUser(response.data.newOrderDetails[i]);
                var object=response.data.newOrderDetails[i];
                if(object.isReturned==false){
                    showTable1(object);
                }
                else if(object.isReturned==true){
                    showTable2(object);
                }
                // else if(object.table=="Table 3"){
                //     showTable3(object);
                // }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
})




function showTable1(obj){
    const parElem=document.getElementById('table1Details');
    const childElem=document.createElement('li');
    childElem.className='list-group-item';

    childElem.textContent=obj.Book+" , ---      Fine : "+obj.fine +"      -- Borrowed at:"+obj.createdAt;

    //create Delete Button to add in li
    var returnBtn = document.createElement('button');
    returnBtn.className ='delete';
    returnBtn.style='float:right';  
    returnBtn.appendChild(document.createTextNode('Return'));

    returnBtn.onclick=()=>{

        axios.put(`http://localhost:3000/return-book/${obj.id}`, {
            Book:obj.Book,
            fine:10
            })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));

        parElem.removeChild(childElem);
    }
    childElem.appendChild(returnBtn);    //add delete button Li

    parElem.appendChild(childElem);
}


function showTable2(obj){
    const parElem=document.getElementById('table2Details');
    const childElem=document.createElement('li');
    childElem.className='list-group-item';

    childElem.textContent= obj.Book+" -- "+obj.fine +" -- "+obj.createdAt;

    parElem.appendChild(childElem);
}




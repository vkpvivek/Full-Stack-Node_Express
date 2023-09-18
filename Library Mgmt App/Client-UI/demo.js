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

    // Calculating new-Fine
            const date=obj.createdAt;
            const StartTime= new Date(date);
            const CurrTime = new Date();
            const timeDifferenceMs = CurrTime - StartTime;
            // Convert milliseconds to hours
            const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);
            TimeTaken =Math.floor(hoursDifference);

            const newFine=TimeTaken*10;

    //Reformating Time
            const cleanedDatetime = date.replace("T", " ").replace(".000Z", "");

    childElem.textContent=obj.Book +" ,   ||   Borrowed at:>>   "+cleanedDatetime +", || Fine :>>   "+newFine;

    //create Return Button to add in li
    var returnBtn = document.createElement('button');
    returnBtn.className ='Return';
    returnBtn.style='float:right';  
    returnBtn.appendChild(document.createTextNode('Return'));



    returnBtn.onclick = () => {
        childElem.removeChild(returnBtn);
    
        // Creating Form Inside Child Element
        const formInput = document.createElement('form');
        const divElem = document.createElement('div');
        divElem.className = 'form-group col-md-4';
    
        var fineInput = document.createElement('input');
        fineInput.className = 'form-control';
        fineInput.type = "text";
        fineInput.placeholder=newFine;
        divElem.appendChild(fineInput);
    
        var btnPay = document.createElement('button');
        btnPay.className = 'btn btn-success';
        btnPay.type = "submit";
        btnPay.appendChild(document.createTextNode('Pay Fine'));
    
        btnPay.onclick = (e) => {
            e.preventDefault();

            axios.put(`http://localhost:3000/return-book/${obj.id}`, {
                Book:obj.Book,
                fine:newFine
                })
                .then(response => {
                    console.log(response.data);
                })
                .then(
                    setTimeout(() => {
                        window.location.reload(); // Reload the page after a short delay
                    }, 100)
                )
                .catch(error => console.log(error)); 
            
            //location.reload();
            console.log("Fine Paid");
            
        }

        divElem.appendChild(btnPay);
    
        formInput.appendChild(divElem);
        childElem.appendChild(formInput);
    }

    childElem.appendChild(returnBtn);    //add delete button Li

    parElem.appendChild(childElem);
}



function showTable2(obj){
    const parElem=document.getElementById('table2Details');
    const childElem=document.createElement('li');
    childElem.className='list-group-item ';

    const date=obj.createdAt;
    const rtDate=obj.updatedAt;
    const ST = date.replace("T", " ").replace(".000Z", "");
    const RT = rtDate.replace("T", " ").replace(".000Z", "");

    childElem.textContent= obj.Book; 

    const h1=document.createElement('p');
    h1.className="mb-3";
    h1.textContent="Borrowed At: >>"+ST;
    childElem.appendChild(h1);
    
    const h2=document.createElement('p');
    h2.className="mb-3";
    h2.textContent=" RETURNED At: >>"+RT;
    childElem.appendChild(h2);

    const h3=document.createElement('p');
    h3.className="mb-3";
    h3.textContent="Fine Paid:>> "+obj.fine;
    childElem.appendChild(h3);



    parElem.appendChild(childElem);
}




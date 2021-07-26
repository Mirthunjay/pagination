// Html Tag Declaration

// Navbar
const navbar = document.createElement('nav');
navbar.setAttribute('class','navbar navbar-dark bg-dark navbar-alter');
navbar.innerHTML=`
<div class="container-fluid">
<a class="navbar-brand" href="./index.html">Pagination</a>
</div>
`;
document.body.append(navbar);


// tag declaration Command
const table = document.createElement('table');
table.setAttribute('class','table addcontent');
table.innerHTML=`
<thead class="thead">
<tr class="row-heading">
    <th class="col-heading" scope="col">#</th>
    <th class="col-heading" scope="col">Name</th>
    <th class="col-heading" scope="col">Email-ID</th>
</tr>
</thead>`;

document.body.append(table);

// Pagination declaration
const pagination = document.createElement("div");
pagination.className='pagination';
document.body.append(pagination);





// Get Users

fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json',{
    method:"GET"
})

.then((data)=> data.json())
.then((data)=> {
    loadUsers((data.slice(0,10)))
    return data;
})

.then((data)=>{

    const noOfPages=Math.ceil(data.length/10);
    for(let i=1;i<=noOfPages;i++){
        const page = document.createElement('button');
        page.className='button';
        page.innerText = i;
        page.onclick=function(){
            const pageUsers = data.filter((user,index)=>index >= (i-1)*10  &&  index < i*10);
            document.querySelector('.tbody').remove();
            loadUsers(pageUsers);   
        }
        pagination.append(page);


    }
    

})


// loadUsers
function loadUsers(data){
    const table = document.querySelector('.addcontent')
    const tbody = document.createElement('tbody');
    tbody.className='tbody';
    data.forEach((userdata) => {
        tbody.innerHTML +=`
        <tr>
        <th scope="row">${userdata.id}</th>
        <td>${userdata.name}</td>
        <td>${userdata.email}</td>
        </tr>`;
});
    table.append(tbody);

}

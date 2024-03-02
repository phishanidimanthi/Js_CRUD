function validateForm() {

    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;

    if (name == "") {
        alert("Name is required");
        return false;
    }

    if (age == "") {
        alert("Age is required");
        return false;
    }
    if (email == "") {
        alert("Email is required");
        return false;
    }

    return true;
}

//function to add data to local storage
function addData() {
    // if form is validate
    if (validateForm() == true) {

        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var email = document.getElementById("email").value;

        var userList;
        if (localStorage.getItem("userList") == null) {
            userList = [];
        } else {
            userList = JSON.parse(localStorage.getItem("userList"));
        }

        userList.push({
            name: name,
            age: age,
            email: email
        });

        localStorage.setItem("userList", JSON.stringify(userList));
        showdata();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("email").value = "";
    }
}

// function to show data from local storage
function showdata() {
    var userList;
    if (localStorage.getItem("userList") == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem("userList"));
    }

    var html = "";

    userList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.email + "</td>";
        html +=
            '<td><button onclick="deleteData(' +
            index +
            ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
            index +
            ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#dataTable tbody").innerHTML = html;
}

//load all data when  the page load
window.onload = showdata;

//delete data frm local storage
function deleteData(index) {
    var userList;
    if (localStorage.getItem("userList") == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem("userList"));
    }

    userList.splice(index, 1);
    localStorage.setItem("userList", JSON.stringify(userList));
    showdata();
}

//update and edit data in local storage
function updateData(index) {
    //when update data, submit btn will hide and update btn will show
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var userList;
    if (localStorage.getItem("userList") == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem("userList"));
    }

    document.getElementById("name").value = userList[index].name;
    document.getElementById("age").value = userList[index].age;
    document.getElementById("email").value = userList[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            userList[index].name = document.getElementById("name").value;
            userList[index].age = document.getElementById("age").value;
            userList[index].email = document.getElementById("email").value;

            localStorage.setItem("userList", JSON.stringify(userList));
            showdata();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("email").value = "";

            //update btn will hide and submit btn will show
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

        }
    }
}
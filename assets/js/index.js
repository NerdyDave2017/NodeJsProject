$("#add_user").submit((event) => {
  alert("Data Inserted Successfully!");
});

// function selectObj(obj){
//   let element = document.querySelector(obj)
//   return element
// }

// selectObj("#add_user").addEventListener("submit",()=>{
//   alert('Data Inserted Successfully!')
// })

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, (n, i) => {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `http://localhost:${process.env.PORT}/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done((response) => {
    alert("Data Updated Successfully!");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");

  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    var request = {
      url: `http://localhost:${process.env.PORT}/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done((response) => {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
}

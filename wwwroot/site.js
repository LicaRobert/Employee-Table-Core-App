const uri = "api/todo";
let todos = null;
function getCount(data) {
  const el = $("#counter");
  var name = "Employee";

  if (data) {
    if (data > 1) {
      name = "Employees";
    }
    el.text(data + " " + name);
  } else {
    el.text("No " + name);
  }
}

$(document).ready(function() {
  getData();
});

function getData() {
  $.ajax({
    type: "GET",
    url: uri,
    cache: false,
    success: function(data) {
      const tBody = $("#todos");

      $(tBody).empty();

      getCount(data.length);

      $.each(data, function(key, item) {
        const tr = $("<tr></tr>")
          .append(
            $("<td></td>").append(
              $("<input/>", {
                type: "checkbox",
                disabled: true,
                checked: item.isHired
              })
            )
          )
          .append($("<td></td>").text(item.name))
          .append(
            $("<td></td>").append(
              $("<button>Edit</button>").on("click", function() {
                editItem(item.id);
              })
            )
          )
          .append(
            $("<td></td>").append(
              $("<button>Delete</button>").on("click", function()
               {
                 if(confirm("Are you sure you want to delete this?"))
                  {
                   deleteItem(item.id);
                   return true;
                  }
                  else
                  {
                   return false;
                  }
              })
            )
          );

        tr.appendTo(tBody);
      });

      todos = data;
    }
  });
}

function addItem() {
  const item = {
    name: $("#add-name").val(),
    isHired: false
  };

  $.ajax({
    type: "POST",
    accepts: "application/json",
    url: uri,
    contentType: "application/json",
    data: JSON.stringify(item),
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong!");
    },
    success: function(result) {
      getData();
      $("#add-name").val("");
    }
  });
}

function deleteItem(id) {
  $.ajax({
    url: uri + "/" + id,
    type: "DELETE",
    success: function(result) {
      getData();
    }
  });
}

function editItem(id) {
  $.each(todos, function(key, item) {
    if (item.id === id) {
      $("#edit-name").val(item.name);
      $("#edit-id").val(item.id);
      $("#edit-isHired")[0].checked = item.isHired;
    }
  });
  $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function() {
  const item = {
    name: $("#edit-name").val(),
    isHired: $("#edit-isHired").is(":checked"),
    id: $("#edit-id").val()
  };

  $.ajax({
    url: uri + "/" + $("#edit-id").val(),
    type: "PUT",
    accepts: "application/json",
    contentType: "application/json",
    data: JSON.stringify(item),
    success: function(result) {
      getData();
    }
  });

  closeInput();
  return false;
});

function closeInput() {
  $("#spoiler").css({ display: "none" });
}

function clicks() {
  var item = document.querySelectorAll('th');
  var tb = document.querySelectorAll('tr');
  var item2 = document.querySelectorAll('tbody tr td');
   for(let i=2;i<item2.length;i=i+4)
   {
    if(item2[i].style.display === "inline-block")
    {
      item2[i].style.display = "none";
      item2[i+1].style.display = "none";
    }
    else
    {
      item2[i].style.display = "inline-block";
      item2[i+1].style.display = "inline-block";
    }
  }
}


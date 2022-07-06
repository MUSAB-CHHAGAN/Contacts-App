/** @format */
const form = document.querySelector("form");
const backdrop = document.getElementById("backdrop");
const addUserInputs = document.querySelectorAll("#addForm form input");
const mainAddButton = document.getElementById("add-button");
const cancelAddButton = document.getElementById("cancel-btn");
const addContactButton = document.getElementById("add-btn");
const addModalToggle = document.getElementById("addForm");
const contactList = document.querySelector("ul");
const cancelUpdateButton = document.getElementById("edit-cancel-btn");
const editUserInputs = document.querySelectorAll("#editForm input");
const updateButton = document.getElementById("update");
const editModal = document.getElementById("editForm");
let contacts = [];

const clearList = () => {
  const item = document.querySelectorAll("ul li");
  for (let i = 0; (li = item[i]); i++) {
    li.parentNode.removeChild(li);
  }
};

const updateHandler = (idx, id) => {
  const first = editUserInputs[0].value;
  const last = editUserInputs[1].value;
  const contactNumber = editUserInputs[2].value;
  const address = editUserInputs[3].value;
  const email = editUserInputs[4].value;
  let editRadioInput = "";
  const editRadio1 = document.getElementById("edit-radio-1");
  const editId = Math.random();
  const deleteId = Math.random();
  editRadio1.checked
    ? (editRadioInput = "Active")
    : (editRadioInput = "In-Active");

  const updatedContact = {
    first,
    last,
    contactNumber,
    address,
    email,
    status: editRadioInput,
    edit: editId,
    delete: deleteId,
  };
  const elIdx = contacts.findIndex((contact) => contact.edit === id);
  if (elIdx === idx) {
    if (contacts.splice(idx, 1, updatedContact)) {
      swal("Updated . . . .", "Contact Updated Successfully!", "success");
    }
  }

  editModal.classList.remove("visible");
  backdrop.classList.remove("visible");
  backdrop.classList.remove("visible");
  clearList();
  renderContacts();
};

const clearEditInputs = () => {
  for (const input of editUserInputs) {
    input.value = null;
  }
};
const deleteHandler = (id) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this contact!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      let index = 0;
      for (const contact of contacts) {
        if (contact.delete === id) {
          break;
        }
        index++;
      }
      contacts.splice(index, 1);

      contactList.children[index].remove();
      swal("Your contact  has been deleted . . !", {
        icon: "success",
      });
    } else {
      swal("Your contact is safe !");
    }
  });
};

const EditHandler = (id) => {
  editModalToggle();
  backdrop.classList.add("visible");
  const previousContact = contacts.find(({ edit }) => edit === id);
  const index = contacts.indexOf(previousContact);

  editUserInputs[0].value = previousContact.first;
  editUserInputs[1].value = previousContact.last;
  editUserInputs[2].value = previousContact.contactNumber;
  editUserInputs[3].value = previousContact.address;
  editUserInputs[4].value = previousContact.email;

  updateButton.addEventListener("click", () => {
    updateHandler(index, previousContact.edit);
  });
};

const renderContacts = () => {
  contacts.map(render);
  function render(contact) {
    const contactEl = document.createElement("li");
    contactEl.innerHTML = `
    <h2><i class="fa fa-user" aria-hidden="true"></i>${contact.first} ${contact.last}</h>
    <h3><i class="fa fa-phone" aria-hidden="true"></i>${contact.contactNumber}</h3>
    <h4><i class="fa fa-globe" aria-hidden="true"></i>${contact.address}</h4>
    <h4><i class="fa fa-envelope" aria-hidden="true"></i>${contact.email}</h4>
    <h4><i class="fa fa-bell" aria-hidden="true"></i>${contact.status}</h4>
    <div id="dom-buttons">
    <h1 id="${contact.edit}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></h1>
    <h1 id="${contact.delete}"><i class="fa fa-trash" aria-hidden="true"></i></h1>
    </div>
   

    `;

    contactList.append(contactEl);
    const deleteContactButton = document.getElementById(`${contact.delete}`);
    deleteContactButton.addEventListener("click", () => {
      deleteHandler(contact.delete);
    });

    const editContactButton = document.getElementById(`${contact.edit}`);
    editContactButton.addEventListener("click", () => {
      EditHandler(contact.edit);
    });
  }
};
const editModalToggle = () => {
  editModal.classList.toggle("visible");
};

const addContactHandler = () => {
  const first = addUserInputs[0].value;
  const last = addUserInputs[1].value;
  const contactNumber = addUserInputs[2].value;
  const address = addUserInputs[3].value;
  const email = addUserInputs[4].value;
  const editId = Math.random();
  const deleteId = Math.random();

  let radioInput = "Active";

  const addRadio1 = document.getElementById("add-radio-1");
  !addRadio1.checked ? (radioInput = "In-Active") : radioInput;

  if (
    first.trim() === "" ||
    last.trim() === "" ||
    contactNumber.trim() === "" ||
    address.trim() === "" ||
    email.trim() === ""
  ) {
    swal("Oops . . . .", "Please Fill All Field's!", "warning");
    return;
  }

  const contact = {
    first,
    last,
    contactNumber,
    address,
    email,
    status: radioInput,
    edit: editId,
    delete: deleteId,
  };
  if (contacts.push(contact)) {
    swal("Great . . . ", "Contact Added Successfully!", "success");
  }
  clearList();
  modalToggle();
  backdropToggle();
  renderContacts();
  clearInputs();
};

const modalToggle = () => {
  addModalToggle.classList.toggle("visible");
};
const backdropToggle = () => {
  backdrop.classList.toggle("visible");
};

const clearInputs = () => {
  for (const input of addUserInputs) {
    input.value = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
mainAddButton.addEventListener("click", () => {
  backdropToggle();
  modalToggle();
  clearInputs();
});
cancelAddButton.addEventListener("click", () => {
  backdropToggle();
  modalToggle();
  clearList();
  renderContacts();
});
addContactButton.addEventListener("click", () => {
  addContactHandler();
});
cancelUpdateButton.addEventListener("click", () => {
  editModalToggle();
  backdrop.classList.remove("visible");
  clearEditInputs();
});

backdrop.addEventListener("click", (event) => {
  event.stopImmediatePropagation();
  backdrop.classList.remove("visible");
  addModalToggle.classList.remove("visible");
  editModal.classList.remove("visible");
  clearInputs();
  clearEditInputs();
});
